import { Context } from 'hono';
import { StoresUseCase } from '../../application/storesUseCase';
import { CreateStoresRequest } from '../../domain/models/stores';
import { decode } from 'hono/jwt';

export class CreateStoresHandlers {
  constructor(private storesUseCase: StoresUseCase) {}

  public handler = async (c: Context) => {
    const request = await c.req;

    // const { userId } = await request.query();

    const body: CreateStoresRequest = await request.bodyCache.json;

    console.log(body, 'body');
    console.log(request, 'aaaaaaaaaaaaaaaaa');

    const response = await this.storesUseCase.createStores({
      userId: body.userId,
      name: body.name,
      slug: body.slug,
    });

    console.log(response, 'responseeeeee');

    const data = { ...response };

    return c.json({
      data,
    });
  };
}
