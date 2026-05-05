import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    name: String,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: String
}, { timestamps: true })



const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true,
        unique: true,
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        default: 0
    },

    finalPrice: {
        type: Number,
        default: 0
    },

    category: {
        type: String,
        required: true
    },

    subCategory: {
        type: String,
        required: true
    },

    // 🔗 GROUPING ALL COLOR PRODUCTS
    groupId: {
        type: String,
        required: true
    },

    // 🎨 THIS PRODUCT'S COLOR
    color: {
        name: String,
    },

    images: [
        {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
        }
    ],

    sizes: [
        {
            size: {
                type: String,
                enum: ["S", "M", "L", "XL", "XXL"]
            },
            stock: {
                type: Number,
                required: true
            },
            sku: {
                type: String,
                required: true
            }
        }
    ],

    fit: {
        type: String
    },

    pattern: {
        type: String
    },

    collar: {
        type: String
    },

    sleeve: {
        type: String
    },

    tags: {
        type: [String],
        default: []
    },

    bestseller: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: true
    },

    reviews: [reviewSchema],

    averageRating: {
        type: Number,
        default: 0
    },

    totalReviews: {
        type: Number,
        default: 0
    },

    date: {
        type: Number,
        required: true
    }

}, { timestamps: true });


productSchema.pre("validate", function (next) {
    if (this.name && !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    }
    next();
});

productSchema.pre("save", function (next) {
    
    if (this.price !== undefined) {
        const discountAmount = (this.price * this.discount) / 100;
        this.finalPrice = Math.round(this.price - discountAmount);
    }

    next();
});


productSchema.pre("findOneAndUpdate", function (next) {

    const update = this.getUpdate();

    if (update.price !== undefined || update.discount !== undefined) {
        
        const price = update.price ?? this._update.price;
        const discount = update.discount ?? this._update.discount ?? 0;

        const discountAmount = (price * discount) / 100;

        update.finalPrice = Math.round(price - discountAmount);

        this.setUpdate(update);
    }

    next();
    
})


// INDEXING FOR PERFORMANCE
productSchema.index({ slug: 1 });
productSchema.index({ groupId: 1 });
productSchema.index({ category: 1, subCategory: 1, price: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ "reviews.userId": 1 });

const productModel =
    mongoose.models.product ||
    mongoose.model("product", productSchema);

export default productModel;