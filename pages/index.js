import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import HomePage from '../components/HomePage';


export default function Home() {
 
  return (
    <div className={styles.container}>
      {/* <Head>
        <title>Groww Stocks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.tabButtons}>
        <button
          className={activeTab === 1 ? styles.active : ''}
          onClick={() => handleTabClick(1)}
        >
          Tab 1
        </button>
        <button
          className={activeTab === 2 ? styles.active : ''}
          onClick={() => handleTabClick(2)}
        >
          Tab 2
        </button>
       
      </div>

      <div className={styles.tabContent}>
        {activeTab === 1 && <div>
          <GainerLoserArea data={topg} />
          {showLoadMoreg && <button className="loadMore" onClick={()=>loadMore('g')}>
        Load More 
    </button>}</div>}
        {activeTab === 2 && <div>
          <GainerLoserArea data={topl} />
          {showLoadMorel && <button className="loadMore" onClick={()=>loadMore('l')}>
        Load More 
    </button>}
    </div>}
      
      </div> */}
      <HomePage />
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

