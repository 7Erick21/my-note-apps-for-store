import { Context } from 'hono';
import { AuthRepository } from '../../domain/repositories/authRepository';
import { Auth, SignInRequest, SignInResponse } from '../../domain/models/auth';
import { sign } from 'hono/jwt';
import { getSupabase } from '../../../shared/infraestructure/supabase';

export class SupabaseSignInRepository implements AuthRepository {
  constructor(private c: Context) {}

  async signIn(params: SignInRequest) {
    const jwt = await sign(params, this.c.env.JWT_SECRET);

    const supabase = getSupabase(this.c);

    const { data: users } = await supabase
      .from('users')
      .select('*')
      .eq('email', params.email);

    if (!users) throw new Error('Usuario no existe');

    const { email, name } = users[0] as Auth;

    const data: SignInResponse = { email, name, token: jwt };

    return data;
  }
}
