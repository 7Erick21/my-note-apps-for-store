import {
  CreateStoresRequest,
  CreateStoresResponse,
  ListStoresRequest,
  ListStoresResponse,
} from '../models/stores';

export interface StoresRepository {
  listStores(params: ListStoresRequest): Promise<ListStoresResponse>;
  createStores(params: CreateStoresRequest): Promise<CreateStoresResponse>;
}
