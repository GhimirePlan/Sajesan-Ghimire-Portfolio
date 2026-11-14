import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const generateToken = (id, tokenVersion = 0) => {
  return jwt.sign({ id, tokenVersion }, process.env.JWT_SECRET, {
    expiresIn: '8h',
  });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      email.length > 254 ||
      password.length > 1024
    )
      return res.status(400).json({ message: 'Invalid credentials' });
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id, user.tokenVersion),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating user', error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (typeof currentPassword !== 'string' || currentPassword.length > 1024 ||
      typeof newPassword !== 'string' || newPassword.length < 12 || newPassword.length > 128)
    return res.status(400).json({ message: 'Choose a password between 12 and 128 characters.' });
  const user = await User.findById(req.user._id);
  if (!user || !(await user.matchPassword(currentPassword)))
    return res.status(401).json({ message: 'Current password is incorrect.' });
  if (currentPassword === newPassword)
    return res.status(400).json({ message: 'Choose a different password.' });
  user.password = newPassword;
  user.tokenVersion = (user.tokenVersion || 0) + 1;
  await user.save();
  res.json({ message: 'Password changed. Sign in again with your new password.' });
};

export { authUser, changePassword };
