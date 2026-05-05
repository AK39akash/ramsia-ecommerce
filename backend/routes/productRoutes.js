import express from "express";
import { addProduct, deleteInactiveProducts, hardDeleteProduct, listAllProductsAdmin, listProducts, removeProduct, restoreProduct, singleProduct, updateProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();


productRouter.post('/add', adminAuth, upload.any(), addProduct);

productRouter.get('/single/:id', singleProduct);

productRouter.get('/list', listProducts);

productRouter.get('/list-admin', adminAuth, listAllProductsAdmin);

productRouter.put('/update/:id', adminAuth, upload.any(), updateProduct);

productRouter.put('/remove/:id', adminAuth, removeProduct)

productRouter.put('/restore/:id', adminAuth, restoreProduct)

productRouter.delete('/delete-inactive', adminAuth, deleteInactiveProducts)

productRouter.delete('/hard-delete/:id', adminAuth, hardDeleteProduct);



export default productRouter;