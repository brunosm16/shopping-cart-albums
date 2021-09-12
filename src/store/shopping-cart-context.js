/* eslint-disable no-unused-vars */
import React from 'react';

const context = {
	albums: [],
	items: [],
	totalPrice: 0,
	onAddCartItem: (item) => {},
	onRemoveCartItemById: (id) => {},
	onResetCartItem: () => {},
	onLoadAlbums: (albumsArr) => {},
	onConfirmOrder: (order) => {},
	isLoading: '',
	requestError: '',
};

const ShoppingCartContext = React.createContext(context);

export default ShoppingCartContext;
