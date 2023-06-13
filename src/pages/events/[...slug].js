import { useRouter } from 'next/router';
import ErrorAlert from '../../../components/error-alert/error-alert';
import EventList from '../../../components/events/EventList';
import ResultsTitle from '../../../components/results-title/results-title';
import Button from '../../../components/ui/Button';
import { getFilteredEvents } from '../../../helpers/api-utils';
const FilteredEventsPage = (props) => {
  // const router = useRouter();
  // const slug = router.query.slug;
  // console.log('slug', slug);
  // if (!slug) {
  //   return <p className="center">Loading...</p>;
  // }
  // const FilteredYear = slug[0];
  // const FilteredMonth = slug[1];

  // const newYear = +FilteredYear;
  // const newMonth = +FilteredMonth;

  if (props.isError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter, Please adjust your values!</p>;
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  // const FilteredEvents = getFilteredEvents({
  //   year: newYear,
  //   month: newMonth,
  // });
  const FilteredEvents = props.events;

  if (!FilteredEvents || FilteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!!</p>);
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={FilteredEvents} />
    </div>
  );
};

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const slug = params.slug;
  const FilteredYear = slug[0];
  const FilteredMonth = slug[1];

  const newYear = +FilteredYear;
  const newMonth = +FilteredMonth;

  if (
    isNaN(newYear) ||
    isNaN(newMonth) ||
    newYear > 2030 ||
    newYear < 2021 ||
    newMonth > 12 ||
    newMonth < 1
  ) {
    return { params: { isError: true } };
  }
  const FilteredEvents = await getFilteredEvents({
    year: newYear,
    month: newMonth,
  });
  return {
    props: {
      events: FilteredEvents,
      date: {
        year: newYear,
        month: newMonth,
      },
    },
  };
}
