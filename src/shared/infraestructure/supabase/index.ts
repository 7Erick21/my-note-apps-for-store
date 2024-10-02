import { Context, MiddlewareHandler } from 'hono';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { decode, verify } from 'hono/jwt';

export const idTokenContext = 'my-note-apps-for-stores-supabase';

export const verifyToken: MiddlewareHandler = async (c, next) => {
  const { authorization } = c.req.header();

  console.log(c.req, 'request acaa');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return c.json({ error: 'No autorizado' }, 401);
  }

  const token = authorization.split(' ')[1];
  try {
    const verifyToken = await verify(token, c.env.JWT_TOKEN_PRIVATE);

    const { data } = await getSupabase(c)
      .from('users')
      .select('*')
      .eq('email', verifyToken.email)
      .limit(1)
      .single();

    console.log(data, 'userToken');

    if (!data) return c.json({ message: 'Token invalido o expirado' }, 401);

    await next();
  } catch (error) {
    return c.json({ error: 'Token inválido' }, 401);
  }
};

/**
 * injectar en el contexto la conexion de supabase
 * @param c
 */
export const supabaseMiddleware: MiddlewareHandler = async (c, next) => {
  console.log(c.req, 'supabase');

  try {
    if (!c.env.SUPABASE_URL) {
      throw new Error(`SUPABASE_URL debe ser declarado como variable de env`);
    }

    if (!c.env.SUPABASE_KEY) {
      throw new Error(`SUPABASE_KEY debe ser declarado como variable de env`);
    }

    if (getSupabase(c)) return next();

    const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_KEY);

    c.set(idTokenContext, supabase);

    await next();
  } catch (error: any) {
    return c.text(error.message, 400);
  }
};

/**
 * Se utiliza para obtener el cliente de supabase desde el CTX
 * @param c
 * @returns
 */
export const getSupabase = (c: Context): SupabaseClient =>
  c.get(idTokenContext);

// [vars];

// const vars = {
//   JWT_TOKEN_PRIVATE = 'my-note-apps-for-stores-jwt',
//   SUPABASE_URL = 'https://bmfiodspcruruathhqyd.supabase.co',
//   SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZmlvZHNwY3J1cnVhdGhocXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0ODAzMjEsImV4cCI6MjA0MzA1NjMyMX0.CHQ26rG9OWObyN0fsfOXU3I-mkaKsoYQ-T5Nm8iA8gQ',
// }
