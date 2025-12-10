import type { FieldErrors } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  errors: FieldErrors;
}

export const FormInput = ({ label, className, errors, ...props }: Props) => {
  return (
    <label className={`formInput ${className}`}>
      <span>{label}</span>
      <input className="authForm__input" {...props} />
      <p className="error-message formInput__message">{errors.root?.message}</p>
    </label>
  );
};
