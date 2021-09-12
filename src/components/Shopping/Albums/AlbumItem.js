import PropTypes from 'prop-types';
import styles from './AlbumItem.module.css';
import Button from '../../UI/Button/Button';

const AlbumItem = ({ id, name, artist, price, releaseDate, onAddItem }) => {
	const handleAddItem = () => {
		onAddItem({
			id,
			name,
			price,
			amount: 1,
		});
	};

	return (
		<li className={styles.item}>
			<div className={styles['info-container']}>
				<div className={styles.info}>
					<h3>{name}</h3>

					<h4>{artist}</h4>
				</div>

				<div className={styles.info}>
					<h3>${price}</h3>
					<h4>{releaseDate}</h4>
				</div>
			</div>
			<div className={styles.actions}>
				<Button onClick={handleAddItem}>add to cart</Button>
			</div>
		</li>
	);
};

AlbumItem.defaultProps = {
	id: '',
	name: '',
	artist: '',
	price: 0,
	releaseDate: '',
	onAddItem: () => {},
};

AlbumItem.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	artist: PropTypes.string,
	price: PropTypes.number,
	releaseDate: PropTypes.string,
	onAddItem: PropTypes.func,
};

export default AlbumItem;
