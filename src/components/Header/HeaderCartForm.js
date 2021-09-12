/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useContext, useRef } from 'react';
import UseInput from '../../hooks/use-input';
import styles from './HeaderCartForm.module.css';

import {
	validateAddress,
	validateEmail,
	validateName,
	validatePostalCode,
} from '../../utils/utils';
import Input from '../UI/Input/Input';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import ShoppingCartContext from '../../store/shopping-cart-context';

const HeaderCartForm = ({ totalPrice, onCancel, onConfirm }) => {
	const {
		value: nameValue,
		inputIsValid: nameIsValid,
		inputHasError: nameHasError,
		inputChangeHandler: nameChangeChandler,
		inputBlurHandler: nameBlurHandler,
		inputResetHandler: nameResetHandler,
	} = UseInput(validateName);

	const {
		value: addressValue,
		inputIsValid: addressIsValid,
		inputHasError: addressHasError,
		inputChangeHandler: addressChangeHandler,
		inputBlurHandler: addressBlurHandler,
		inputResetHandler: addressResetHandler,
	} = UseInput(validateAddress);

	const {
		value: postalCodeValue,
		inputIsValid: postalCodeIsValid,
		inputHasError: postalCodeHasError,
		inputChangeHandler: postalCodeChangeHandler,
		inputBlurHandler: postalCodeBlurHandler,
		inputResetHandler: postalCodeResetHandler,
	} = UseInput(validatePostalCode);

	const {
		value: emailValue,
		inputIsValid: emailIsValid,
		inputHasError: emailHasError,
		inputChangeHandler: emailChangeChandler,
		inputBlurHandler: emailBlurHandler,
		inputResetHandler: emailResetHandler,
	} = UseInput(validateEmail);

	const nameRef = useRef();
	const addressRef = useRef();
	const postalCodeRef = useRef();
	const emailRef = useRef();

	const cartCtx = useContext(ShoppingCartContext);

	const formIsValid =
		nameIsValid && addressIsValid && postalCodeIsValid && emailIsValid;

	/* Focus on first input with error */
	const focusOnInputError = () => {
		if (!nameIsValid) {
			nameRef.current.focus();
			return;
		}

		if (!addressIsValid) {
			addressRef.current.focus();
			return;
		}

		if (!postalCodeIsValid) {
			postalCodeRef.current.focus();
			return;
		}

		if (!emailIsValid) {
			emailRef.current.focus();
		}
	};

	const resetForm = () => {
		nameResetHandler();
		addressResetHandler();
		postalCodeResetHandler();
		emailResetHandler();
	};

	const saveInput = () => {
		onConfirm({
			nameValue,
			addressValue,
			postalCodeValue,
			emailValue,
		});

		resetForm();
	};

	const blurInputs = () => {
		nameBlurHandler();
		addressBlurHandler();
		postalCodeBlurHandler();
		emailBlurHandler();
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		/** Avoid empty values on first page load */
		blurInputs();

		return formIsValid ? saveInput() : focusOnInputError();
	};

	const emptyOrder = cartCtx.cart.items;

	const emptyOrdersMessage = (
		<h3 className={styles['empty-orders-message']}>no orders yet</h3>
	);

	const controls = (
		<div className={styles.controls}>
			<div className={styles.control}>
				<Input
					label="name"
					errorMsg="name must have at least 4 characters"
					isInvalid={nameHasError}
					id="name"
					type="text"
					onChange={nameChangeChandler}
					onBlur={nameBlurHandler}
					value={nameValue}
					ref={nameRef}
				/>
			</div>

			<div className={styles.control}>
				<Input
					label="address"
					errorMsg="address must have at least 8 characters"
					isInvalid={addressHasError}
					id="address"
					type="text"
					onChange={addressChangeHandler}
					onBlur={addressBlurHandler}
					value={addressValue}
					ref={addressRef}
				/>
			</div>

			<div className={styles.control}>
				<Input
					label="postal code"
					errorMsg="postal code must have at least 12 characters"
					isInvalid={postalCodeHasError}
					id="postalCode"
					type="text"
					onChange={postalCodeChangeHandler}
					onBlur={postalCodeBlurHandler}
					value={postalCodeValue}
					ref={postalCodeRef}
				/>
			</div>

			<div className={styles.control}>
				<Input
					label="email"
					errorMsg="email must have at least 6 characters and includes '@'"
					isInvalid={emailHasError}
					id="email"
					type="email"
					onChange={emailChangeChandler}
					onBlur={emailBlurHandler}
					value={emailValue}
					ref={emailRef}
				/>
			</div>
		</div>
	);

	const form = (
		<form className={styles.form} onSubmit={handleSubmit}>
			{!emptyOrder && controls}
			{emptyOrder && emptyOrdersMessage}
			<div className={styles['total-price']}>
				<h3>Total</h3>
				<h3>${totalPrice}</h3>
			</div>

			<div className={styles.actions}>
				<div className={styles.action}>
					<Button onClick={onCancel}>cancel</Button>
				</div>
				<div className={styles.action}>
					{!emptyOrder && <Button isSubmit>confirm</Button>}
				</div>
			</div>
		</form>
	);

	return (
		<Modal onCloseModal={onCancel} cssClass={styles.modal}>
			{form}
		</Modal>
	);
};

HeaderCartForm.defaultProps = {
	totalPrice: 0,
	onCancel: () => {},
	onConfirm: () => {},
};

HeaderCartForm.propTypes = {
	totalPrice: PropTypes.number,
	onCancel: PropTypes.func,
	onConfirm: () => {},
};

export default HeaderCartForm;
