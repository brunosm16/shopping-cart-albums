import { useContext, useState } from 'react';
import ShoppingCartContext from '../../store/shopping-cart-context';
import Button from '../UI/Button/Button';
import styles from './HeaderCartButton.module.css';
import HeaderCartForm from './HeaderCartForm';

const HeaderCartButton = () => {
	const [formIsOpen, setFormIsOpen] = useState(false);

	const { cart } = useContext(ShoppingCartContext);

	const price = cart.items.reduce(
		(currNumber, item) => currNumber + item.amount,
		0
	);

	const handleConfirmOrder = (order) => {
		setFormIsOpen(false);
		console.log(order);
	};

	const handleCancelOrder = () => {
		setFormIsOpen(false);
	};

	const handleOpenForm = () => {
		setFormIsOpen(true);
	};

	return (
		<>
			{formIsOpen && (
				<HeaderCartForm
					onCancel={handleCancelOrder}
					onConfirm={handleConfirmOrder}
				/>
			)}

			<Button cssClass={styles.btn} onClick={handleOpenForm}>
				<span>cart</span>
				<span className={styles.price}>{price}</span>
			</Button>
		</>
	);
};

export default HeaderCartButton;
