import { z } from "zod";

export const LinkSchema = z.object({
    id: z.string().uuid(),
    url: z.string().url(),
    title: z.string().min(1),
    tags: z.array(z.string()).optional(),
    readLater: z.boolean().default(false),
    createdAt: z.date(),
});

export type Link = z.infer<typeof LinkSchema>;

export const CreateLinkSchema = LinkSchema.omit({
    id: true,
    createdAt: true
});
