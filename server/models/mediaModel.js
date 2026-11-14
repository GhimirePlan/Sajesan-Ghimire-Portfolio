import mongoose from 'mongoose';
export default mongoose.model(
  'Media',
  new mongoose.Schema(
    {
      data: { type: Buffer, required: true, select: false },
      contentType: { type: String, required: true },
      filename: String,
      bytes: Number,
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
  )
);
