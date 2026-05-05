import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import Stripe from 'stripe';

// import { currency } from '../../admin/src/App.jsx';


// global variables
const currency = 'inr'
const deliveryCharge = 10


// GATEWAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const FRONTEND_URL = process.env.FRONTEND_URL;



// Placing orders using COD METHOD
const placeOrder = async (req, res) => {

    try {

        const userId = req.userId;
        const { items, amount, address } = req.body;

        if (!items?.length) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            paymentStatus: "Pending",
            status: "Order Placed",
            date: Date.now()
        }

        const newOrder = await orderModel.create(orderData);

        // clear cart properly
        await userModel.findByIdAndUpdate(userId, { cartData: [] } )

        return res.status(200).json({ 
            success: true, 
            message: "Order Placed",
            orderId: newOrder._id
        });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
    
}



// Placing orders using STRIPE METHOD
const placeOrderStripe = async (req, res) => {

    try {

        const userId = req.userId;
        const { items, amount, address } = req.body;
        const { origin } = req.headers;

        const newOrder = await orderModel.create({
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            paymentStatus: "Pending",
            status: "Order Placed",
            date: Date.now()
        })


        const line_items = items.map(item => ({
            price_data: {  
                currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))


        // delivery
        line_items.push({
            price_data: {  
                currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })


        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',

            success_url: `${FRONTEND_URL}/success?orderId=${newOrder._id}`,
            cancel_url: `${FRONTEND_URL}/cancel?orderId=${newOrder._id}`,
            
            metadata: {
                orderId: newOrder._id.toString(),
                userId: userId.toString()
            }

        });

        await orderModel.findByIdAndUpdate(newOrder._id, {
            stripeSessionId: session.id,
            paymentIntentId: session.payment_intent
        });


        setTimeout(async () => {

            try {

                console.log("Checking for instant expiry:", newOrder._id);

                const order = await orderModel.findById(newOrder._id);

                if (!order || order.paymentStatus !== "Pending") {
                    console.log("Order already handled, skipping expiry");
                    return;
                }

                if (!order.stripeSessionId) return;

                const sessionData = await stripe.checkout.sessions.retrieve(order.stripeSessionId);

                if (sessionData.status === "open") {

                    await stripe.checkout.sessions.expire(order.stripeSessionId);

                    await orderModel.findByIdAndUpdate(order._id, {
                        paymentStatus: "Failed",
                        status: "Cancelled"
                    });

                    console.log("Stripe session expired instantly:", order._id);
                    
                } else {
                    console.log("Session already closed:", order._id);
                }
                
            } catch (error) {
                console.log("Expire error:", error);
            }
            
        }, 2 * 60 * 1000 );

        return res.status(200).json({ 
            success: true, 
            session_url: session.url,
            orderId: newOrder._id
        });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
    
}



const stripeWebhook = async (req, res) => {

    const sig = req.headers["stripe-signature"];

    let event;

    try {

        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
        
    } catch (err) {

        console.log("Webhook signature error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
        
    }


    const data = event.data.object;

    console.log("WEBHOOK EVENT:", event.type);
    console.log("SESSION DATA:", data);
    console.log("METADATA:", data.metadata);
    


    try {
        
        // PAYMENT SUCCESS
        if (event.type === "checkout.session.completed") {

            const session = event.data.object;

            console.log("PAYMENT SUCCESS WEBHOOK");
    
    
            const orderId = session.metadata?.orderId;
            const userId = session.metadata?.userId;

            console.log("ORDER ID:", orderId);
            

            let order;

            if (orderId) {
                order = await orderModel.findById(orderId);
            }

            if (!order) {
                order = await orderModel.findOne({
                    stripeSessionId: session.id
                });
            }

            if (!order) {
                console.log("Order not found");
                return;
            }
            
    
            await orderModel.findByIdAndUpdate(order._id, 
                {
                    paymentStatus: "Paid",
                    status: "Confirmed",
                    payment: true
                }
            );

            await userModel.findByIdAndUpdate(order.userId, {
                cartData: []
            });

            console.log("Payment success", order._id);
            
        }


        // SESSION EXPIRED (USER LEFT)
        if (event.type === "checkout.session.expired") {

            const orderId = data.metadata.orderId;

            await orderModel.findByIdAndUpdate(orderId, {
                paymentStatus: "Failed",
                status: "Cancelled"
            });

            console.log("Session expired -> order cancelled");
            
        }


        // PAYMENT FAILED
        if (event.type === "payment_intent.payment_failed") {

            const paymentIntent = data;

            const order = await orderModel.findOne({
                paymentIntentId: paymentIntent.id
            });

            if (order) {
                await orderModel.findByIdAndUpdate(order._id, {
                    paymentStatus: "Failed",
                    status: "Cancelled"
                });

                console.log("Payment failed");
            }
            
        }

    } catch (error) {
        console.log("Webhook error:", error);
    }


    res.json({ received: true });
    
}





// Canel Stripe Session

const cancelStripeSession = async (req, res) => {

    console.log("CANCEL API HIT")

    try {
        
        const { orderId } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ 
                success: false, 
                message: "Order Not Found" 
            });
        }


        if (order?.stripeSessionId) {

            console.log("Expiring Stripe Session:", order.stripeSessionId);
            const session = await stripe.checkout.sessions.retrieve(order.stripeSessionId);

            if (session.payment_status === "paid") {
                return res.status(400).json({
                    success: false,
                    message: "Payment already completed"
                });
            }

            if (session.status !== "open") {
                console.log("Session already closed");
            } else {
                await stripe.checkout.sessions.expire(order.stripeSessionId);
                console.log("Stripe session expired");
            }

            
        }


        // SYSTEM CANCEL -> remove order completely
        await orderModel.findByIdAndUpdate(orderId, {
            status: "Cancelled",
            paymentStatus: "Failed"
        });


        return res.status(200).json({ 
            success: true, 
            message: "Order Cancelled" 
        });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
    
}


const cancelOrder = async (req, res) => {

    try {

        const userId = req.userId;
        const { orderId } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.json({
                success: false,
                message: "Order not found",
            });
        }

        // SECURITY CHECK
        if (order.userId.toString() !== userId) {
            return res.json({
                success: false,
                message: "Unauthorized",
            });
        }


        // PREVENT CANCEL AFTER SHIPPED/DELIVERED
        if (["Shipped", "Delivered", "Cancelled"].includes(order.status)) {
            return res.json({
                success: false,
                message: "Order cannot be cancelled",
            });
        }

        order.status = "Cancelled";

        if (order.paymentStatus === "pending") {
            order.paymentStatus = "failed";
        }

        await order.save();

        return res.json({
            success: true,
            message: "Order cancelled successfully",
        });
        
    } catch (error) {

        return res.json({
            success: false,
            message: error.message,
        });
        
    };
    
}



