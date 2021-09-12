import PropTypes from 'prop-types';
import { useReducer, useState } from 'react';
import CartReducer, { defaultCartReducer } from '../reducers/cart-reducer';
import ShoppingCartContext from './shopping-cart-context';
import UseHttp from '../hooks/use-http';
import { ENDPOINT, headerJSON } from '../utils/http-utils';

const ShoppingCartContextProvider = ({ children }) => {
	const [albums, setAlbums] = useState([]);
	const [cartState, dispatchCart] = useReducer(CartReducer, defaultCartReducer);

	const { isLoading, requestError, sendRequest: sendOrder } = UseHttp();

	const handleAddCartItem = (item) => {
		dispatchCart({ type: 'ADD_ITEM', item });
	};

	const handleRemoveCartItemById = (id) => {
		dispatchCart({ type: 'REMOVE_ITEM', id });
	};

	const handleResetCartItem = () => {
		dispatchCart({ type: 'RESET_CART' });
	};

	const handleLoadAlbums = (albumsArr) => {
		setAlbums((previousData) => [...previousData, ...albumsArr]);
	};

	const handleConfirmOrder = (body) => {
		sendOrder({
			url: `${ENDPOINT}/orders.json`,
			body,
			method: 'POST',
			headers: headerJSON,
		});
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				albums,
				items: cartState.items,
				totalPrice: cartState.totalPrice,
				onAddCartItem: handleAddCartItem,
				onRemoveCartItemById: handleRemoveCartItemById,
				onResetCartItem: handleResetCartItem,
				onLoadAlbums: handleLoadAlbums,
				onConfirmOrder: handleConfirmOrder,
				isLoading,
				requestError,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};

ShoppingCartContextProvider.defaultProps = {
	children: {},
};

ShoppingCartContextProvider.propTypes = {
	children: PropTypes.node,
};

export default ShoppingCartContextProvider;
