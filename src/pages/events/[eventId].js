import { useRouter } from 'next/router';
import ErrorAlert from '../../../components/error-alert/error-alert';
import EventContent from '../../../components/event-detail/event-content';
import EventLogistics from '../../../components/event-detail/event-logistics';
import EventSummary from '../../../components/event-detail/event-summary';
import { getEventById } from '../../../dummyData';
const EventDetails = () => {
  const router = useRouter();
  const id = router.query;
  const event = getEventById(id?.eventId);
  console.log('id', id);
  console.log('event', event);
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
