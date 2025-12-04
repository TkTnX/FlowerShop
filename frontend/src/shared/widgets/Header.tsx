import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../data";

export const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <header className=" header">
      <div className="container header__wrapper">
        <button className="header__mobile-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/" className="header__logo">
          <span>Flower</span> Shop
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            {NAV_ITEMS.map((item) => (
              <li className="header__nav-item">
                <a
                  href={item.href}
                  className={`header__nav-link ${
                    pathname === item.href ? "header__nav-link--active" : ""
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__controls">
          <Link className="header__control" to={"/profile"}>
            <img src="/images/user.svg" />
          </Link>
          <Link className="header__control" to={"/cart"}>
            <img src="/images/cart.svg" />
          </Link>
        </div>
      </div>
    </header>
  );
};
