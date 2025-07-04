import mongoose, { Document, Schema } from 'mongoose';

interface ISupport extends Document {
  name: string;
  email: string;
  labelId: string;
  subject: string;
  message: string;
  status: string;
}

const SupportSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  labelId: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' }
}, {
  timestamps: true
});

const Support = mongoose.models.Support || mongoose.model<ISupport>('Support', SupportSchema);

export default Support;