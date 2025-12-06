import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../shared";

interface Props {
    isMobile: boolean
}

export const Navbar = ({isMobile = false}: Props) => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <nav className={`header__nav ${isMobile && 'header__nav--mobile'}`}>
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
  );
};
