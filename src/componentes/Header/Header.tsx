import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>ST</div>
          <div>
            <h1>Sabor Tricolor</h1>
            <p className={styles.lead}>
              Encuentra recetas por ingredientes - Valora la cultura culinaria de boliviana
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
