import { Context } from 'hono';
import { AuthRepository } from '../../domain/repositories/authRepository';
import {
  Auth,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../../domain/models/auth';
import { sign } from 'hono/jwt';
import { getSupabase } from '../../../shared/infraestructure/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export class SupabaseAuthRepository implements AuthRepository {
  private supabase: SupabaseClient<any, 'public', any>;

  constructor(private c: Context) {
    this.supabase = getSupabase(c);
  }

  async signIn(params: SignInRequest) {
    const jwt = await sign(params, this.c.env.JWT_TOKEN_PRIVATE);

    const { data: users } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', params.email);

    if (!users) throw new Error('Usuario no existe');

    const { email, name } = users[0] as Auth;

    const data: SignInResponse = { email, name, token: jwt };

    return data;
  }

  async signUp({
    email,
    name,
    password,
  }: SignUpRequest): Promise<SignUpResponse> {
    const jwt = await sign({ email, password }, this.c.env.JWT_TOKEN_PRIVATE);

    const { data } = await this.supabase
      .from('users')
      .insert({ email, name, password })
      .select('*');

    if (!data) throw new Error('Error al crear usuario');

    return { email, name, token: jwt };
  }
}
