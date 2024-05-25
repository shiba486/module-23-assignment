import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    qty: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },

  },
  { timestamps: true, versionKey: false }
);

export const CartModel = mongoose.model("carts", DataSchema);
