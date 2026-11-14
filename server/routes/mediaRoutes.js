import Blog from '../models/blogModel.js';
import Project from '../models/projectModel.js';
import Experience from '../models/experienceModel.js';
import express from 'express';
import mongoose from 'mongoose';
import Media from '../models/mediaModel.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();
export function imageType(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 12) return null;
  if (buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
    return 'image/png';
  if (buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) return 'image/jpeg';
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP')
    return 'image/webp';
  if (/^GIF8[79]a$/.test(buffer.toString('ascii', 0, 6))) return 'image/gif';
  return null;
}
router.get('/manage', protect, admin, async (req, res) => {
  const files = await Media.find({}).select('-data').sort({ createdAt: -1 }).limit(80).lean();
  res.json(files.map(file => ({ ...file, url: `/api/media/${file._id}` })));
});
router.post(
  '/',
  protect,
  admin,
  express.raw({ type: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'], limit: '2mb' }),
  async (req, res) => {
    const type = imageType(req.body);
    if (!type || type !== req.get('content-type')?.split(';')[0])
      return res.status(400).json({ message: 'Upload a valid PNG, JPEG, WebP, or GIF image.' });
    let filename = 'image';
    try {
      filename = decodeURIComponent(req.get('x-filename') || 'image')
        .replace(/[^\w .-]/g, '')
        .slice(0, 120);
    } catch {}
    const file = await Media.create({
      data: req.body,
      contentType: type,
      filename,
      bytes: req.body.length,
      createdBy: req.user._id,
    });
    res
      .status(201)
      .json({ _id: file._id, url: `/api/media/${file._id}`, filename, bytes: file.bytes });
  }
);
router.patch('/:id', protect, admin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).json({ message: 'Image not found' });
  const filename = req.body.filename;
  if (typeof filename !== 'string' || !filename.trim() || filename.length > 120)
    return res.status(400).json({ message: 'Enter a filename under 120 characters.' });
  const file = await Media.findByIdAndUpdate(
    req.params.id,
    { filename: filename.trim() },
    { returnDocument: 'after' }
  ).select('-data');
  if (!file) return res.status(404).json({ message: 'Image not found' });
  res.json(file);
});
router.delete('/:id', protect, admin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).json({ message: 'Image not found' });
  const reference = {
    $or: [{ coverImage: { $regex: req.params.id } }, { content: { $regex: req.params.id } }],
  };
  if ((await Blog.exists(reference)) || (await Project.exists(reference)) ||
      (await Experience.exists({ 'entries.icon': { $regex: req.params.id } })))
    return res.status(409).json({
      message:
        'This image is used by saved content. Remove it from that content before deleting it.',
    });
  const file = await Media.findByIdAndDelete(req.params.id);
  if (!file) return res.status(404).json({ message: 'Image not found' });
  res.json({ message: 'Unused image deleted' });
});
router.get('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).json({ message: 'Image not found' });
  const file = await Media.findById(req.params.id).select('+data');
  if (!file) return res.status(404).json({ message: 'Image not found' });
  const etag = `"${file._id}"`;
  res.set({
    'Content-Type': file.contentType,
    'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
    ETag: etag,
    'Cross-Origin-Resource-Policy': 'cross-origin',
  });
  if (req.get('if-none-match') === etag) return res.status(304).end();
  res.end(file.data);
});
export default router;
