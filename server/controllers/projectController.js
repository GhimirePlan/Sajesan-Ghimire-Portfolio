import ContentState from '../models/contentStateModel.js';
import Project from '../models/projectModel.js';
import seeds from '../data/projects.json' with { type: 'json' };
import { contentPayload, sendContentError } from '../lib/content.js';
async function initialized() {
  return (
    !!(await ContentState.exists({ key: 'project-catalog', initialized: true })) ||
    !!(await Project.exists({}))
  );
}
async function importOriginals() {
  const result = await Project.bulkWrite(
    seeds.map(seed => ({
      updateOne: {
        filter: { id: seed.id },
        update: { $setOnInsert: contentPayload(seed, 'project') },
        upsert: true,
      },
    })),
    { ordered: false }
  );
  await ContentState.updateOne(
    { key: 'project-catalog' },
    { $set: { initialized: true } },
    { upsert: true }
  );
  return result;
}
export async function listProjects(req, res) {
  try {
    const admin = req.user?.isAdmin;
    const hasCatalog = await initialized();
    if (!hasCatalog) return res.json(admin ? [] : seeds.map(({ content, ...p }) => p));
    const projects = await Project.find(
      admin ? {} : { isPublished: true, isArchived: { $ne: true } }
    )
      .select('-content')
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(300)
      .lean();
    res.json(projects);
  } catch (error) {
    sendContentError(res, error);
  }
}
export async function getProject(req, res) {
  try {
    const filter = {
      id: req.params.id,
      ...(req.user?.isAdmin ? {} : { isPublished: true, isArchived: { $ne: true } }),
    };
    const project = req.user?.isAdmin
      ? await Project.findOne(filter)
      : await Project.findOneAndUpdate(filter, { $inc: { views: 1 } }, { returnDocument: 'after' });
    if (project) return res.json(project);
    if (!req.user?.isAdmin && !(await initialized())) {
      const seed = seeds.find(p => p.id === req.params.id);
      if (seed) return res.json(seed);
    }
    res.status(404).json({ message: 'Project not found' });
  } catch (error) {
    sendContentError(res, error);
  }
}
export async function createProject(req, res) {
  try {
    const payload = contentPayload(req.body, 'project');
    if (!(await initialized())) await importOriginals();
    const project = await Project.create(payload);
    res.status(201).json(project);
  } catch (error) {
    sendContentError(res, error);
  }
}
export async function updateProject(req, res) {
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const payload = contentPayload(
      { ...project.toObject(), ...req.body, id: project.id },
      'project'
    );
    Object.assign(project, payload);
    res.json(await project.save());
  } catch (error) {
    sendContentError(res, error);
  }
}
export async function archiveProject(req, res) {
  try {
    if (req.query.permanent === 'true') {
      const archived = await Project.findOne({ id: req.params.id });
      if (!archived) return res.status(404).json({ message: 'Project not found' });
      if (!archived.isArchived)
        return res
          .status(400)
          .json({ message: 'Archive the project before permanently deleting it.' });
      await archived.deleteOne();
      return res.json({ message: 'Project permanently deleted' });
    }
    const project = await Project.findOneAndUpdate(
      { id: req.params.id },
      { isArchived: true, isPublished: false },
      { returnDocument: 'after' }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project archived' });
  } catch (error) {
    sendContentError(res, error);
  }
}
export async function importProjects(req, res) {
  try {
    const result = await importOriginals();
    res.json({
      message: 'Original projects imported. Existing edits were preserved.',
      imported: result.upsertedCount,
    });
  } catch (error) {
    sendContentError(res, error);
  }
}
