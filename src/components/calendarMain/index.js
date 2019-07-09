import React from 'react';
import CalendarWeek from '../calendarWeek';

const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const getWeeksArray = (year, month) => {
  if (!year || !month) return [];

  let date = new Date(year, month - 1, 1);
  const result = [[]];

  while (date.getMonth() === month - 1) {
    if (weekDays[date.getDay()] !== 'mon') {
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
      if (i === 0) return <CalendarWeek useHoliday={this.props.useHoliday} listOfUsedHolidays={this.props.listOfUsedHolidays} canUseHolidays={this.props.canUseHolidays} key={i} week={week} initialWeek={true} lastWeek={false} />
      if (i === numberOfWeeks - 1) return <CalendarWeek useHoliday={this.props.useHoliday} listOfUsedHolidays={this.props.listOfUsedHolidays} canUseHolidays={this.props.canUseHolidays} key={i} week={week} initialWeek={false} lastWeek={true} />

      return <CalendarWeek useHoliday={this.props.useHoliday} canUseHolidays={this.props.canUseHolidays} listOfUsedHolidays={this.props.listOfUsedHolidays} key={i} week={week} initialWeek={false} lastWeek={false} />
    });
  }

  render() {
    return (
      <div className="align-items-center align-self-center w-100">
        { this.printCalendarWeeks() }
      </div>
    );
  }
}

export default CalendarMain;
