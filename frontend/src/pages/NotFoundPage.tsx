import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="notFound">
      <h2 className="notFound__title">404</h2>
      <p className="notFound__subtitle">Page not found!</p>
      <Link className="button" to={"/"}>
        Back to home
      </Link>
    </div>
  );
};
