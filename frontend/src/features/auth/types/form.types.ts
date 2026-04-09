export type FormValues = {
  email: string;
  password: string;
  username?: string;
};

// ? Form Field Props
export type FormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};
