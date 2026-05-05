import productModel from '../models/productModel.js';
import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';



const addReview = async (req, res) => {
    
    try {
        
        const userId = req.userId
        const { productId, orderId, rating, comment } = req.body;

        // CHECK ORDER
        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // CHECK OWNERSHIP
        if (order.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized"
            });
        }

        // CHECK DELIVERED
        if (order.status !== "Delivered") {
            return res.status(400).json({
                success: false,
                message: "You can review only delivered products"
            });
        }

        // Check product in order
        const item = order.items.find(
            item => item.productId.toString() === productId
        );

        if (!item) {
            return res.status(400).json({
                success: false,
                message: "Product not in this order"
            })
        }

        // Check alreadt reviewed
        const alreadyReviewed = item.review && item.review.rating;

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "Already reviewed"
            });
        }

        // ADD REVIEW TO ORDER 
        item.review = {
            rating,
            comment,
            reviewedAt: new Date()
        };

        await order.save();

        // ADD REVIEW TO PRODUCT
        const product = await productModel.findById(productId);

        product.reviews.push({
            userId,
            name: req.user?.name || "User",
            rating,
            comment
        });

        product.totalReviews = product.reviews.length;

        product.averageRating = ((product.averageRating * product.totalReviews) + rating) / (product.totalReviews + 1);

        product.totalReviews += 1;

        await product.save();

        // ADD TO USER
        await userModel.findByIdAndUpdate(userId, {
            $push: {
                userReviews: {
                    productId,
                    orderId,
                    rating,
                    comment
                }
            }
        });

        return res.json({
            success: true,
            message: "Review added"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



const getProductReviews = async (req, res) => {

    try {
        
        const { productId } = req.params;

        const product = await productModel.findById(productId);

        return res.json({
            success: true,
            reviews: product.reviews
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}


const deleteReview = async (req, res) => {
    
    try {
        
        const userId = req.userId;
        const { productId, reviewId } = req.body;

        const product = await productModel.findById(productId);

        product.reviews = product.reviews.filter(
            r => r._id.toString() !== reviewId
        );

        await product.save();

        return res.json({
            success: true,
            message: "Review deleted"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export { addReview, getProductReviews, deleteReview }