import React from 'react';
import Grid from '@material-ui/core/Grid';
import CalendarWeek from '../calendarWeek';
import './style.scss';

export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getWeeksArray = (year, month) => {
  if (!year || !month) return [];

  let date = new Date(year, month - 1, 1);
  const result = [[]];

  while (date.getMonth() === month - 1) {
    if (weekDays[date.getDay()] !== 'Tuesday') {
      result[result.length - 1].push(date.toISOString());
    } else {
      if(result.length !== 1 || result[0].length !== 0) {
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
    return this.state.weeks.map((week, i) => {
      if (i === 0) return <CalendarWeek useHoliday={this.props.useHoliday} publicHolidays={this.props.publicHolidays} listOfUsedHolidays={this.props.listOfUsedHolidays} canUseHolidays={this.props.canUseHolidays} key={i} week={week} initialWeek={true} lastWeek={false} />
      if (i === numberOfWeeks - 1) return <CalendarWeek useHoliday={this.props.useHoliday} publicHolidays={this.props.publicHolidays} listOfUsedHolidays={this.props.listOfUsedHolidays} canUseHolidays={this.props.canUseHolidays} key={i} week={week} initialWeek={false} lastWeek={true} />

      return <CalendarWeek useHoliday={this.props.useHoliday} canUseHolidays={this.props.canUseHolidays} publicHolidays={this.props.publicHolidays} listOfUsedHolidays={this.props.listOfUsedHolidays} key={i} week={week} initialWeek={false} lastWeek={false} />
    });
  }

  renderDays() {
    return weekDays.map((days, i) => (
      <Grid item sm key={i} className="weekdays">
        {days}
      </Grid>
    ));
  }

  render() {
    return (
      <Grid container justify={'center'} >
        {this.renderDays()}
      <Grid container className="calendar-container">
        { this.printCalendarWeeks() }
      </Grid>
      </Grid>
    );
  }
}

export default CalendarMain;
