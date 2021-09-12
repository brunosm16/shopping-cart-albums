import PropTypes from 'prop-types';
import styles from './HeaderRequestMessage.module.css';

const HeaderRequestMessage = ({ cssClass, message }) => (
	<div className={`${styles['request-header']} ${cssClass}`}>
		<h3>{message}</h3>
	</div>
);

HeaderRequestMessage.defaultProps = {
	cssClass: '',
	message: '',
};

HeaderRequestMessage.propTypes = {
	cssClass: PropTypes.string,
	message: PropTypes.string,
};

export default HeaderRequestMessage;
