const mongoose = require("mongoose");
// const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    address: String,
    zipCode:{
      type: Number,
      required: false,
    },
    images:{
      type: [String],
      required:false
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // slug: String,
    isAvailable: {
      type: Boolean,
      default: true, // Default value is true (product is available)
    },
    isPublish:{
      type:Number,
      default:0,
    },
    isFeatured:{
      type:Boolean,
      default:false,
    }
  },
  { timestamps: true } // Include timestamps for created and updated
);

// Create a slug before saving the product
// productSchema.pre("save", function (next) {
//   this.slug = slugify(this.title, { lower: true });
//   next();
// });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
