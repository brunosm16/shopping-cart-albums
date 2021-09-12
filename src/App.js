import { useContext } from 'react';
import Header from './components/Header/Header';
import HeaderRequestMessage from './components/Header/HeaderRequestMessage';
import Shopping from './components/Shopping/Shopping';
import ShoppingCartContext from './store/shopping-cart-context';
import {
	DEFAULT_ERROR_MESSAGE,
	DEFAULT_LOADING_MESSAGE,
} from './utils/http-utils';

const App = () => {
	const { isLoading, requestError } = useContext(ShoppingCartContext);
	const successfulRequest = !isLoading && !requestError;

	const cssClass = isLoading ? '.loading' : '.error';

	const msg = isLoading ? DEFAULT_LOADING_MESSAGE : DEFAULT_ERROR_MESSAGE;

	return (
		<>
			{!successfulRequest && (
				<HeaderRequestMessage cssClass={cssClass} message={msg} />
			)}
			<Header />
			<Shopping />
		</>
	);
};
export default App;
