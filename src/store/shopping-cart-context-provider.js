import PropTypes from 'prop-types';
import { useReducer, useState } from 'react';
import CartReducer, { defaultCartReducer } from '../reducers/cart-reducer';
import ShoppingCartContext from './shopping-cart-context';

const ShoppingCartContextProvider = ({ children }) => {
	const [albums, setAlbums] = useState([]);
	const [cartState, dispatchCart] = useReducer(CartReducer, defaultCartReducer);
	const [requestMessage, setRequestMessage] = useState();

	const handleAddCartItem = (item) => {
		dispatchCart({ type: 'ADD_ITEM', item });
	};

	const handleRemoveCartItemById = (id) => {
		console.log(cartState.items);
		dispatchCart({ type: 'REMOVE_ITEM', id });
	};

	const handleResetCartItem = () => {
		dispatchCart({ type: 'RESET_CART' });
	};

	const handleLoadAlbums = (albumsArr) => {
		setAlbums((previousData) => [...previousData, ...albumsArr]);
	};

	const handleSetRequestMessage = (message) => {
		setRequestMessage(message);
	};

	const handleResetRequestMessage = () => {
		setRequestMessage(null);
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				albums,
				items: cartState.items,
				totalPrice: cartState.totalPrice,
				requestMessage,
				onAddCartItem: handleAddCartItem,
				onRemoveCartItemById: handleRemoveCartItemById,
				onResetCartItem: handleResetCartItem,
				onLoadAlbums: handleLoadAlbums,
				onSetRequestMessage: handleSetRequestMessage,
				onResetRequestMessage: handleResetRequestMessage,
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
