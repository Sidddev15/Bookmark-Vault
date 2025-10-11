import { Link } from "../models/link"


const links: Link[] = [];
export const LinkStore = {
  all: () => links,
  get: (id: string) => links.find((l) => l.id === id),
  add: (data: Omit<Link, 'id' | 'createdAt'>): Link => {
    const newLink: Link = {
      ...data, 
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    links.push(newLink);
    return newLink;
  },

  update: (id: string, data: Partial<Omit<Link, 'id' | 'createdAt'>>):Link | null => {
    const idx = links.findIndex((l) => l.id === id);
    if (idx === -1) return null;
    links[idx] = {...links[idx], ...data};
    return links[idx];
  },

  remove: (id: string) => {
    const idx = links.findIndex((l) => l.id === id);
    if(idx === -1) return false;
    links.splice(idx, 1);
    return true;
  },
}