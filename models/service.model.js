import { model, Schema } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const RoleSchema = new Schema(
  {
    serviceTypeName: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

RoleSchema.plugin(aggregatePaginate);

const Role = model('tbl_service_mstrs', RoleSchema);
export default Role;
