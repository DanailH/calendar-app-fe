import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CalendarWeek from '../calendarWeek';
import './style.scss';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const weekDaysLabel = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getWeeksArray = (year, month) => {
  if (!year || !month) return [];

  let date = new Date(year, month - 1, 1);
  const result = [[]];

  while (date.getMonth() === month - 1) {
    if (weekDays[date.getDay()] !== 'Tuesday') {
      result[result.length - 1].push(date.toISOString());
    } else {
      if (result.length !== 1 || result[0].length !== 0) {
        result.push([]);
      }
      result[result.length - 1].push(date.toISOString());
    }

    date.setDate(date.getDate() + 1);
  }

  return result;
};

class CalendarMain extends React.Component {
  state = {
    weeks: getWeeksArray(new Date().getFullYear(), 1)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      weeks: getWeeksArray(props.activeYear, props.activeMonth)
    };
  }

  printCalendarWeeks() {
    const numberOfWeeks = this.state.weeks.length;
    const publicHolidays = this.props.publicHolidays.map(holiday => ({
      date: holiday.date.split('T')[0],
      info: holiday.info
    }));

    return this.state.weeks.map((week, i) => {
      if (i === 0) return <CalendarWeek sharedCalendars={this.props.sharedCalendars} useHoliday={this.props.useHoliday} publicHolidays={publicHolidays} listOfUsedHolidays={this.props.listOfUsedHolidays} canUseHolidays={this.props.canUseHolidays} key={i} week={week} initialWeek={true} lastWeek={false} />
      if (i === numberOfWeeks - 1) return <CalendarWeek sharedCalendars={this.props.sharedCalendars} useHoliday={this.props.useHoliday} publicHolidays={publicHolidays} listOfUsedHolidays={this.props.listOfUsedHolidays} canUseHolidays={this.props.canUseHolidays} key={i} week={week} initialWeek={false} lastWeek={true} />

      return <CalendarWeek sharedCalendars={this.props.sharedCalendars} useHoliday={this.props.useHoliday} canUseHolidays={this.props.canUseHolidays} publicHolidays={publicHolidays} listOfUsedHolidays={this.props.listOfUsedHolidays} key={i} week={week} initialWeek={false} lastWeek={false} />
    });
  }

  renderWeekDays() {
    return weekDaysLabel.map((days, i) => (
      <Grid item sm key={i} className="weekdays">
        {days}
      </Grid>
    ));
  }

  getCurrentMonthHolidays() {
    const publicHolidays = this.props.publicHolidays
    const getCurrentYearHolidays = publicHolidays.filter(holiday => new Date(holiday.date).getFullYear() === this.props.activeYear)
    const getCurrentMonthHolidays = getCurrentYearHolidays.filter(holiday => new Date(holiday.date).getMonth() === this.props.activeMonth - 1)

    return getCurrentMonthHolidays;
  }

  showMonthlyPubHolidays() {
    return this.getCurrentMonthHolidays().map((pubHoliday, i) => {
      const day = new Date(pubHoliday.date).getDate()
      return (
        <div key={i} className="d-flex align-center holidays-box">
          <div className="public-holiday">{day}</div>
          <span className="holiday-info">{pubHoliday.info}</span>
        </div>
      )
    });
  }

  render() {
    return (
      <Fragment>
        <Grid container justify={'center'} >
          {this.renderWeekDays()}
          <Grid container className="calendar-container">
            {this.printCalendarWeeks()}
          </Grid>
        </Grid>
        {!!this.getCurrentMonthHolidays().length && <div className="monthly-holidays-wrapper">
          <Divider />
            <div className="monthly-holidays-container">
              <div className="content-header">Public holidays</div>
              {this.showMonthlyPubHolidays()}
            </div>
        </div>
          }
      </Fragment>
    );
  }
}

export default CalendarMain;
