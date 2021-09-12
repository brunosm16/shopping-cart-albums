import Albums from './Albums/Albums';
import styles from './Shopping.module.css';

const Shopping = () => (
	<main className={styles.shopping}>
		<Albums />
		{/* <Cart /> */}
	</main>
);

export default Shopping;
