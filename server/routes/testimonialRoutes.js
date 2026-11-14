import express from 'express';
import Testimonial from '../models/testimonialModel.js';
import connectDB from '../config/db.js';
import { protect, admin } from '../middleware/authMiddleware.js';

let cached;
let expires = 0;
let pending;
const TTL = 60_000;
export function validateEntries(input) {
  if (!Array.isArray(input) || input.length > 30) throw new Error('Use up to 30 testimonials.');
  const text = (value, max, required = false) => {
    if (typeof value !== 'string' || value.length > max || (required && !value.trim()))
      throw new Error('Check required fields and text lengths.');
    return value.trim();
  };
  return input.map(entry => {
    if (!entry || typeof entry !== 'object') throw new Error('Invalid testimonial.');
    return {
      name: text(entry.name, 120, true),
      testimonial: text(entry.testimonial, 2000, true),
      designation: text(entry.designation ?? '', 180),
      company: text(entry.company ?? '', 180),
      isPublished: entry.isPublished !== false,
    };
  });
}
// Mounted before the general database middleware: warm reads never touch MongoDB.
export async function publicTestimonials(req, res, next) {
  try {
    if (expires <= Date.now()) {
      if (!pending) pending = (async () => {
        await connectDB();
        const doc = await Testimonial.findOne({ key: 'testimonials' }).lean();
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
  const doc = await Testimonial.findOne({ key: 'testimonials' }).lean();
  res.json({ entries: doc?.entries ?? null });
});
router.put('/', async (req, res) => {
  let entries;
  try { entries = validateEntries(req.body.entries); }
  catch (error) { return res.status(400).json({ message: error.message }); }
  await Testimonial.findOneAndUpdate({ key: 'testimonials' }, { $set: { entries } }, { upsert: true });
  cached = undefined;
  expires = 0;
  res.json({ entries });
});
export default router;
