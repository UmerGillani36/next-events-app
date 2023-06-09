import EventList from '../../../components/events/EventList';
import EventSearch from '../../../components/events/EventSearch';
import { getFeaturedEvents } from '../../../dummyData';
import { useRouter } from 'next/router';
const EventsPage = () => {
  const router = useRouter();
  const featuredEvents = getFeaturedEvents();
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
