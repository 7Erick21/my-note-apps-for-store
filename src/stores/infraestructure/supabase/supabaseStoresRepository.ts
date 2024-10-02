import { SupabaseClient } from '@supabase/supabase-js';
import { StoresRepository } from '../../domain/repositories/storesRepository';
import { Context } from 'hono';
import { getSupabase } from '../../../shared/infraestructure/supabase';
import {
  CreateStoresRequest,
  CreateStoresResponse,
  ListStoresRequest,
  ListStoresResponse,
} from '../../domain/models/stores';

export class SupabaseStoresRepository implements StoresRepository {
  private supabase: SupabaseClient<any, 'public', any>;

  constructor(private c: Context) {
    this.supabase = getSupabase(c);
  }

  async listStores(params: ListStoresRequest) {
    const { data: stores } = await this.supabase
      .from('stores')
      .select('*')
      .eq('userId', params.userId);

    if (!stores)
      throw new Error('Este usuario no tiene store o el userId es incorrecto');

    const data: ListStoresResponse = stores;

    return data;
  }

  async createStores(
    params: CreateStoresRequest
  ): Promise<CreateStoresResponse> {
    const { data } = await this.supabase
      .from('stores')
      .insert({ ...params })
      .select('*');

    if (!data)
      throw new Error('Este usuario no tiene store o el userId es incorrecto');

    const listStores: CreateStoresResponse = data;

    return listStores;
  }
}
