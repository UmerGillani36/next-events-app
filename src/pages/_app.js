import '@/styles/globals.css';
import Head from 'next/head';
import Layout from '../../components/layout/layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Events App</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
        <meta
          name="viewport"
          content="initial-scale=1.0, width= device-width"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
