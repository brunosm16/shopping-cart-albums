/* eslint-disable no-unused-vars */
import React from 'react';

const context = {
	albums: [],
	items: [],
	totalPrice: 0,
	requestMessage: {},
	onAddCartItem: (item) => {},
	onRemoveCartItemById: (id) => {},
	onResetCartItem: () => {},
	onLoadAlbums: (albumsArr) => {},
	onSetRequestMessage: (isError, isLoading, isSuccessful, message) => {},
	onResetRequestMessage: () => {},
};

const ShoppingCartContext = React.createContext(context);

export default ShoppingCartContext;
