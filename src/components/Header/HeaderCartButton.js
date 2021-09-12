import { useContext, useState } from 'react';
import ShoppingCartContext from '../../store/shopping-cart-context';
import Button from '../UI/Button/Button';
import styles from './HeaderCartButton.module.css';
import HeaderCartForm from './HeaderCartForm';
import UseHttp from '../../hooks/use-http';
import {
	ENDPOINT,
	DEFAULT_ERROR_MESSAGE,
	DEFAULT_LOADING_MESSAGE,
	headerJSON,
} from '../../utils/http-utils';
import { findItemById } from '../../utils/utils';

const HeaderCartButton = () => {
	const [formIsOpen, setFormIsOpen] = useState(false);
	const { cart, onSetRequestMessage, albums } = useContext(ShoppingCartContext);

	const price = cart.items.reduce(
		(currNumber, item) => currNumber + item.amount,
		0
	);

	/* Http  hooks */
	const {
		isLoading: productsRequestLoading,
		requestError: productsRequestError,
		sendRequest: updateProducts,
	} = UseHttp();

	const {
		isLoading: orderRequestLoading,
		requestError: orderRequestError,
		sendRequest: postOrder,
	} = UseHttp();

	const updateRequestMessage = (loading, error) => {
		if (loading) {
			onSetRequestMessage(DEFAULT_LOADING_MESSAGE, false, false);
		}

		if (error) {
			onSetRequestMessage(DEFAULT_ERROR_MESSAGE, true, false);
		}
	};

	const sendOrder = (body) => {
		postOrder({
			url: `${ENDPOINT}/orders.json`,
			body,
			method: 'POST',
			headers: headerJSON,
		});

		updateRequestMessage(orderRequestLoading, orderRequestError);
	};

	const updateProductsStockLimit = (id, order) => {
		const itemToUpdate = findItemById(id, albums);

		const body = {
			...itemToUpdate,
			stockLimit: itemToUpdate.stockLimit - order.amount,
		};

		updateProducts({
			url: `${ENDPOINT}/${id}/albums.json`,
			method: 'PUT',
			body,
			headers: headerJSON,
		});

		updateRequestMessage(productsRequestLoading, productsRequestError);
	};

	const handleConfirmOrder = (order) => {
		setFormIsOpen(false);

		sendOrder(order);
		updateProductsStockLimit(order.id, order);
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
