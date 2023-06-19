import Head from 'next/head';
import EventList from '../../components/events/EventList';
import NewsletterRegistration from '../../components/input/newsletter-registration';
import { getFeaturedEvents } from '../../helpers/api-utils';
export default function Home(props) {
  const { events } = props;
  return (
    <div>
      <Head>
        <title>Featured Events Page</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
