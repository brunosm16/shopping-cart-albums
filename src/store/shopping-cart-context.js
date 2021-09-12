/* eslint-disable no-unused-vars */
import React from 'react';

const context = {
	albums: [],
	cart: {},
	requestMessage: {},
	onSetErrorMessage: (message) => {},
	onSetSuccessfulMessage: (message) => {},
	onSetLoadingMessage: (message) => {},
	onResetRequestMessage: () => {},
	onAddCartItem: (item) => {},
	onRemoveCartItemById: (id) => {},
	onResetCartItem: () => {},
};

const ShoppingCartContext = React.createContext(context);

export default ShoppingCartContext;
