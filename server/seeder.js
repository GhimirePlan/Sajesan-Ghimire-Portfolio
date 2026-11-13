import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/userModel.js';
import connectDB from './config/db.js';
try {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME = 'Sajesan Ghimire' } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 16)
    throw new Error(
      'Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 16 characters) before creating an admin.'
    );
  await connectDB();
  if (await User.exists({ email: ADMIN_EMAIL.toLowerCase() }))
    throw new Error('This user already exists; no changes made.');
  await User.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL.toLowerCase(),
    password: ADMIN_PASSWORD,
    isAdmin: true,
  });
  console.log('Admin created. Existing users were preserved.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
