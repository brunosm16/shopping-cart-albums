import { findExistingIdIndex, removeItemById } from '../utils/utils';

/*
  Cart actions
*/
const ADD = 'ADD_ITEM';
const REMOVE = 'REMOVE_ITEM';
const RESET = 'RESET_CART';

/*
	Items will have objects with 
	id, name, price, amount. 
*/
export const defaultCartReducer = {
	items: [],
	totalPrice: 0,
};

const CartReducer = (state, action) => {
	/**
	 * Increase item amount if item already exists,
	 * otherwise insert new item in items.
	 */
	if (action.type === ADD) {
		const currItems = state.items;
		const inputItem = action.item;

		let updatedItems = [];

		const totalPrice = state.totalPrice + inputItem.price;

		const existingIndex = findExistingIdIndex(inputItem.id, currItems);

		/* Item already exists, increase amount */
		if (existingIndex !== -1) {
			const existingItem = currItems[existingIndex];
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount + 1,
			};

			updatedItems = [...currItems];
			updatedItems[existingIndex] = updatedItem;
		} else {
			updatedItems = currItems.concat(inputItem);
		}

		/* Result */
		return {
			items: updatedItems,
			totalPrice,
		};
	}

	if (action.type === REMOVE) {
		const currItems = state.items;
		const id = action.value;
		const itemToDelete = currItems[findExistingIdIndex(id)];
		const totalPrice = state.totalPrice - itemToDelete.price;

		let updatedItems = [];

		/* Item removed from cart */
		if (itemToDelete.amount === 1) {
			updatedItems = removeItemById(id, currItems);
		} else {
			updatedItems = currItems.map((item) => {
				const currItem = item;

				if (item.id === id) {
					currItem.amount -= 1;
				}

				return currItem;
			});
		}

		/* Result */
		return {
			items: updatedItems,
			totalPrice,
		};
	}

	if (action.type === RESET) {
		return defaultCartReducer;
	}

	return defaultCartReducer;
};

export default CartReducer;
