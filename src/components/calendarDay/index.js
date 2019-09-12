import React from 'react';

class CalendarDay extends React.Component {
  constructor() {
    super();

    this.setAsHoliday = this.setAsHoliday.bind(this);
    this.isWeekend = this.isWeekend.bind(this);
  }

  isWeekend(date) {
    const day = new Date(date);

    if (day.getDay() === 6 || day.getDay() === 0 || this.props.type === 'public') return true;

    return false;
  }

  setAsHoliday() {
    if (!this.props.canUseHolidays && !this.props.isHoliday || this.props.type === 'public') return;

    this.props.useHoliday(this.props.date, !this.props.isHoliday)
  }

  render() {
    const { date, type } = this.props;
    const targetDate = date ? new Date(date).getDate() : '';

    return (
      <div onClick={this.setAsHoliday} className={`m-1 w-25 h5 font-weight-normal ${this.props.isHoliday ? 'bg-info' : ''} ${targetDate && !this.isWeekend(date) ? 'c-pointer list-group-item-action' : ''} ${this.isWeekend(date) ? 'bg-success' : ''} ${type ? 'card' : ''}`}>
        <div className={`card-body text-center ${this.isWeekend(date) || this.props.isHoliday ? 'text-light' : ''}`}>
          { targetDate }
        </div>
      </div>
    );
  }
}

export default CalendarDay;
