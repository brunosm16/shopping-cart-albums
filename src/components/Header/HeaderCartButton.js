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
	DEFAULT_SUCCESSFUL_MESSAGE,
} from '../../utils/http-utils';
import { findItemById } from '../../utils/utils';

const HeaderCartButton = () => {
	const [formIsOpen, setFormIsOpen] = useState(false);
	const {
		cart,
		onSetErrorMessage,
		onSetLoadingMessage,
		onSetSuccessfulMessage,
		albums,
	} = useContext(ShoppingCartContext);

	const price = cart.items.reduce(
		(currNumber, item) => currNumber + item.amount,
		0
	);

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

	const updateRequestMessage = (loading, error, successful) => {
		if (loading) {
			onSetLoadingMessage(DEFAULT_LOADING_MESSAGE);
		}

		if (error) {
			onSetErrorMessage(DEFAULT_ERROR_MESSAGE);
		}

		if (successful) {
			onSetSuccessfulMessage(DEFAULT_SUCCESSFUL_MESSAGE);
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

	const requestsLoading = productsRequestLoading || orderRequestLoading;
	const requestsError = productsRequestError || orderRequestError;

	if (!requestsLoading && !requestsError) {
		updateRequestMessage(false, false, true);
	}

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
