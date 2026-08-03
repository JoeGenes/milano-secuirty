import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  type: { type: String, default: 'career', trim: true },
  fullName: { type: String, trim: true },
  name: { type: String, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, trim: true },
  region: { type: String, trim: true },
  education: { type: String, trim: true },
  experience: { type: String, trim: true },
  coverMessage: { type: String, trim: true },
  message: { type: String, trim: true },
  details: { type: String, trim: true },
  category: { type: String, trim: true },
  customerType: { type: String, trim: true },
  premisesType: { type: String, trim: true },
  selectedServices: [{ type: String }],
  urgency: { type: String, trim: true },
  description: { type: String, trim: true },
  positionTitle: { type: String, trim: true },
  positionLocation: { type: String, trim: true },
  companyName: { type: String, trim: true },
  recipient: { type: String, trim: true },
  fallbackLink: { type: String, trim: true },
  deliveryStatus: { type: String, default: 'delivered', trim: true },
  createdAt: { type: String, default: () => new Date().toISOString() }
}, {
  timestamps: true
});

export const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
