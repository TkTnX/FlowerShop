interface Props {
    width:string
    height:string
}

export const Skeleton = ({ width, height }: Props) => {
  return <div className={`skeleton`} style={{width, height}} />;
}
