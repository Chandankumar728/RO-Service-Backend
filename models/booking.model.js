import { Schema, model } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const BookingSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    applicationNo: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    preferredDate: {
      type: Date,
      required: true,
    },
    additionalInfo: {
      type: String,
    },
    technicianId: {
      type: Schema.Types.ObjectId,
      ref: "technicians",
      path: "_id",
    },
    // technicianId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "technicians", // ✅ Corrected reference
    //   },

    assignDate: {
      type: String,
    },
    aasigntime: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.plugin(aggregatePaginate);

const Booking = model("tbl_bookings", BookingSchema);

export default Booking;