// All Orders data for Admin Panel
const allOrders = async (req, res) => {

    try {

        const orders = await orderModel
            .find({})
            .populate("userId", "name email")
            .sort({ createdAt: -1 });
        
        return res.status(200).json({ success: true, orders });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
    
}



// User order data for Frontend
const userOrders = async (req, res) => {

    try {

        const userId = req.userId;

        const orders = await orderModel
            .find({ 
            userId,
            $or: [
                { status: { $ne: "Cancelled" } },
                { cancelReason: "admin" },
                { cancelReason: "user" }
            ]
        })

        return res.status(200).json({ success: true, orders })
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
    
}



// update order status from admin panel
const updateStatus = async (req, res) => {

    try {
        
        const { orderId, status, paymentStatus } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order Not Found" });
        }

        const updateData = {};

        // update order status
        if (status) {
            updateData.status = status;

            if (status === "Cancelled") {
                updateData.cancelReason = "admin";

                // COD cancel -> payment failed
                if (order.paymentMethod === "COD" && order.paymentStatus === "Pending") {
                    updateData.paymentStatus = "Failed";
                }
            }
        }

        // update payment status manually
        if (paymentStatus) {
            updateData.paymentStatus = paymentStatus;
        }

        await orderModel.findByIdAndUpdate(orderId, updateData);

        return res.status(200).json({ success: true, message: "Order Updated" })
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
    
}



// GET SINGLE ORDER DETAILS (USER)
const getSingleOrder = async (req, res) => {

    try {

        const userId = req.userId;
        const { id } = req.params;

        const order = await orderModel.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // SECURITY: ONLY ALLOW OWNER
        if (order.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        return res.status(200).json({
            success: true,
            order
        });
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
    
};



export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, cancelStripeSession, cancelOrder, stripeWebhook, getSingleOrder}