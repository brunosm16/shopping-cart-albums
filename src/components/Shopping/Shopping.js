import Albums from './Albums/Albums';
import Cart from './Cart/Cart';
import styles from './Shopping.module.css';

const Shopping = () => (
	<main className={styles.shopping}>
		<Albums />
		<Cart />
	</main>
);

export default Shopping;
