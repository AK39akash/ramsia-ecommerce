import express from 'express';
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, cancelStripeSession, stripeWebhook, getSingleOrder, cancelOrder  } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();


// Admin Features
orderRouter.get('/list', adminAuth, allOrders)
orderRouter.put('/status', adminAuth, updateStatus)


// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)



// User Features
orderRouter.get('/userOrders', authUser, userOrders)

orderRouter.get('/:id', authUser, getSingleOrder);



// cancel payment
orderRouter.post('/cancel', authUser, cancelOrder);

orderRouter.post('/webhook', stripeWebhook);

export default orderRouter;
