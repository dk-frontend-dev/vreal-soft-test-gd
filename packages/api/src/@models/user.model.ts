export interface GoogleUser {
  picture: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

export type JwtUserPayload = {
  id: string;
  email: string;
};

export interface AccessToken {
  accessToken: string;
}

export type UserResponse = AccessToken & JwtUserPayload;
