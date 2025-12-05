interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}

export const Button = ({ children, className, variant }: Props) => {
  return (
    <button
      className={`button ${
        variant === "outline" ? "button--outline" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};
