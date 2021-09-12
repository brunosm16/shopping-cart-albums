import { useContext } from 'react';
import Header from './components/Header/Header';
import HeaderRequestMessage from './components/Header/HeaderRequestMessage';
import ShoppingCartContext from './store/shopping-cart-context';

const App = () => {
	const { requestMessage} = useContext(ShoppingCartContext);

	const messageExists =
		requestMessage.isLoading ||
		requestMessage.isError ||
		requestMessage.isSuccessful;
	

	return (
		<>
			{messageExists && <HeaderRequestMessage />}
			<Header />
		</>
	);
};
export default App;
