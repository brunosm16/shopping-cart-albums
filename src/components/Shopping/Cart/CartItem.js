import { useContext } from 'react';
import PropTypes from 'prop-types';
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai';
import ShoppingCartContext from '../../../store/shopping-cart-context';
import { findItemById } from '../../../utils/utils';
import styles from './CartItem.module.css';
import Button from '../../UI/Button/Button';
import ListItem from '../../UI/List/ListItem';

const CartItem = ({ id, name, price, amount, onUpdateAmount }) => {
	const totalPrice = amount * price;

	const { albums } = useContext(ShoppingCartContext);

	const currAlbum = findItemById(id, albums);

	const itemObj = {
		id,
		name,
		price,
	};

	const handleIncreaseAmount = () => {
		const amountResult = amount + 1;

		if (amountResult < currAlbum.stockLimit) {
			onUpdateAmount(
				{
					...itemObj,
					amount: amountResult,
				},
				true
			);
		}
	};

	const handleDecreaseAmount = () => {
		const amountResult = amount - 1;

		onUpdateAmount(
			{
				...itemObj,
				amount: amountResult,
			},
			false
		);
	};

	return (
		<ListItem cssClass={styles.item}>
			<div className={styles.info}>
				<h3>{name}</h3>
				<h3>
					{amount}
					<span>x</span>
				</h3>
			</div>

			<div className={styles.info}>
				<h3>
					${totalPrice}
					<span>(${price}/item)</span>
				</h3>

				<div className={styles.actions}>
					<Button onClick={handleDecreaseAmount}>
						<AiFillMinusSquare className={styles.icon} />
					</Button>

					<Button onClick={handleIncreaseAmount}>
						<AiFillPlusSquare className={styles.icon} />
					</Button>
				</div>
			</div>
		</ListItem>
	);
};

CartItem.defaultProps = {
	id: '',
	name: '',
	price: 0,
	amount: 0,
	onUpdateAmount: () => {},
};

CartItem.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.number,
	amount: PropTypes.number,
	onUpdateAmount: PropTypes.func,
};

export default CartItem;
