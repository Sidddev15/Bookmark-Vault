import { Router } from 'express';
import { LinkStore } from '../store/linkStore';
import { CreateLinkSchema } from '../models/link';
import { linkRepo } from '../repository/linkRepo';
import z from 'zod';

export const linksRouter = Router();

// Get all
linksRouter.get('/', async (_req, res, next) => {
  try {
    const data = await linkRepo.findAll();
    res.json({ pl: true, data });
  } catch (error) {
    next(error);
  }
});

// get by id
linksRouter.get('/:id', async (req, res, next) => {
  try {
    const item = await linkRepo.findById(req.params.id);
    if (!item) return res.status(404).json({ ok: false, error: 'Not found' });
    res.json({ ok: true, data: item });
  } catch (error) {
    next(error);
  }
});

//post create
linksRouter.post('/', async (req, res, next) => {
  try {
    const parse = CreateLinkSchema.pick({
      url: true,
      title: true,
      tags: true,
      readLater: true,
    }).partial({ readLater: true }).safeParse(req.body);

    if (!parse.success) {
      return res.status(400).json({ ok: false, error: parse.error.flatten() });
    }
    const created = await linkRepo.create(parse.data);
    res.status(201).json({ ok: true, data: created });
  } catch (err) {
    next(err);
  }
});

// PATCH update
linksRouter.patch('/:id', async (req, res, next) => {
  try {
    const schema = z.object({
      url: z.string().url().optional(),
      title: z.string().min(1).optional(),
      tags: z.array(z.string()).optional(),
      readLater: z.boolean().optional(),
    });
    const parse = schema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ ok: false, error: parse.error.flatten() });
    }
    const updated = await linkRepo.update(req.params.id, parse.data);
    res.json({ ok: true, data: updated });
  } catch (err: any) {
    // if not found, Prisma throws
    if (err.code === 'P2025') return res.status(404).json({ ok: false, error: 'Not found' });
    next(err);
  }
});

// DELETE
linksRouter.delete('/:id', async (req, res, next) => {
  try {
    await linkRepo.remove(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    if (err.code === 'P2025') return res.status(404).json({ ok: false, error: 'Not found' });
    next(err);
  }
});
