import { Hono } from 'hono';
import { Bindings } from '../../../shared/domain/models/bindings';
import {
  supabaseMiddleware,
  verifyToken,
} from '../../../shared/infraestructure/supabase';
import { StoresUseCase } from '../../application/storesUseCase';
import { ListStoresHandlers } from '../handlers/listStoresHandlers';
import { SupabaseStoresRepository } from '../supabase/supabaseStoresRepository';
import { CreateStoresHandlers } from '../handlers/createStoresHandlers';

export const stores = new Hono<{ Bindings: Bindings }>().basePath('/');

stores.use('*', supabaseMiddleware);

stores.get('/stores', async (c) => {
  const Repository = new SupabaseStoresRepository(c);
  const UseCase = new StoresUseCase(Repository);
  const Handler = new ListStoresHandlers(UseCase);

  return Handler.handler(c);
});

stores.post('/create-stores', async (c) => {
  console.log(c.req, 'handlerRequest');

  return c.json({ message: 'funco' });
  // const Repository = new SupabaseStoresRepository(c);
  // const UseCase = new StoresUseCase(Repository);
  // const Handler = new CreateStoresHandlers(UseCase);

  // return Handler.handler(c);
});
