import { Document, model, Schema } from "mongoose";

interface ICustomer extends Document {
  name: string;
  phone: string;
  address: string;
  userId: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const Customer = model<ICustomer>("Customer", customerSchema);
export default Customer;
