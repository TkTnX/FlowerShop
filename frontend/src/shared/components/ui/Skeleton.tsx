interface Props {
    width:string
  height: string
  className?:string
}

export const Skeleton = ({ width, height, className }: Props) => {
  return <div className={`skeleton ${className}`} style={{ width, height }} />;
}
