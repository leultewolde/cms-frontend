'use client';
import {NextPage} from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import withAuth from "@/components/withAuth";

const Home: NextPage = () => {
  return (
      <div className={styles.container}>
        <Head>
          <title>CMS Home</title>
          <meta name="description" content="CMS Home Page"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to the CMS
          </h1>
          <p className={styles.description}>
            Start managing your content efficiently.
          </p>
        </main>
      </div>
  );
}

export default withAuth(Home);