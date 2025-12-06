import { Block } from "../shared";

interface Props {
  images: string[];
}

export const MorePhotos = ({ images }: Props) => {
  return (
    <Block className="morePhotos">
      <p className="morePhotos__title">More photos</p>
      <div className="morePhotos__list">
        {images.map((image, index) => (
          <div className="morePhotos__image" key={index}>
            <img
              src={`${import.meta.env.VITE_PUBLIC_SERVER_URL}${image}`}
              alt="Photo"
            />
          </div>
        ))}
      </div>
    </Block>
  );
};
