interface Props {
  className?: string;
  children: React.ReactNode;
  title: string;
}

export const Section = ({ className, children, title }: Props) => {
  return (
    <section className="container section">
      <div className="section__top">
        <div className="section__line" />
        <h2 className="section__title">{title}</h2>
        <div className="section__line" />
      </div>

      <div className={`section__main ${className}`}>{children}</div>
    </section>
  );
};
