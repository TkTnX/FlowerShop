import { Link, Outlet, useLocation } from "react-router-dom";
import { Block, PROFILE_ITEMS, useUser } from "../shared";

export const ProfileLayout = () => {
  const { user } = useUser();
  const location = useLocation();
  return (
    <Block className="container profile">
      <div className="profile__side">
        <div className="profile__user">
          <img
            className="profile__user-image"
            src={
              user?.avatar
                ? `${import.meta.env.VITE_PUBLIC_SERVER_MEDIA_URL}${
                    user.avatar
                  }`
                : "/images/no-avatar.png"
            }
            alt="Avatar"
          />
          <div className="profile__user-name">
            <p>
              {user && user.first_name && user.last_name
                ? `${user.first_name} ${user.last_name}`
                : user?.username}
            </p>
            <button>Log out</button>
          </div>
        </div>
        <div className="profile__navigation">
          <nav className="profile__navbar">
            <ul className="profile__navbar-list">
              {PROFILE_ITEMS.map((item) => (
                <li className="profile__navbar-item" key={item.href}>
                  <Link
                    className={`profile__navbar-link ${
                      location.pathname === item.href &&
                      "profile__navbar-link--active"
                    }`}
                    to={item.href}
                  >
                    <img
                      src={
                        location.pathname === item.href
                          ? item.iconFilled
                          : item.icon
                      }
                      alt={item.name}
                    />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <Outlet />
    </Block>
  );
};
