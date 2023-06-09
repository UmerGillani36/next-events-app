import Head from 'next/head';
import ErrorAlert from '../../../components/error-alert/error-alert';
import EventContent from '../../../components/event-detail/event-content';
import EventLogistics from '../../../components/event-detail/event-logistics';
import EventSummary from '../../../components/event-detail/event-summary';
import Comments from '../../../components/input/comments';
import { getEventById, getFeaturedEvents } from '../../../helpers/api-utils';
const EventDetails = (props) => {
  const { selectedEvent } = props;
  const event = selectedEvent;
  if (!event) {
    return (
      <>
        <div className="center">
          <p>Loading...</p>;
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Event Detail Page</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export default EventDetails;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();

  const paths = allEvents.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
}
