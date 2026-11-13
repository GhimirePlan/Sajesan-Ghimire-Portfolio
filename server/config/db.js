import mongoose from 'mongoose';
let pending;
mongoose.set('bufferCommands', false);
export default function connectDB() {
  if (mongoose.connection.readyState === 1) return Promise.resolve(mongoose.connection);
  if (!process.env.MONGO_URI) return Promise.reject(new Error('MONGO_URI is not configured'));
  if (!pending)
    pending = mongoose
      .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000, maxPoolSize: 10 })
      .catch(error => {
        pending = undefined;
        throw error;
      });
  return pending;
}
