import { LoginInput, RegisterInput } from '@repo/shared';

// ? Auth Props
export type LoginProps = {
  type: 'login';
  onSubmit: (data: LoginInput) => Promise<void>;
  isLoading?: boolean;
};

export type RegisterProps = {
  type: 'register';
  onSubmit: (data: RegisterInput) => Promise<void>;
  isLoading?: boolean;
};

export type Props = LoginProps | RegisterProps;
