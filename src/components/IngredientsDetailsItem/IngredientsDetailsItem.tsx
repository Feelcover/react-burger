import { FC } from 'react';
import ingredientsDetailsItemStyles from "./IngredientsDetailsItem.module.css";
import { TDetailsItemData } from '../../services/types';

const IngredientsDetailsItem: FC<TDetailsItemData> = (data) => {
  return (
    <li className={`${ingredientsDetailsItemStyles.item}`}>
      <p
        className={`${ingredientsDetailsItemStyles.text} text text_type_main-default text_color_inactive pb-2`}
      >
        {data.text}
      </p>
      <p
        className={`${ingredientsDetailsItemStyles.text} text text_type_main-default text_color_inactive`}
      >
        {data.value}
      </p>
    </li>
  );
};

export default IngredientsDetailsItem;
