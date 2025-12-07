interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}

export const Button = ({ children, className, variant, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`button ${
        variant === "outline" ? "button--outline" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};
