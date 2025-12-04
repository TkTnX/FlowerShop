import { Link } from "react-router-dom";
import { HERO_FLOWERS } from "../data";

export const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero__wrapper">
        <div className="hero__left">
          <h1 className="hero__title">
            Flowers, 🌻 what the world needs{" "}
          </h1>
          <p className="hero__desc">Browse between hounders of flowers</p>
          <Link className="hero__link" to="/catalog">
            Browse
          </Link>
        </div>
        <div className="hero__right">
          {HERO_FLOWERS.map((flower) => (
            <div className="hero__image-block" key={flower.image}>
              <img src={flower.image} alt={flower.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
