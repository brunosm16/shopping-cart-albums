import PropTypes from 'prop-types';
import styles from './List.module.css';

const List = ({ children }) => <ul className={styles.list}>{children}</ul>;

List.defaultProps = {
	children: {},
};

List.propTypes = {
	children: PropTypes.node,
};

export default List;
