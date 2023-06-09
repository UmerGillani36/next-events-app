import Button from '../ui/Button';
import classes from './EventSearch.module.css';
import { useRef } from 'react';
const EventSearch = (props) => {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const submitHandler = (e) => {
    e.preventDefault();

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    props.onSearch(selectedYear, selectedMonth);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            {months.map((month, index) => (
              <option value={index + 1}>{month}</option>
            ))}
          </select>
        </div>
      </div>
      <Button>Search Event</Button>
    </form>
  );
};

export default EventSearch;
