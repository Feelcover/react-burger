import { FC } from 'react';
import OrderAttachedImageStyles from "./OrderAttachedImage.module.css";
import { TOrderAttachedImage } from '../../services/types';

const OrderAttachedImage: FC<TOrderAttachedImage> = ({ image, alt }) => {
  
  return (
    <div className={OrderAttachedImageStyles.border}>
      <div className={OrderAttachedImageStyles.item}>
        <img className={OrderAttachedImageStyles.image} src={image} alt={alt} />
      </div>
    </div>
  );
};

export default OrderAttachedImage
