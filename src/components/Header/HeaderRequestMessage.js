import { useContext } from 'react';
import ShoppingCartContext from '../../store/shopping-cart-context';
import styles from './HeaderRequestMessage.module.css';

const HeaderRequestMessage = () => {
	const { requestMessage } = useContext(ShoppingCartContext);

	let cssClass = 'msg-';

	if (requestMessage.isError) {
		cssClass += 'error';
	}

	if (requestMessage.isLoading) {
		cssClass += 'loading';
	}

	if (requestMessage.isSuccessful) {
		cssClass += 'successful';
	}

	return (
		<div className={`${styles['request-header']} ${styles[cssClass]}`}>
			<h3>{requestMessage.value}</h3>
		</div>
	);
};

export default HeaderRequestMessage;
