import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  billId: {
    type: String,
    required: true,
    unique: true, 
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      barcode: {
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
        min: 1,
      },
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  }
},{
  timestamps: true
});

export const Bill = mongoose.model('Bill', billSchema);