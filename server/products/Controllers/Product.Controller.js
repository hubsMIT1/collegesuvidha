const Product = require("../Models/Product.Model");
const {productSchema} = require("../Helpers/validation_product_schema");
const fs = require('fs');
const { verifyAdmin } = require("../../auth_/admin/Admin");
const validateProduct = (data) => {
  return productSchema.validateAsync(data);
};

const createProduct = async (req, res) => {
  try {
    
    const { error } = validateProduct(req.body);
    // console.log(req.body)
    // console.log(req?.payload);
    if (error) {
      return res
        .status(400)
        .json({ message: error.details.map((detail) => detail.message) });
    }
    const {
      title,
      description,
      category,
      price,
      quantity,
      address,
      zipCode,
      
    } = req.body;
    const userId = req?.payload?.aud;
    
    const images = req.files.map((file) => {
      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

      return base64Image;
    });
    // console.log(images)
    const newProduct = new Product({
      title,
      description,
      category,
      price,
      quantity,
      address,
      zipCode,
      images,
      userId,
    });
    // console.log(newProduct)
    const savedProduct = await newProduct.save();
    res.status(200).json({message:"Product added successfully, It will get verify soon"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {3

  try {
    const searchText = req.query.search 
    const category = req.query.category 
    const sortField = req.query.sort || 'createdAt';
    const sortOrder = parseInt(req.query.order) || -1;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 18;

    const query = {};

    // Apply category filter if provided
    if (category!=='undefined') {
      const categoryFilter = Array.isArray(category) ? category : [category?.toLowerCase()];
      query.category = { $in: categoryFilter };
    }
  
    // Apply search filter if search text is provided
    if (searchText && searchText!=='undefined' && searchText.trim() !== '') {
      const regex = new RegExp(searchText, 'i');
      query.$or = [{ title: regex }, { description: regex }];
    }

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / pageSize);

    let products;

    // Check if there is no category or search text, then give the first 18 elements
    if (!query.length) {
      products = await Product.find()
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    } else {
      console.log(category,query)
      products = await Product.find(query)
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    }

    res.send({
      products,
      page,
      pageSize,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductsByUserId = async (req, res) => {
  try {
    // const userId = req?.payload?.aud;
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1; // Get page from query parameter, default to 1
    const pageSize = 18; // Number of products per page

    const totalProducts = await Product.countDocuments({ userId });
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await Product.find({ userId: userId })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

      res.json({
        products,
        totalPages,
        currentPage: page,
        totalProducts: totalProducts,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductsById = async (req, res) => {
  try {
    // const userId = req?.payload?.aud;
    const id = req.params.id;

    const products = await Product.findOne({ _id:id })
      res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const searchProducts = async (req, res) => {
  try {
    const userId = req?.query?.userId;
    const searchText = req.query.search || '';
    const category = req.query.category || '';
    const sortField = req.query.sort || 'createdAt'; // Default to sorting by creation date
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 18;

    const query = { };

    // Apply category filter if provided
    if(userId){
      query.userId = userId;
    }
    if (category) {
      query.category = { $in: Array.isArray(category) ? category : [category] };
    }

    // Apply search filter if search text is provided
    if (searchText && searchText.trim() !== '') {
      const regex = new RegExp(searchText, 'i');
      query.$or = [{ title: regex }, { description: regex }];
    }

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await Product.find(query)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.send({
      products,
      page,
      pageSize,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const userId = req.payload.aud;
    const productId = req.params.Id;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    await verifyAdmin();
    const isAdminId = req?.user?.admin;
    // Check if the user is the owner of the product
    if (existingProduct.userId.toString() !== userId ||  !isAdminId) {
      return res
        .status(403)
        .json({ message: "Unauthorized. You do not own this product." });
    }
     const allowedFields = [
      "title",
      "description",
      "category",
      "price",
      "quantity",
      "address",
      "zipCode",
      "images",
      "isAvailable",
    ];
    // admin only can updated 
    if(isAdminId){
      allowedFields.push("isFeatured");
      allowedFields.push("isPublish");
    }

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        existingProduct[field] = req.body[field];
      }
    });


    const updatedProduct = await existingProduct.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const userId = req.payload.aud;
    const productId = req.params.id;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user is the owner of the product or an admin
    if (
      existingProduct.userId.toString() !== userId || !isAdminId
    ) {
      return res
        .status(403)
        .json({
          message:
            "Unauthorized. You do not own this product and are not an admin.",
        });
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsById,
  searchProducts,
  getProductsByUserId,
};
