import PropTypes from 'prop-types';
import styles from './ListItem.module.css';

const ListItem = ({ children, cssClass }) => (
	<li className={`${styles.item} ${cssClass}`}>{children}</li>
);

ListItem.defaultProps = {
	cssClass: '',
	children: {},
};

ListItem.propTypes = {
	cssClass: PropTypes.string,
	children: PropTypes.node,
};

export default ListItem;
