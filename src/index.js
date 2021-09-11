import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ShoppingCartContextProvider from './store/shopping-cart-context-provider';

ReactDOM.render(
	<ShoppingCartContextProvider>
		<App />
	</ShoppingCartContextProvider>,
	document.getElementById('root')
);
