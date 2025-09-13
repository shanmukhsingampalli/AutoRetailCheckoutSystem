import { Bill } from "../models/bill.model"
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

const createBill = asyncHandler(async (req, res) => {
  const { billId, items, totalAmount } = req.body;

  if (!billId || !items || !totalAmount) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "billId, items, and totalAmount are required"));
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Items array must not be empty"));
  }

  for (const item of items) {
    const { productId, quantity } = item;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, `Product not found: ${productId}`));
    }

    if (product.stock < quantity) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, `Insufficient stock for product: ${product.name}`));
    }

    product.stock -= quantity;
    await product.save();
  }

  const newBill = new Bill({
    billId,
    items,
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

export {
    createBill,
    viewAllBills
}