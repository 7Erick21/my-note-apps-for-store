import { Context } from 'hono';
import { AuthUseCase } from '../../application/authUseCase';
import { SignInRequest, SignInResponse } from '../../domain/models/auth';

export class SignInHandler {
  constructor(private signInUseCase: AuthUseCase) {}

  public handler = async (c: Context) => {
    const request = await c.req;

    const body: SignInRequest = await request.bodyCache.json;

    const response = await this.signInUseCase.signIn(body);

    const data: SignInResponse = { ...response };

    return c.json({
      data,
    });
  };
}
