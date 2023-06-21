import '@/styles/globals.css';
import Head from 'next/head';
import Layout from '../../components/layout/layout';
import Notification from '../../components/ui/notification';

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
      <Notification title={"Test"} message={"This is test message"} status={"success"}/>
    </Layout>
  );
}
