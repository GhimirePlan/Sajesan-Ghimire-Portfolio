import mongoose from 'mongoose';
export default mongoose.model(
  'ContentState',
  new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    initialized: { type: Boolean, default: true },
  })
);
