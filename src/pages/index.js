import EventList from '../../components/events/EventList';
import { getAllEvents } from '../../dummyData';

export default function Home() {
  const allEvents = getAllEvents();
  return (
    <div>
      <EventList items={allEvents} />
    </div>
  );
}
