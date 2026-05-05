import express, { Router } from 'express';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlistController.js';
import authUser from '../middleware/auth.js';


const wishlistRouter = express.Router();


wishlistRouter.post('/add', authUser, addToWishlist );
wishlistRouter.delete('/remove', authUser, removeFromWishlist );
wishlistRouter.get('/get', authUser, getWishlist );



export default wishlistRouter;