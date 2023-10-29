import React from 'react';
import Header from './Header';
import styles from '../styles/Layout.module.css';

const Layout = ({children}) => {
  return (
    <div className={styles.mainh}>
    <header>
     <Header />
    </header>
    <main>
      {children}
    </main>
  </div>
  )
}

export default Layout