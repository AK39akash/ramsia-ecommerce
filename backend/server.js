import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import dotenv from 'dotenv';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import wishlistRouter from './routes/wishlistRoutes.js'
import reviewRouter from './routes/reviewRoutes.js'
import { stripeWebhook } from './controllers/orderController.js';

dotenv.config();



// App Config
const app = express();
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()


app.post("/api/order/webhook", express.raw({ type: "application/json" }), stripeWebhook);


// middlewares
app.use(express.json());
app.use(cors());


// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/review', reviewRouter);

app.get('/', (req, res) => {
    res.send("API WORKING")
})


app.listen(port, () => console.log('Server started on Port: '+ port));