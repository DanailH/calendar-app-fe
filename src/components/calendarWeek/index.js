import React from 'react';
import CalendarDay from '../calendarDay';

const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

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
      const isHoliday = this.props.listOfUsedHolidays.indexOf(day);

      if (!day) return <CalendarDay key={i} type={undefined} date={day} />;

      switch (weekDays[new Date(day).getDay()]) {
        case 'sat':
          return <CalendarDay key={i} type={'weekend'} date={day} />
          break;
        case 'sun':
          return <CalendarDay key={i} type={'weekend'} date={day} />
          break;
        default:
          return <CalendarDay useHoliday={this.props.useHoliday} isHoliday={isHoliday > -1 ? true : false} canUseHolidays={this.props.canUseHolidays} key={i} type={'weekday'} date={day} />
      }
    });
  }

  render() {
    return (
      <div className="d-flex mb-2">
        { this.printCalendarDays() }
      </div>
    );
  }
}

export default CalendarWeek;
