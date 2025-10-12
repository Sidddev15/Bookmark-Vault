import { prisma } from "../lib/prisma";

export const linkRepo = {
  findAll : () => prisma.link.findMany({orderBy: {createdAt: 'desc'}}),
  findById : (id: string) => prisma.link.findUnique({ where: {id}}),
  create: (data: { url: string; title: string; tags?: string[]; readLater?: boolean }) =>
  prisma.link.create({
    data: { ...data, tags: data.tags ?? [] },
  }),
  update: (id: string, data: Partial<{url: string, title: string, tags: string[], readLater?: boolean}>) => prisma.link.update({ where: {id}, data}),
  remove: (id: string) => prisma.link.delete({ where: {id}})
}