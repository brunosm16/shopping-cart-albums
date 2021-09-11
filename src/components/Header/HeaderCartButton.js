import { useContext } from 'react';
import ShoppingCartContext from '../../store/shopping-cart-context';
import Button from '../UI/Button/Button';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = () => {
	const { cart } = useContext(ShoppingCartContext);

	const price = cart.items.reduce(
		(currNumber, item) => currNumber + item.amount,
		0
	);

	return (
		<Button cssClass={styles.btn}>
			<span>cart</span>
			<span className={styles.price}>{price}</span>
		</Button>
	);
};

export default HeaderCartButton;
