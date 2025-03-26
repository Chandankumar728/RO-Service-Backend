import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const TechnicianSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    expertise: {
      type: String,
      required: true
    },
    availabilityStatus: {
      type: String,
      enum: ['Available', 'Busy', 'Inactive'],
      default: 'Available'
    }
  },
  {
    timestamps: true
  }
);

TechnicianSchema.plugin(aggregatePaginate);

const Technician = model('technicians', TechnicianSchema);

export default Technician;
