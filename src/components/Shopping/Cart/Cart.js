import { useContext } from 'react';
import ShoppingCartContext from '../../../store/shopping-cart-context';
import Card from '../../UI/Card/Card';
import List from '../../UI/List/List';
import styles from './Cart.module.css';
import CartItem from './CartItem';

const Cart = () => {
	const { items, onAddCartItem, onRemoveCartItemById } =
		useContext(ShoppingCartContext);
	const emptyItems = items.length === 0;

	const emptyItemsMessage = (
		<div className={styles['empty-orders-msg']}>
			<h2>no items ordered yet</h2>
		</div>
	);

	const handleUpdateAmount = (itemObj, isAdd) => {
		if (isAdd) {
			onAddCartItem(itemObj);
		} else {
			onRemoveCartItemById(itemObj.id);
		}
	};

	const list = (
		<List>
			{items.map((item) => (
				<CartItem
					key={item.id}
					id={item.id}
					name={item.name}
					price={item.price}
					amount={item.amount}
					onUpdateAmount={handleUpdateAmount}
				/>
			))}
		</List>
	);

	return (
		<Card cssClass={styles.cart}>
			{emptyItems && emptyItemsMessage}
			{!emptyItems && list}
		</Card>
	);
};

export default Cart;
