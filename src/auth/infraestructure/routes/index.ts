import { Hono } from 'hono';
import { Bindings } from '../../../shared/domain/models/bindings';
import {
  getSupabase,
  supabaseMiddleware,
} from '../../../shared/infraestructure/supabase';
import { zUserValidator } from '../zod';
import { Auth, SignInRequest } from '../../domain/models/auth';
import { SupabaseClient } from '@supabase/supabase-js';
import { SignInHandler } from '../handlers/SignInHandler';
import { SignInUseCase } from '../../application/SignInUseCase';
import { SupabaseSignInRepository } from '../supabase/SupabaseSignInRepository';

export const users = new Hono<{ Bindings: Bindings }>().basePath('/');

users.use('*', supabaseMiddleware);

const getUsers = async (supabase: SupabaseClient): Promise<Auth[]> => {
  const { data } = await supabase.from('users').select('*');
  return data as Auth[];
};

users.get('/', async (c) => {
  const supabase = getSupabase(c);
  const data = await getUsers(supabase);
  return c.json({
    data,
  });
});

users.post('/signIn', zUserValidator, async (c) => {
  const Repository = new SupabaseSignInRepository(c);
  const UseCase = new SignInUseCase(Repository);
  const Handler = new SignInHandler(UseCase);

  return Handler.handler(c);
});
