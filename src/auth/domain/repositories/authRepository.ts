import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../models/auth';

export interface AuthRepository {
  signIn(params: SignInRequest): Promise<SignInResponse>;
  // signUp(params: SignUpRequest): Promise<SignUpResponse>;
}
