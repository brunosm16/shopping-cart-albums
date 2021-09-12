/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect } from 'react';
import UseHttp from '../../../hooks/use-http';
import ShoppingCartContext from '../../../store/shopping-cart-context';
import {
	DEFAULT_ERROR_MESSAGE,
	DEFAULT_LOADING_MESSAGE,
	ENDPOINT,
	headerJSON,
} from '../../../utils/http-utils';
import { dateToHTML } from '../../../utils/utils';
import AlbumItem from './AlbumItem';
import styles from './Albums.module.css';

const Albums = () => {
	const { onLoadAlbums, albums, onAddCartItem } =
		useContext(ShoppingCartContext);

	const transformAlbums = (albumsFetched) => {
		const albumsArr = [];

		Object.keys(albumsFetched).forEach((key) => {
			// Format JSON date to 'yyyy-mm-dd'
			const dateFormatted = dateToHTML(albumsFetched[key].releaseDate);
			albumsArr.push({
				id: key,
				artist: albumsFetched[key].artist,
				name: albumsFetched[key].name,
				price: albumsFetched[key].price,
				releaseDate: dateFormatted,
				stockLimit: albumsFetched[key].stockLimit,
			});
		});

		onLoadAlbums(albumsArr);
	};

	const { isLoading, requestError, sendRequest: fetchAlbums } = UseHttp();

	useEffect(() => {
		fetchAlbums(
			{
				url: `${ENDPOINT}/albums.json`,
				method: 'GET',
				headers: headerJSON,
			},
			transformAlbums
		);
	}, [fetchAlbums]);

	const handleAddItem = (itemObj) => {
		onAddCartItem(itemObj);
	};

	const successfulRequest = !isLoading && !requestError;

	let albumsList;

	if (albums.length !== 0) {
		albumsList = (
			<ul className={styles.list}>
				{albums.map((album) => (
					<AlbumItem
						key={album.id}
						id={album.id}
						artist={album.artist}
						price={album.price}
						releaseDate={album.releaseDate}
						name={album.name}
						onAddItem={handleAddItem}
					/>
				))}
			</ul>
		);
	}

	let requestInfo;
	let infoCssClass = `${styles['request-info']}`;

	if (isLoading) {
		requestInfo = <h2 className={infoCssClass}>{DEFAULT_LOADING_MESSAGE}</h2>;
	}

	if (requestError) {
		infoCssClass += ` ${styles['info-error']}`;
		requestInfo = <h2 className={infoCssClass}>{DEFAULT_ERROR_MESSAGE}</h2>;
	}

	if (albums.length === 0) {
		albumsList = <h2 className={infoCssClass}>no products available</h2>;
	}

	return (
		<div className={styles.albums}>
			{!successfulRequest && requestInfo}
			{successfulRequest && albumsList}
		</div>
	);
};

export default Albums;
