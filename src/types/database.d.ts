import { WithId } from 'mongodb';
import { z } from 'zod';

export const MarkdownContent = z.object({
  markdownContent: z.any()
});
export type MarkdownContent = z.infer<typeof MarkdownContent>;
export type MarkdownContentWithId = WithId<MarkdownContent>;
