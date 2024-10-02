import { Context } from 'hono';
import { StoresUseCase } from '../../application/storesUseCase';
import { ListStoresRequest } from '../../domain/models/stores';

export class ListStoresHandlers {
  constructor(private storesUseCase: StoresUseCase) {}

  public handler = async (c: Context) => {
    const request = await c.req;

    const body = await request.query();

    const response = await this.storesUseCase.listStores({
      userId: body.userId,
    });

    const data = { ...response };

    return c.json({
      data,
    });
  };
}
