import { Router } from "express";
import { LinkStore } from "../store/linkStore";
import { CreateLinkSchema } from "../models/link";

export const linksRouter = Router();

// Get all
linksRouter.get('/', (_req,res) => {
  res.json({ ok: true, data: LinkStore.all()});
})

// get by id 
linksRouter.get('/:id', (req,res) => {
  const link = LinkStore.get(req.params.id);
  if(!link) return res.status(404).json({ ok:false, error: "Link not found"});
  res.json({ ok: true, data: link });
});

//post create
linksRouter.post('/', (req, res) => {
  const parse = CreateLinkSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ ok: false, error: parse.error.flatten() });
  }
  const newLink = LinkStore.add(parse.data);
  res.status(201).json({ ok: true, data: newLink });
});

// PATCH update
linksRouter.patch('/:id', (req,res) => {
  const schema = CreateLinkSchema.partial();
  const parse = schema.safeParse(req.body);
  if(!parse.success) {
    return res.status(400).json({ ok: false, error: parse.error.flatten()});
  }
  const updated = LinkStore.update(req.params.id, parse.data);
  if(!updated) return res.status(404).json({ ok: false, error: "Not Found"});
  res.json({ ok: true, data: updated});
});

// DELETE
linksRouter.delete('/:id', (req,res) => {
  const removed = LinkStore.remove(req.params.id);
  if(!removed) return res.status(404).json({ ok: false, error: 'Not Found'});
  res.status(204).send();
});