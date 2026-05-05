import userModel from '../models/userModel.js'



// ADD TO WISHLIST
export const addToWishlist = async (req, res) => {
    
    try {

        const userId = req.userId;
        const { productId } = req.body;


        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const exists = user.wishlist.find(
            id => id.toString() === productId
        );

        if (!exists) {
            user.wishlist.push(productId);
        }

        await user.save();

        res.json({ 
            success: true, 
            wishlist: user.wishlist 
        });

    } catch (error) {
        res.json({ 
            success: false, 
            message: error.message 
        });
    }
};



// REMOVE FROM WISHLIST
export const removeFromWishlist = async (req, res) => {
    
    try {

        const userId = req.userId;
        const { productId } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        user.wishlist = user.wishlist.filter(
            id => id.toString() !== productId
        );

        await user.save();

        return res.json({ 
            success: true, 
            wishlist: user.wishlist 
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};



// GET WISHLIST
export const getWishlist = async (req, res) => {
    
    try {

        const userId = req.userId;

        const user = await userModel
            .findById(userId)
            .populate("wishlist");

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" });
        }

        return res.json({ 
            success: true, 
            wishlist: user.wishlist || [] 
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};