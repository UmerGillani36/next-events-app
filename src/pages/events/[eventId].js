import ErrorAlert from '../../../components/error-alert/error-alert';
import EventContent from '../../../components/event-detail/event-content';
import EventLogistics from '../../../components/event-detail/event-logistics';
import EventSummary from '../../../components/event-detail/event-summary';
import { getEventById, getAllEvents } from '../../../helpers/api-utils';
const EventDetails = (props) => {
  const { selectedEvent } = props;
  const event = selectedEvent;
  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>No Event Found!!</p>;
        </ErrorAlert>
      </>
    );
  }
  return (
    <>
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
  const allEvents = await getAllEvents();

  const paths = allEvents.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}
