import { SignInRequest, SignUpRequest } from '../domain/models/auth';
import { AuthRepository } from '../domain/repositories/authRepository';

export class AuthUseCase implements AuthRepository {
  constructor(private authRepository: AuthRepository) {}
  async signIn(params: SignInRequest) {
    return this.authRepository.signIn(params);
  }

  async signUp(params: SignUpRequest) {
    return this.authRepository.signUp(params);
  }
}
