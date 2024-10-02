import { Hono } from 'hono';
import { users } from './auth/infraestructure/routes';
import { stores } from './stores/infraestructure/routes';
import { supabaseMiddleware } from './shared/infraestructure/supabase';

const app = new Hono();

app.get('/', supabaseMiddleware, (c) => {
  return c.text('Hello Hono!');
});

app.route('/', users);
app.route('/', stores);

app.post('/aaa', async (c) => {
  console.log(c.req, 'handlerRequest');

  return c.json({ message: 'funco' });
  // const Repository = new SupabaseStoresRepository(c);
  // const UseCase = new StoresUseCase(Repository);
  // const Handler = new CreateStoresHandlers(UseCase);

  // return Handler.handler(c);
});

export default app;
