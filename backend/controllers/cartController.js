import userModel from "../models/userModel.js";



// add products to user cart


const addToCart = async (req, res) => {
    
    try {

        const userId = req.userId;
        const { productId, itemId, size } = req.body;

        const finalProductId = productId || itemId;

        if (!finalProductId || !size) {
            return res.status(400).json({
                success: false,
                message: "ProductId and size required"
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.cartData) user.cartData = [];

        const existingItem = user.cartData.find(
            item => 
                item.productId &&
                item.productId.toString() === finalProductId && 
                item.size === size
        );


        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartData.push({
                productId: finalProductId,
                size,
                quantity: 1
            });
        }

        

        await user.save();

        return res.status(200).json({ 
            success: true, 
            message: "Added to Cart", 
            cart: user.cartData
        });
        
    } catch (error) {
        console.log("ADD CART ERROR:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}



// update user cart
const updateCart = async (req, res) => {

    try {

        const userId = req.userId;
        const { productId, itemId, size, quantity } = req.body;
        const finalProductId = productId || itemId;

        const user = await userModel.findById(userId);

        const item = user.cartData.find(
            item => 
                item.productId.toString() === finalProductId && 
                item.size === size
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }

        if (quantity <= 0) {
            user.cartData = user.cartData.filter(
                item => !(item.productId.toString() === productId && item.size === size)
            )
        } else {
            item.quantity = quantity;
        }

        await user.save();

        return res.json({
            success: true,
            message: "Cart updated",
            cart: user.cartData
        })

        
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
    
}



// get user cart data
const getUserCart = async (req, res) => {

    try {

        const userId = req.userId;

        const user = await userModel.findById(userId)

        const cartArray = user.cartData || [];

        let cartObj = {};

        cartArray.forEach(item => {
            if (!cartObj[item.productId]) {
                cartObj[item.productId] = {};
            }
            cartObj[item.productId][item.size] = item.quantity;
        })
            

        return res.status(200).json({ 
            success: true, 
            cartData: cartObj
        });

        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
    
}



const clearCart = async (req, res) => {
    
    try {
        
        const userId = req.userId;

        await userModel.findByIdAndUpdate(userId, {
            cartData: []
        })

        return res.json({
            success: true,
            message: "Cart cleared"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export { addToCart, updateCart, getUserCart, clearCart }