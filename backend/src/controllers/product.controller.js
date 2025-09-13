import { Product } from "../models/product.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

const updateProduct = asyncHandler(async (req, res) => {
  const { barcode, name, price, stock } = req.body;

  if (!barcode || !name || !price || !stock) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  const product = await Product.findOne({ barcode: barcode });

  if (!product) {
    const newProduct = new Product({ barcode, name, price, stock });
    await newProduct.save();
    return res
      .status(200)
      .json(new ApiResponse(200, { product: newProduct }, "Product created"));
  }

  product.name = name;
  product.price = price;
  product.stock = stock;
  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { product }, "Product updated"));
});

const getDetails = asyncHandler(async (req, res) => {
  const { barcode } = req.body;

  if (!barcode) {
    return res.status(400).json(new ApiResponse(400, {}, "barcode required"));
  }

  const product = await Product.findOne({ barcode: barcode });

  if (!product) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "No such product found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { product }, "Product found"));
});

const viewAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, { products }, "All products retrieved"));
});

const searchProducts = asyncHandler(async (req, res) => {
  const {type, value} = req.body;

  if (!type || !value) {
    return res.status(400).json(new ApiResponse(400, {}, "type and value required"));
  }

  let products;
  if (type === 'name') {
    products = await Product.find({ name: { $regex: value, $options: 'i' } });
  } else if (type === 'barcode') {
    products = await Product.find({ barcode: { $regex: value, $options: 'i' } });
  } else {
    return res.status(400).json(new ApiResponse(400, {}, "Invalid search type"));
  }
})

export {
  updateProduct,
  getDetails,
  viewAllProducts,
  searchProducts
}