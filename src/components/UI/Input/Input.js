import PropTypes from 'prop-types';
import React, { useRef, useImperativeHandle } from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(
	(
		{ label, errorMsg, isInvalid, id, type, onChange, onBlur, value, cssClass },
		ref
	) => {
		const inputRef = useRef();

		const activate = () => {
			inputRef.current.focus();
		};

		useImperativeHandle(ref, () => ({
			focus: activate,
		}));

		return (
			<div
				className={`${styles.container} ${
					isInvalid && styles.invalid
				} ${cssClass}`}
			>
				<label htmlFor={id}>{label}</label>
				<input
					id={id}
					type={type}
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					ref={inputRef}
				/>

				{isInvalid && <p className={styles['error-msg']}>{errorMsg}</p>}
			</div>
		);
	}
);

Input.defaultProps = {
	label: '',
	errorMsg: '',
	isInvalid: true,
	id: '',
	type: '',
	onChange: () => {},
	onBlur: () => {},
	value: '',
	cssClass: '',
};

Input.propTypes = {
	label: PropTypes.string,
	errorMsg: PropTypes.string,
	isInvalid: PropTypes.bool,
	id: PropTypes.string,
	type: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	value: PropTypes.string,
	cssClass: PropTypes.string,
};

export default Input;
