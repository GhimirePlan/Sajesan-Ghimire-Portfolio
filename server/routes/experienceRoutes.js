import express from 'express';
import Experience from '../models/experienceModel.js';
import connectDB from '../config/db.js';
import { protect, admin } from '../middleware/authMiddleware.js';

let cached;
let expires = 0;
let pending;
const TTL = 60_000;
export function validateEntries(input) {
  if (!Array.isArray(input) || input.length > 40) throw new Error('Use up to 40 experience entries.');
  const text = (value, max, required = false) => {
    if (typeof value !== 'string' || value.length > max || (required && !value.trim()))
      throw new Error('Check required fields and text lengths.');
    return value.trim();
  };
  return input.map(entry => {
    const icon = text(entry.icon || '', 1000);
    if (icon && !/^\/(?!\/)/.test(icon) && !/^https:\/\//i.test(icon))
      throw new Error('Use an HTTPS image URL or a local image path.');
    if (!/^#[\da-f]{6}$/i.test(entry.iconBg)) throw new Error('Choose a valid background colour.');
    if (!Array.isArray(entry.points) || entry.points.length > 15) throw new Error('Use up to 15 highlights per entry.');
    return {
      title: text(entry.title, 180, true), companyName: text(entry.companyName, 180, true),
      date: text(entry.date, 100, true), icon, iconBg: entry.iconBg,
      points: entry.points.filter(point => typeof point !== 'string' || point.trim()).map(point => text(point, 1000, true)),
      isPublished: entry.isPublished !== false,
    };
  });
}
// Mounted before the general database middleware: warm reads never touch MongoDB.
export async function publicExperience(req, res, next) {
  try {
    if (expires <= Date.now()) {
      if (!pending) pending = (async () => {
        await connectDB();
        const doc = await Experience.findOne({ key: 'experience' }).lean();
        cached = { entries: doc ? doc.entries.filter(entry => entry.isPublished) : null };
        expires = Date.now() + TTL;
      })().finally(() => { pending = undefined; });
      await pending;
    }
    res.set('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=300');
    res.json(cached);
  } catch (error) {
    if (cached) {
      res.set('Cache-Control', 'public, max-age=30');
      return res.json(cached);
    }
    next(error);
  }
}
const router = express.Router();
router.use(protect, admin);
router.get('/manage', async (req, res) => {
  const doc = await Experience.findOne({ key: 'experience' }).lean();
  res.json({ entries: doc?.entries ?? null });
});
router.put('/', async (req, res) => {
  let entries;
  try { entries = validateEntries(req.body.entries); }
  catch (error) { return res.status(400).json({ message: error.message }); }
  await Experience.findOneAndUpdate({ key: 'experience' }, { $set: { entries } }, { upsert: true });
  cached = undefined;
  expires = 0;
  res.json({ entries });
});
export default router;
