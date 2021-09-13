import PropTypes from 'prop-types';
import { useReducer, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import CartReducer, { defaultCartReducer } from '../reducers/cart-reducer';
import ShoppingCartContext from './shopping-cart-context';
import UseHttp from '../hooks/use-http';
import { ENDPOINT, headerJSON } from '../utils/http-utils';

const ShoppingCartContextProvider = ({ children }) => {
	const [albums, setAlbums] = useState([]);
	const [cartState, dispatchCart] = useReducer(CartReducer, defaultCartReducer);
	const [showHeaderRequest, setShowHeaderRequest] = useState();

	const { isLoading, requestError, sendRequest: sendOrder } = UseHttp();

	/* Display header request only for 500ms */
	useEffect(() => {
		const timeOutId = setTimeout(() => {
			if (showHeaderRequest) {
				setShowHeaderRequest(false);
			}
		}, 1000);

		return () => {
			clearTimeout(timeOutId);
		};
	}, [isLoading, requestError]);

	/*  On a sucessfull request headerRequest show a successful message */
	const transformResponse = () => {
		setShowHeaderRequest(true);
	};

	const setErrorMessage = (hasError) => {
		setShowHeaderRequest(hasError);
	};

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
		/* Request message is being loaded */
		setShowHeaderRequest(true);
		sendOrder(
			{
				url: `${ENDPOINT}/orders.json`,
				body,
				method: 'POST',
				headers: headerJSON,
			},
			transformResponse,
			setErrorMessage
		);

		/* Clear cart after order is sent successfuly  */
		if (!requestError) {
			handleResetCartItem();
		}
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
				showHeaderRequest,
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
