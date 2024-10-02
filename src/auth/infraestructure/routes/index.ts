import { Hono } from 'hono';
import { Bindings } from '../../../shared/domain/models/bindings';
import {
  getSupabase,
  supabaseMiddleware,
} from '../../../shared/infraestructure/supabase';
import { zSignInValidator, zSignUpValidator } from '../zod';
import { Auth, SignInRequest } from '../../domain/models/auth';
import { SupabaseClient } from '@supabase/supabase-js';
import { SignInHandler } from '../handlers/signInHandler';
import { AuthUseCase } from '../../application/authUseCase';
import { SupabaseAuthRepository } from '../supabase/supabaseAuthRepository';
import { SignUpHandler } from '../handlers/signUpHandler';

export const users = new Hono<{ Bindings: Bindings }>().basePath('/');

users.use('*', supabaseMiddleware);

const getUsers = async (supabase: SupabaseClient): Promise<Auth[]> => {
  const { data } = await supabase.from('users').select('*');
  return data as Auth[];
};

users.get('/users', async (c) => {
  const supabase = getSupabase(c);
  const data = await getUsers(supabase);
  return c.json({
    data,
  });
});

users.post('/signIn', zSignInValidator, async (c) => {
  console.log(c.req, 'signInRequest');

  const Repository = new SupabaseAuthRepository(c);
  const UseCase = new AuthUseCase(Repository);
  const Handler = new SignInHandler(UseCase);

  return Handler.handler(c);
});

users.post('/signUp', zSignUpValidator, async (c) => {
  const Repository = new SupabaseAuthRepository(c);
  const UseCase = new AuthUseCase(Repository);
  const Handler = new SignUpHandler(UseCase);

  return Handler.handler(c);
});
