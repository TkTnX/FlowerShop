interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}


export const FormInput = ({ label, className, ...props }: Props) => {
  return (
      <label className={`formInput ${className}`}>
          <span>{label}</span>
          <input className="authForm__input" {...props} />
    </label>
  )
}
