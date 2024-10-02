import {
  CreateStoresRequest,
  CreateStoresResponse,
  ListStoresRequest,
  ListStoresResponse,
} from '../domain/models/stores';
import { StoresRepository } from '../domain/repositories/storesRepository';

export class StoresUseCase implements StoresRepository {
  constructor(private storeRepository: StoresRepository) {}

  async listStores(params: ListStoresRequest): Promise<ListStoresResponse> {
    return this.storeRepository.listStores(params);
  }

  async createStores(
    params: CreateStoresRequest
  ): Promise<CreateStoresResponse> {
    return this.createStores(params);
  }
}
