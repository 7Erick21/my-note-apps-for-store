import { Hono } from 'hono';
import { users } from './auth/infraestructure/routes';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/', users);

export default app;
