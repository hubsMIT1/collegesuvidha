const Product = require("../Models/Product.Model");
const { productSchema } = require("../Helpers/validation_product_schema");
const fs = require("fs");
const { verifyAdmin } = require("../../auth_/admin/Admin");
const validateProduct = async (data) => {
  return await productSchema.validateAsync(data);
};
const Admin = require("../../auth_/admin/Admin.Model");
const createError = require("http-errors");

const createProduct = async (req, res) => {
  try {
    const { error } = await validateProduct(req.body);
    
    if (error) {
      return res
        .status(400)
        .json({ message: error.details.map((detail) => detail.message) });
    }
    const { title, description, category, price, quantity, address, zipCode } =
      req.body;
    const userId = req?.payload?.aud;
    const images = req.body?.imagess;
    
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
    res
      .status(200)
      .json({ message: "Product added successfully, It will get verify soon" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const searchText = req.query.search;
    const category = req.query.category;
    const sortField = req.query.sort || "createdAt";
    const sortOrder = parseInt(req.query.order) || -1;
    const featured = parseInt(req.query?.isFeatured);
    const page = parseInt(req.query.page) || 1;
    // let pageSize = 18;
    const perPage = parseInt(req.query?.perpage) || 18;
    const pageSize = perPage ? Math.min(perPage, 18) : 18;

    const query = {};
   
    if (category !== "undefined") {
      const categoryFilter = category
        .split(",")
        .map((cat) => cat.toLowerCase());
      query.category = { $in: categoryFilter };
    }

    // Apply search filter if search text is provided
    if (
      searchText !== null &&
      searchText !== "undefined" &&
      searchText.trim() !== ""
    ) {
      const regex = new RegExp(searchText, "i");
      query.$or = [
        { title: regex },
        { description: regex },
        { category: regex },
      ];
    }
  

    let totalProducts;
    // console.log(query,Object.keys(query).length)
    // Check if there is no category or search text, then give the first 18 elements
    if (!Object.keys(query).length) {
      cntQuery = {};
      if (featured) {
        cntQuery.isFeatured = featured;
      }
      cntQuery.isPublish = 1;
      totalProducts = await Product.countDocuments(cntQuery);
    } else {
      if (featured) {
        query.isFeatured = featured;
      }
      query.isPublish = 1;
      totalProducts = await Product.countDocuments(query);
    }

    let products;
    console.log(query)
    // Check if there is no category or search text, then give the first 18 elements
    if (!Object.keys(query).length) {
      if (featured) {
        query.isFeatured = featured;
      }
      query.isPublish = 1;
      products = await Product.find(query)
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    } else {
      if (featured) {
        query.isFeatured = featured;
      }
      query.isPublish = 1;
      products = await Product.find(query)
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    }

    const totalPages = Math.ceil(totalProducts / pageSize);

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
    const sortField = req.query.sort || "createdAt";
    const page = parseInt(req.query.page) || 1; // Get page from query parameter, default to 1
    const pageSize = 18; // Number of products per page
    const category = req.query.category;
    const sortOrder = parseInt(req.query.order) || -1;
    const loggedId = req?.payload?.aud;

    // admin dashboard all recent product
    const admin = await Admin.findOne({ adminId: userId });
    const isAdminId = admin ? true : false;
    // console.log("jeee")
    if (isAdminId) {
      const totalProducts = await Product.countDocuments();
      const totalPages = Math.ceil(totalProducts / pageSize);
      const products = await Product.find()
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      // console.log(products)
      return res.json({
        products,
        totalPages,
        currentPage: page,
        totalProducts: totalProducts,
      });
      // return;
      // next();
    } else if (userId === loggedId) {
      const totalProducts = await Product.countDocuments({ userId: userId });
      const totalPages = Math.ceil(totalProducts / pageSize);

      const products = await Product.find({ userId: userId })
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      return res.json({
        products,
        totalPages,
        currentPage: page,
        totalProducts: totalProducts,
      });
    }
    const totalProducts = await Product.countDocuments({
      userId: userId,
      isPublish: 1,
    });
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await Product.find({ userId: userId, isPublish: 1 })
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return res.json({
      products,
      totalPages,
      currentPage: page,
      totalProducts: totalProducts,
    });
    // return res.status(401).json({message:"You don't own these products!!"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsById = async (req, res) => {
  try {
    // const userId = req?.payload?.aud;
    const id = req.params.id;

    const products = await Product.findOne({ _id: id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const searchProducts = async (req, res) => {
  try {
    const userId = req?.query?.userId;
    const searchText = req.query.search || "";
    const category = req.query.category || "";
    const sortField = req.query.sort || "createdAt"; // Default to sorting by creation date
    const sortOrder = req.query.order === "desc" ? -1 : 1;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 18;

    const query = {};

    // Apply category filter if provided
    if (userId) {
      query.userId = userId;
    }
    if (category) {
      query.category = { $in: Array.isArray(category) ? category : [category] };
    }

    // Apply search filter if search text is provided
    if (searchText && searchText.trim() !== "") {
      const regex = new RegExp(searchText, "i");
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
const updateProductStatus = async (req, res) => {
  try {
    const userId = req.payload.aud;
    const productId = req.params.productId;
    const field = req.query.field;
    const { statusCode } = req.body;

    const admin = await Admin.findOne({ adminId: userId });
    const isAdminId = admin ? true : false;

    if (!isAdminId) {
      return res.status(403).json({ message: "Unauthorized. You do not own this product." });
    }

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let updatedField;
  
    if (field === "status" && (statusCode==0 || statusCode==1)) {
      existingProduct["isPublish"] = statusCode;
      updatedField = "isPublish";
    } else if (field === "featured" && (statusCode==0 || statusCode==1)) {
      existingProduct["isFeatured"] = statusCode;
      updatedField = "isFeatured";
    } else {
      return res.status(422).json({ message: "This field doesn't exist or can't be updated!!" });
    }

    await existingProduct.save();

    return res.status(200).json({ status: statusCode, field: updatedField, message: "Updated Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const userId = req.payload.aud;
    const productId = req.params.id;
    // console.log(req.body)
    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    // await verifyAdmin(req,res,next);
    const admin = await Admin.findOne({ adminId: userId });

    const isAdminId = admin ? true : false;
    
    if (existingProduct.userId.toString() !== userId && !isAdminId) {
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
      "imagess",
      "isAvailable",
    ];
    
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        existingProduct[field] = req.body[field];
      }
      // console.log(req.body[field])
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
    const admin = await Admin.findOne({ adminId: userId });

    const isAdminId = admin ? true : false;
    // Check if the user is the owner of the product or an admin
    if (existingProduct.userId.toString() !== userId && !isAdminId) {
      return res.status(403).json({
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
  updateProductStatus,
};