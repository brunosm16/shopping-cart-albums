/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import Header from './components/Header/Header';
import Shopping from './components/Shopping/Shopping';
import ShoppingCartContext from './store/shopping-cart-context';
import HeaderRequestMessage from './components/Header/HeaderRequestMessage';
import {
	DEFAULT_ERROR_MESSAGE,
	DEFAULT_LOADING_MESSAGE,
	DEFAULT_SUCCESSFUL_MESSAGE,
} from './utils/http-utils';

const App = () => {
	const { showHeaderRequest } = useContext(ShoppingCartContext);

	return (
		<>
			{showHeaderRequest && (
				<HeaderRequestMessage/>
			)}
			<Header />
			<Shopping />
		</>
	);
};
export default App;
