import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import burgerConstructorStyles from "./BurgerConstructorItems.module.css";
import ingredientType from "../../utils/types";
import { DELETE_ITEM, MOVE_ITEM } from '../../services/actions/burger-constructor';
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructorItems = ({ index, items }) => {
  const dispatch = useDispatch();
	const { image, id, price, name } = items;
	const ref = useRef(null);

	const onDelete = (id) => {
		dispatch({
			type: DELETE_ITEM,
			id: id,
		});
	};

	const [, drop] = useDrop({
		accept: "item",
		hover(items) {
			if (!ref.current) {
				return;
			}
			const dragIndex = items.index;
			const hoverIndex = index;
			dispatch({
				type: MOVE_ITEM,
				data: { dragIndex, hoverIndex },
			});
			items.index = hoverIndex;
		},
	});

	const [{ opacity }, drag] = useDrag({
		type: "item",
		item: { id, index },
		collect: (monitor) => {
			return {
				opacity: monitor.isDragging() ? 0.5 : 1,
			};
		},
	});

	drag(drop(ref));
  return (
    <li className={`${burgerConstructorStyles.item} pt-4 pr-3`}  style={{ opacity }} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={(() => onDelete(id))}
      />
    </li>
  );
}


BurgerConstructorItems.protoType = {
	items: ingredientType.isRequired
}


export default BurgerConstructorItems;
