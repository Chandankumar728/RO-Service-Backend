import { model, Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const ItemsSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "tbl_bookings",
      path: "_id",
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    unitPrice: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

ItemsSchema.plugin(aggregatePaginate);

const Role = model("tbl_items", ItemsSchema);
export default Role;
