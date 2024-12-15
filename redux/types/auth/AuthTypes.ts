export type AuthPayload = {
  email?: string;
  token: string;
  name: any;
  type: any;
  image?: any;
};

export interface AuthState {
  email: string | null | undefined;
  token: string | null;
  name: any;
  type?: any;
  user?: any;
  image?: any;
}
