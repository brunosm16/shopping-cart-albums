import { FcMusic } from 'react-icons/fc';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = () => (
	<header className={styles.header}>
		<div className={styles.heading}>
			<FcMusic className={styles.icon} />
			<h2>albums</h2>
		</div>

		<HeaderCartButton />
	</header>
);

export default Header;
