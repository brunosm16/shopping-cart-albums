import PropTypes from 'prop-types';
import { useContext } from 'react';
import styles from './AlbumItem.module.css';
import Button from '../../UI/Button/Button';
import ListItem from '../../UI/List/ListItem';
import ShoppingCartContext from '../../../store/shopping-cart-context';
import { findItemById } from '../../../utils/utils';

const AlbumItem = ({ id, name, artist, price, releaseDate, onAddItem }) => {
	const { albums, items } = useContext(ShoppingCartContext);

	const currAlbum = findItemById(id, albums);
	const currItem = findItemById(id, items);

	const handleAddItem = () => {
		if (currItem) {
			const amountResult = currItem.amount + 1;

			if (amountResult <= currAlbum.stockLimit) {
				onAddItem({
					id,
					name,
					price,
					amount: 1,
				});
			}
		} else {
			onAddItem({
				id,
				name,
				price,
				amount: 1,
			});
		}
	};

	return (
		<ListItem>
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
		</ListItem>
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
