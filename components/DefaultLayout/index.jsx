import Link from "next/link";
import styles from "./index.module.scss";

const DefaultLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <Link href="/">
          <a>
            <h1 className={styles.title}>My Datapad</h1>
          </a>
        </Link>
      </nav>

      {children}

      <footer className={styles.footer}>
       <p>Edgemony 2022 - CSS by Federica C.</p>
      </footer>
    </div>
  );
};

export default DefaultLayout;
