import mongoose from 'mongoose';
const entrySchema = new mongoose.Schema({
  name: String, designation: String, company: String, testimonial: String,
  isPublished: { type: Boolean, default: true },
}, { _id: false });
export default mongoose.models.TestimonialCatalog || mongoose.model('TestimonialCatalog', new mongoose.Schema({
  key: { type: String, unique: true }, entries: [entrySchema],
}, { timestamps: true }));
