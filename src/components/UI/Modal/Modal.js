import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import Overlay from './Overlay';

const Modal = ({ cssClass, onCloseModal, children }) => (
	<>
		{ReactDOM.createPortal(
			<Backdrop onCloseModal={onCloseModal} />,
			document.getElementById('backdrop')
		)}

		{ReactDOM.createPortal(
			<Overlay cssClass={cssClass} content={children} />,
			document.getElementById('overlay')
		)}
	</>
);

Modal.defaultProps = {
	cssClass: '',
	children: {},
	onCloseModal: () => {},
};

Modal.propTypes = {
	cssClass: PropTypes.string,
	children: PropTypes.node,
	onCloseModal: PropTypes.func,
};

export default Modal;
