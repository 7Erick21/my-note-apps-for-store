export interface Stores {
  name: string;
  slug: string;
  userId: string;
}

export interface ListStoresRequest {
  userId: string;
}

export type ListStoresResponse = Stores[];

export type CreateStoresRequest = Stores;

export type CreateStoresResponse = Stores[];
