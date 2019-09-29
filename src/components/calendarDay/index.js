import React from 'react';
import Box from '@material-ui/core/Box';
import './style.scss';

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
    console.log(this.props)
    if (!this.props.canUseHolidays && !this.props.isHoliday || this.props.type === 'public') return;

    this.props.useHoliday(this.props.date, !this.props.isHoliday)
  }

  render() {
    const { date, type } = this.props;
    const targetDate = date ? new Date(date).getDate() : '';

    return (
      <div onClick={this.setAsHoliday} className={`day-container ${targetDate && !this.isWeekend(date) ? 'c-pointer' : ''} ${this.isWeekend(date) ? 'weekend-bgr' : ''} `}>
        <Box component="span" className={`${this.isWeekend(date) || this.props.isHoliday ? 'weekend-text-color' : 'day'} ${this.props.isHoliday ? 'selected-holiday' : ''} ${this.props.type === 'public' ? 'public-holiday' : ''}`}>
          { targetDate }
        </Box>
      </div>
    );
  }
}

export default CalendarDay;
