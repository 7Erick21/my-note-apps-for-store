import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const schemaAuth = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const schemaSignIn = schemaAuth.omit({ name: true });

export const zSignInValidator = zValidator(
  'json',
  schemaSignIn,
  (result, c) => {
    if (!result.data.email) {
      return c.json({ message: 'Email is required' }, 400);
    }
    if (!result.data.password) {
      return c.json({ message: 'Password is required' }, 400);
    }
    if (!result.success) {
      return c.json({ message: 'Valide bien los campos' }, 400);
    }
  }
);

const schemaSignUp = schemaAuth;

export const zSignUpValidator = zValidator(
  'json',
  schemaSignUp,
  (result, c) => {
    if (!result.data.name) {
      return c.json({ message: 'Name is required' }, 400);
    }
    if (!result.data.email) {
      return c.json({ message: 'Email is required' }, 400);
    }
    if (!result.data.password) {
      return c.json({ message: 'Password is required' }, 400);
    }
    if (!result.success) {
      return c.json({ message: 'Valide bien los campos' }, 400);
    }
  }
);
