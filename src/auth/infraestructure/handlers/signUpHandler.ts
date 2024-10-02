import { Context } from 'hono';
import { AuthUseCase } from '../../application/authUseCase';
import { SignUpRequest, SignUpResponse } from '../../domain/models/auth';

export class SignUpHandler {
  constructor(private signUpUseCase: AuthUseCase) {}

  public handler = async (c: Context) => {
    const request = await c.req;

    const body: SignUpRequest = await request.bodyCache.json;

    const response = await this.signUpUseCase.signUp(body);

    const data: SignUpResponse = { ...response };

    return c.json({
      data,
    });
  };
}
