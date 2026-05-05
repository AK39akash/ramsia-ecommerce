import mongoose from 'mongoose';


const addressSchema = new mongoose.Schema({
    fullname: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: {
        type: String,
        default: "India"
    }
}, { _id: false });


const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: String,
    reviewedAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false });


const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },

    name: String,
    price: Number,
    finalPrice: Number,
    
    image: String,

    size: String,
    quantity: {
        type: Number,
        required: true
    },

    sku: String,

    isReviewed: {
        type: Boolean,
        default: false
    },

    review: reviewSchema,

    returnRequest: {
        requested: {
            type: Boolean,
            default: false
        },

        reason: String,

        status: {
            type: String,
            enum: ["None", "Requested", "Approved", "Rejected", "Picked", "Completed"],
            default: "None"
        },

        requestedAt: Date,
        processedAt: Date
    },


    refund: {
        status: {
            type: String,
            enum: ["None", "Pending", "Processed", "Failed"],
            default: "None"
        },

        amount: Number,

        method: {
            type: String,
            enum: ["Original Payment", "Wallet", "Bank Transfer"]
        },

        processedAt: Date
    }

}, { _id: false });


const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    items: {
        type: [orderItemSchema],
        required: true
    },
    
    amount: {
        type: Number,
        required: true
    },

    address: {
        type: addressSchema,
        required: true
    },

    status: {
        type: String,
        enum: ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"],
        default: "Order Placed"
    },

    paymentMethod: {
        type: String,
        enum: ["COD", "Stripe"],
        required: true,
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    },

    stripeSessionId: {
        type: String
    },

    cancelReason: {
        type: String,
        enum: ["user", "admin", "system"],
        default: null
    },

    deliveredAt: Date,

    date: {
        type: Number,
        required: true
    }
}, { timestamps: true });


orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });



const OrderModel = mongoose.models.order || mongoose.model('order', orderSchema);


export default OrderModel;