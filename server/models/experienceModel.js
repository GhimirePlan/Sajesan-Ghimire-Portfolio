import mongoose from 'mongoose';
const entrySchema = new mongoose.Schema({
  title: String, companyName: String, date: String, icon: String, iconBg: String,
  points: [String], isPublished: { type: Boolean, default: true },
}, { _id: false });
const Experience = mongoose.models.ExperienceCatalog || mongoose.model('ExperienceCatalog', new mongoose.Schema({
  key: { type: String, unique: true }, entries: [entrySchema],
}, { timestamps: true }));
export default Experience;
