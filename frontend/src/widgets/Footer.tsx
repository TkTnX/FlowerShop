import { Link } from "react-router-dom";
import { NAV_ITEMS } from "../shared";



export const Footer = () => {
  return (
    <footer className="footer">
      <div className=" footer__wrapper container">
        <div className="footer__left">
          <Link to="/" className="header__logo">
            <span>Flower</span> Shop
          </Link>
          <p>
            Some random stuff about flower shop and some more info cuz this box
            had to get fill Some random stuff about flower shop and some more
            info cuz this box had to get fill Some random stuff about flower
            shop and some more info cuz this box had to get fill
          </p>
        </div>
        <div className="footer__nav">
          <h6 className="footer__subtitle">Links</h6>
          <ul className="footer__nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link className="footer__nav-item" to={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__contacts">
          <h6 className="footer__subtitle">Contact</h6>
          <ul className="footer__contacts-list">
            <li className="footer__contacts-item">
              <img src="/images/location.svg" alt="Location" />
              <p>26985 Brighton Lane, Lake Forest, CA</p>
            </li>
            <li className="footer__contacts-item">
              <img src="/images/email.svg" alt="Email" />
              <p>support@Flowers.com</p>
            </li>
            <li className="footer__contacts-item">
              <img src="/images/phone.svg" alt="phone" />
              <p>+1 236 5489</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
