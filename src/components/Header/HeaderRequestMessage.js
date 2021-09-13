import { useContext } from 'react';
import ShoppingCartContext from '../../store/shopping-cart-context';
import {
	DEFAULT_ERROR_MESSAGE,
	DEFAULT_LOADING_MESSAGE,
	DEFAULT_SUCCESSFUL_MESSAGE,
} from '../../utils/http-utils';
import styles from './HeaderRequestMessage.module.css';

const HeaderRequestMessage = () => {
	const { isLoading, requestError } = useContext(ShoppingCartContext);

	const sucessfullRequest = !isLoading && !requestError;

	let message;
	let cssClass;

	if (isLoading) {
		message = DEFAULT_LOADING_MESSAGE;
		cssClass = 'loading';
	}

	if (requestError) {
		message = DEFAULT_ERROR_MESSAGE;
		cssClass = 'error';
	}

	if (sucessfullRequest) {
		message = DEFAULT_SUCCESSFUL_MESSAGE;
		cssClass = 'successful';
	}
	return (
		<div className={`${styles['request-header']} ${styles[cssClass]}`}>
			<h3>{message}</h3>
		</div>
	);
};

export default HeaderRequestMessage;
