export type AuthResponse = {
  success: boolean;
  data: {
    accessToken: string;
  };
};

export type MeResponse = {
  success: boolean;
  data: {
    userId: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
  };
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};
