import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';


const extractPublicId = (url) => {
    const parts = url.split('/');
    const file = parts[parts.length - 1];
    return file.split('.')[0];
};


// function for add product
const addProduct = async (req, res) => {

    try {

        const { 
            name, 
            description, 
            price, 
            discount, 
            category, 
            subCategory, 
            groupId, 
            color, 
            sizes, 
            fit, 
            pattern, 
            collar, 
            sleeve, 
            tags, 
            bestseller, 
            isActive 
        } = req.body;


        // BASIC VALIDATION
        if (!name || !price || !category || !subCategory || !groupId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const files = req.files || [];

        if (files.length === 0) {
            return res.status(400).json({ success: false, message: "Images required" });
        }

        if (files.length > 5) {
            return res.status(400).json({ success: false, message: "Max  5 images allowed" });
        }


        const imageUrls = [];

        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                resource_type: "image",
                quality: "auto",
                fetch_format: "auto"
            });

            if (!result.public_id) {
                throw new Error("Cloudinary upload failed (no public_id)")
            }

            imageUrls.push({
                url: result.secure_url,
                public_id: result.public_id
            });
        }

        const parsedColor = color ? JSON.parse(color) : {};
        const parsedSizes = sizes ? JSON.parse(sizes) : [];
        const parsedTags = tags ? JSON.parse(tags) : [];

        if (!parsedSizes.length) {
            return res.status(400).json({ success: false, message: "Sizes required" });
        }

        parsedSizes.forEach(size => {
            if (!size.sku || size.stock === undefined) {
                throw new Error("Each size must have sku and stock");
            }
        });

        const skus = parsedSizes.map(s => s.sku);

        const existing = await productModel.findOne({
            "sizes.sku": { $in: skus }
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "SKU already exists"
            });
        }

        
        const productData = {
            name,
            description,
            price: Number(price),
            discount: Number(discount) || 0,
            category,
            subCategory,
            groupId,
            color: parsedColor,
            images: imageUrls,
            sizes: parsedSizes,
            fit,
            pattern,
            collar,
            sleeve,
            tags: parsedTags,
            bestseller: bestseller === "true" || bestseller === true,
            isActive: isActive === "false" ? false : true,
            date: Date.now()
        }


        const product = new productModel(productData);
        await product.save();

        console.log("FILES:", req.files);

        return res.status(201).json({ success: true, message: "Product Added", product });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message})
    }
    
}



// function for list products
const listProducts = async (req, res) => {

    try {

        const products = await productModel.find({ isActive: true });

        return res.status(200).json({ 
            success: true, 
            products 
        });
        
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
    
}



const listAllProductsAdmin = async (req, res) => {
    const products = await productModel.find({});
    res.json({ success: true, products });
}



// function for removing products
const removeProduct = async (req, res) => {

    try {

        const { id } = req.params;


        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }

        product.isActive = false;
        await product.save();


        return res.status(200).json({ 
            success: true, 
            message: "Product soft deleted"
        });
        
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
    
}



// RESTORE PRODUCT
const restoreProduct = async (req, res) => {
    try {
        
        const { id } = req.params;

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        product.isActive = true;
        await product.save();

        return res.json({
            success: true,
            message: "Product restored"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



// function for single product info
const singleProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const product = await productModel.findById({
            _id: id,
            isActive: true
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const relatedProducts = await productModel.find({
            groupId: product.groupId,
            isActive: true
        });

        return res.status(200).json({ success: true, product, colorOptions: relatedProducts });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
    
}



const updateProduct = async (req, res) => {
    try {
        
        const { id } = req.params;

        let data = req.body || {};

        const files = req.files || {};

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }


        // JSON PARSING
        if (data.color) {
            try {
                data.color = JSON.parse(data.color)
            } catch (error) {
                return res.status(400).json({ success: false, message: "Invalid color JSON" });
            }
        } 

        if (data.sizes) {
            try {
                data.sizes = JSON.parse(data.sizes)
            } catch (error) {
                return res.status(400).json({ success: false, message: "Invalid sizes JSON" });
            }
        } 

        if (data.tags) {
            try {
                data.tags = JSON.parse(data.tags)
            } catch (error) {
                return res.status(400).json({ success: false, message: "Invalid tags JSON" });
            }
        } 


        // validate sizes
        if (data.sizes) {
            data.sizes.forEach(size => {
                if (!size.sku || size.stock === undefined) {
                    throw new Error("Each size must have sku and stock");
                }
            });
        }


        // EXISTING IMAGES FROM FRONTEND
        let existingImages = [];
        if (data.existingImages) {
            existingImages = JSON.parse(data.existingImages);
        }

        // DELETE REMOVED IMAGES FROM CLOUDINARY
        const removedImages = product.images.filter(
            oldImg => !existingImages.some(img => img.public_id === oldImg.public_id)
        );

        for (const img of removedImages) {
            await cloudinary.uploader.destroy(img.public_id);
        }

        // UPLOAD NEW IMAGES
        let newImages = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {

                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: "image"
                });

                newImages.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        }

        // FINAL IMAGE ARRAY
        data.images = [...existingImages, ...newImages];
        

        const updated = await productModel.findByIdAndUpdate(
            id, 
            data, 
            { new: true }
        );


        return res.json({ 
            success: true, 
            message: "Product updated successfully",
            product: updated 
        });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}



// delete all products completely
const deleteInactiveProducts = async (req, res) => {
    
    try {

        const products = await productModel.find({ isActive: false });

        // DELETE ALL IMAGES
        for (const product of products) {
            for (const img of product.images) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        }
        
        const result = await productModel.deleteMany({ isActive: false });

        return res.status(200).json({
            success: true,
            message: `${result.deletedCount} products permanently deleted`
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// delete single product completely
const hardDeleteProduct = async (req, res) => {
    
    try {
        
        const { id } = req.params;

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.isActive) {
            return res.status(400).json({
                success: false,
                message: "Only inactive products can be permanently deleted"
            });
        }


        // DELETE IMAGES FROM CLOUDINARY
        for (const img of product.images) {
            await cloudinary.uploader.destroy(img.public_id);
        }

        await productModel.findByIdAndDelete(id);

        return res.json({
            success: true,
            message: "Product permanently deleted"
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}



export { addProduct, listProducts, listAllProductsAdmin, removeProduct, singleProduct, updateProduct, restoreProduct, deleteInactiveProducts, hardDeleteProduct }