import EventList from '../../components/events/EventList';
import { getFeaturedEvents } from '../../helpers/api-utils';
export default function Home(props) {
  const { events } = props;
  return (
    <div>
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
  };
}
