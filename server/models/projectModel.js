import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
    scope: { type: String, enum: ['professional', 'academic'], required: true },
    discipline: {
      type: String,
      enum: ['solar', 'power', 'buildings', 'automation'],
      required: true,
    },
    group: { type: String, default: '' },
    tags: [String],
    details: [String],
    coverImage: { type: String, default: '' },
    coverAlt: { type: String, default: '' },
    pdfUrl: { type: String, default: '' },
    sourceUrl: { type: String, default: '' },
    isPublished: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export default mongoose.model('Project', projectSchema);
