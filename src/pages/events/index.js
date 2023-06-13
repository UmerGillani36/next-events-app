import EventList from '../../../components/events/EventList';
import EventSearch from '../../../components/events/EventSearch';
import { getAllEvents } from '../../../helpers/api-utils';
import { useRouter } from 'next/router';
const EventsPage = (props) => {
  const { featuredEvents } = props;
  const router = useRouter();
  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={featuredEvents} />
    </>
  );
};
export default EventsPage;

export async function getStaticProps() {
  const featuredEvents = await getAllEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 60,
  };
}
