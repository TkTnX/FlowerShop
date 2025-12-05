interface Props {
    children: React.ReactNode
    className?:string
}

export const Block = ({ children, className }: Props) => {
  return (
    <div className={`block ${className}`}>{children}</div>
  )
}
