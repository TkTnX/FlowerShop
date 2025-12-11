import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { useUser } from "../shared";
import { LogIn } from "lucide-react";

export const Header = () => {
  const { user, isPending } = useUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "visible";
    }
  }, [open]);

  return (
    <>
      <header className=" header">
        <div className="container header__wrapper">
          <button
            onClick={() => setOpen(!open)}
            className={`header__mobile-btn ${
              open && "header__mobile-btn--open"
            }`}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Link to="/" className="header__logo">
            <span>Flower</span> Shop
          </Link>

          <div className="header__controls">
            {user && !isPending ? (
              <Link className="header__control" to={"/profile"}>
                <img src="/images/user.svg" />
              </Link>
            ) : (
              <Link className="header__control" to={"/auth/login"}>
                <LogIn />
                Login
              </Link>
            )}
            <Link className="header__control" to={"/cart"}>
              <img src="/images/cart.svg" />
            </Link>
          </div>
        </div>
      </header>
      {open && <MobileMenu />}
    </>
  );
};
