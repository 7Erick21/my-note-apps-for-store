import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const schemaUser = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const zUserValidator = zValidator('json', schemaUser, (result, c) => {
  if (!result.data.name) {
    return c.json({ message: 'Name is required' }, 400);
  }
  if (!result.data.email) {
    return c.json({ message: 'Email is required' }, 400);
  }
  if (!result.success) {
    return c.json({ message: 'Valide bien los campos' }, 400);
  }
});
