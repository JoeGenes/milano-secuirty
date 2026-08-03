import mongoose from 'mongoose';

const vacancySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  type: { type: String, default: 'Full-Time', trim: true },
  desc: { type: String, required: true, trim: true },
  requirements: [{ type: String, trim: true }],
  deadline: { type: String, required: true },
  publishedOn: { type: String, default: () => new Date().toISOString() },
  pdfFileName: { type: String, default: '' },
  pdfDataUrl: { type: String, default: '' }
}, {
  timestamps: true
});

export const Vacancy = mongoose.models.Vacancy || mongoose.model('Vacancy', vacancySchema);
