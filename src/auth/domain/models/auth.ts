export interface Auth {
  name: string;
  email: string;
  password: string;
}

export interface SignInRequest extends Omit<Auth, 'name'> {}

export interface SignInResponse extends Omit<Auth, 'password'> {
  token: string;
}

export interface SignUpRequest extends Auth {}

export interface SignUpResponse extends Omit<Auth, 'password'> {
  token: string;
}
