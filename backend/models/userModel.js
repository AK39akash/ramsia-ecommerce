import mongoose from "mongoose";

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
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    phone: {
        type: String
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    userReviews: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },

            orderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "order"
            },

            sku: String,
            size: String,

            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },

            comment: String,

            reviewedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    cartData: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            size: String,
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],

    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],

    addresses: [addressSchema],

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    lastLogin: Date

}, { timestamps: true, minimize: false })



userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.resetPasswordToken;
    delete obj.resetPasswordExpire;
    return obj;
}


const userModel = mongoose.models.user || mongoose.model('user', userSchema);


export default userModel;