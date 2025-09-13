import { Bill } from "../models/bill.model.js"
import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createBill = asyncHandler(async (req, res) => {
  const { items, totalAmount } = req.body;

  if (!items || !totalAmount) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "items and totalAmount are required"));
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Items array must not be empty"));
  }

  const itemsWithDetails = [];

  for (const item of items) {
    const { id, quantity } = item;

    const product = await Product.findOne({ barcode: id });

    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, `Product not found: ${id}`));
    }

    if (product.stock < quantity) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, `Insufficient stock for product: ${product.name}`));
    }

    // Update stock
    product.stock -= quantity;
    await product.save();

    // Add to bill items
    itemsWithDetails.push({
      productId: product._id,
      name: product.name,
      barcode: product.barcode,
      price: product.price,
      quantity,
    });
  }

  const newBill = new Bill({
    billId: Date.now().toString(),
    items: itemsWithDetails, // ✅ Correct key name
    totalAmount,
  });

  await newBill.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { bill: newBill }, "Bill created and stock updated successfully"));
});



const viewAllBills = asyncHandler(async (req, res) => {
  const bills = await Bill.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, { bills }, "All bills retrieved successfully"));
});

const searchBills = asyncHandler(async (req, res) => {
  const { billId } = req.body;
  if (!billId) {
    return res.status(400).json(new ApiResponse(400, {}, "billId required"));
  }

  const bills = await Bill.find({ billId: { $regex: billId, $options: "i" } });

  if (bills.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "No bills found matching the criteria"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { bills }, "Bills found matching the criteria"));
});

const getBillDetails = asyncHandler(async (req, res) => {
  const { billId } = req.body;  

  if (!billId) {
    return res.status(400).json(new ApiResponse(400, {}, "billId required"));
  }
  const bill = await Bill.findOne({ _id: billId });

  if (!bill) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "No such bill found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { bill }, "Bill found"));
});

export {
    createBill,
    viewAllBills,
    searchBills,
    getBillDetails
}