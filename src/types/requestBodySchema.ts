import { z } from 'zod';

export const createUserBodySchema = z.object({
  user_id: z.string(),
  official_name: z.string(),
  display_name: z.string(),
  email: z.string().email().min(5),
  email_verified: z.optional(z.boolean()),
  avatar_url: z.optional(z.string())
});
