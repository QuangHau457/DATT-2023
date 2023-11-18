import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    cartId: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
    },
    phone: {
      type: String,
    },
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    totalPrice:{
      type:Number
    },
    status: {
      type: String,
      enum: ["Chờ xác nhận", "Hủy đơn hàng", "Đã xác nhận", "Đã giao hàng", "Đang giao hàng"],
      default: "Chờ xác nhận",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Bill", billSchema);
