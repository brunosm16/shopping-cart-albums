import PropTypes from 'prop-types';
import { useEffect, useReducer, useState } from 'react';
import UseHttp from '../hooks/use-input';
import CartReducer, { defaultCartReducer } from '../reducers/cart-reducer';
import { ENDPOINT, headerJSON } from '../utils/http-utils';
import ShoppingCartContext from './shopping-cart-context';

const ShoppingCartContextProvider = ({ children }) => {
	const [albums, setAlbums] = useState([]);
	const [cartState, dispatchCart] = useReducer(CartReducer, defaultCartReducer);
	const [requestMessage, setRequestMessage] = useState();

	const transformAlbums = (albumsFetched) => {
		const albumsArr = [];

		Object.keys(albumsFetched).forEach((key) => {
			albumsArr.push({
				id: key,
				artist: albumsFetched[key].artis,
				name: albumsFetched[key].name,
				price: albumsFetched[key].price,
				releaseDate: albumsFetched[key].releaseDate,
				stockLimit: albumsFetched[key].stockLimit,
			});
		});

		setAlbums(albumsArr);
	};

	const { sendRequest: fetchAlbums } = UseHttp();

	useEffect(() => {
		fetchAlbums(
			{
				url: `${ENDPOINT}/albums.json`,
				method: 'GET',
				headers: headerJSON,
			},
			transformAlbums
		);
	}, [fetchAlbums]);

	const handleAddCartItem = (item) => {
		dispatchCart({ type: 'ADD_ITEM', item });
	};

	const handleRemoveCartItemById = (id) => {
		dispatchCart({ type: 'REMOVE_ITEM', id });
	};

	const handleResetCartItem = () => {
		dispatchCart({ type: 'RESET_CART' });
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
				cart: cartState,
				requestMessage,
				onSetRequestMessage: handleSetRequestMessage,
				onResetRequestMessage: handleResetRequestMessage,
				onAddCartItem: handleAddCartItem,
				onRemoveCartItemById: handleRemoveCartItemById,
				onResetCartItem: handleResetCartItem,
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
