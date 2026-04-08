type FormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export const FormField = ({ label, error, children }: FormFieldProps) => {
  return (
    <div className="form-field flex flex-col gap-1">
      <label className="text-sm text-gray-400">{label}</label>
      {children}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};
