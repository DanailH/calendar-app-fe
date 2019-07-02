import React from 'react';

class CalendarDay extends React.Component {
  isWeekend(date) {
    const day = new Date(date);

    if (day.getDay() === 6 || day.getDay() === 0) return true;

    return false;
  }

  render() {
    const { date, type } = this.props;
    const targetDate = date ? new Date(date).getDate() : '';
    console.log(this.props)
    return (
      <div className={`m-1 w-25 h5 font-weight-normal ${targetDate ? 'c-pointer list-group-item-action' : ''} ${this.isWeekend(date) ? 'bg-success' : ''} ${type ? 'card' : ''}`}>
        <div className={`card-body text-center ${this.isWeekend(date) ? 'text-light' : ''}`}>
          { targetDate }
        </div>
      </div>
    );
  }
}

export default CalendarDay;
