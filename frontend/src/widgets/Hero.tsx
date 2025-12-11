import { Link } from "react-router-dom";
import { HERO_FLOWERS } from "../shared/data";
import { Button } from "../shared/components";

export const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero__wrapper">
        <div className="hero__left">
          <h1 className="hero__title">Flowers, 🌻 what the world needs </h1>
          <p className="hero__desc">Browse between hounders of flowers</p>
          <Button className="hero__link">
            <Link to="/shop">Browse</Link>
          </Button>
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
