import React from 'react';
import Grid from '@material-ui/core/Grid';
import CalendarDay from '../calendarDay';
import './style.scss';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class CalendarWeek extends React.Component {
  printCalendarDays() {
    const props = this.props;

    if (props.week.length < 7) {
      const firstWeekMissingDays = 7 - props.week.length;
      for (let i = 1; i <= firstWeekMissingDays; i++) {
        if (this.props.initialWeek) props.week.unshift(undefined);
        if (this.props.lastWeek) props.week.push(undefined);
      }
    }

    return props.week.map((day, i) => {
      const prepDayForPHolidayCheck = day ? day.split('T')[0] : undefined;
      const isHoliday = this.props.listOfUsedHolidays.indexOf(day);
      const isPublicHoliday = this.props.publicHolidays.indexOf(prepDayForPHolidayCheck);
      const dateType = isPublicHoliday > -1 ? 'public' : 'weekday';

      if (!day) return <Grid item sm key={i} className="week-container"><CalendarDay key={i} type={undefined} date={day} /></Grid>;

      switch (weekDays[new Date(day).getDay()]) {
        case 'Saturday':
          return <Grid item sm key={i} className="week-container"><CalendarDay key={i} type={'weekend'} date={day} /></Grid>
          case 'Sunday':
          return <Grid item sm key={i} className="week-container"><CalendarDay key={i} type={'weekend'} date={day} /></Grid>
        default:
          return <Grid item sm key={i} className="week-container"><CalendarDay useHoliday={this.props.useHoliday} isHoliday={isHoliday > -1 ? true : false} canUseHolidays={this.props.canUseHolidays} key={i} type={dateType} date={day} /></Grid>
      }
    });
  }

  render() {
    return (
      <Grid container justify={'center'}>
        { this.printCalendarDays() }
      </Grid>
    );
  }
}

export default CalendarWeek;
