import React from 'react';
import PropTypes from 'prop-types';
import styles from './Overlay.module.css';

const Overlay = ({ cssClass, content }) => (
	<div className={`${styles.overlay} ${cssClass}`}>{content}</div>
);

Overlay.defaultProps = {
	content: {},
	cssClass: '',
};

Overlay.propTypes = {
	content: PropTypes.node,
	cssClass: PropTypes.string,
};

export default Overlay;
