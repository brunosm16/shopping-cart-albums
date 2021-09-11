/* eslint-disable no-unused-vars */
import React from 'react';

const context = {
	albums: [],
	cart: {},
	requestMessage: {},
	onSetRequestMessage: (message) => {},
	onResetRequestMessage: () => {},
	onAddCartItem: (item) => {},
	onRemoveCartItemById: (id) => {},
	onResetCartItem: () => {},
};

const ShoppingCartContext = React.createContext(context);

export default ShoppingCartContext;
