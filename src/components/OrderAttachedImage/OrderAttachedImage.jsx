import OrderAttachedImageStyles from "./OrderAttachedImage.module.css";
import propTypes from "prop-types";

export const OrderAttachedImage = ({ image, alt }) => {
  return (
    <div className={OrderAttachedImageStyles.border}>
      <div className={OrderAttachedImageStyles.item}>
        <img className={OrderAttachedImageStyles.image} src={image} alt={alt} />
      </div>
    </div>
  );
};

OrderAttachedImage.propTypes = {
  image: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
};
