import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const BookingSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    serviceType: {
      type: String,
      required: true
    },
    preferredDate: {
      type: Date,
      required: true
    },
    additionalInfo: {
      type: String
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

BookingSchema.plugin(aggregatePaginate);

const Booking = model('bookings', BookingSchema);

export default Booking;