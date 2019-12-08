import React, { Fragment } from 'react';
import Box from '@material-ui/core/Box';
import { UsersColors } from '../../constants';
import './style.scss';

class CalendarDay extends React.Component {
  constructor() {
    super();

    this.setAsHoliday = this.setAsHoliday.bind(this);
    this.isWeekend = this.isWeekend.bind(this);
    this.renderSharedHoliday = this.renderSharedHoliday.bind(this);
  }

  isWeekend(date) {
    const day = new Date(date);

    if (day.getDay() === 6 || day.getDay() === 0 || this.props.type === 'public') return true;

    return false;
  }

  setAsHoliday() {
    if ((!this.props.canUseHolidays && !this.props.isHoliday) || this.props.type === 'public') return;

    this.props.useHoliday(this.props.date, !this.props.isHoliday)
  }

  renderSharedHoliday() {
    const sharedCalendars = this.props.sharedCalendars;
    let childrenDepth = -1;
    let tempDom = [];

    if (this.props.type && sharedCalendars && sharedCalendars.length) {
      return sharedCalendars.map((calendar, i) => {
        if ( calendar.selectedHolidays.indexOf(this.props.date) > -1 ) {
          childrenDepth++;

          const sharedHolidayIndicator = <span key={i} className={`shared-holiday ${UsersColors[calendar.colorIndex + 1]}`}></span>;

          if ( tempDom.length >= 1 ) {
            return React.cloneElement(tempDom[0], {
              children: sharedHolidayIndicator,
              key: i + 1
            });
          } else {
            tempDom.push(sharedHolidayIndicator);
            return sharedHolidayIndicator;
          }
        }
      });
    }
  }

  render() {
    const { date, type, holidayInfo } = this.props;
    const targetDate = date ? new Date(date).getDate() : '';

    return (
      <Fragment>
        <div onClick={this.setAsHoliday} className="day-container">
          <Box component="span" className={`${type ? 'day' : ''} ${type !== 'weekend' && type ? 'c-pointer' : ''} ${this.isWeekend(date) || this.props.isHoliday ? 'weekend-text-color' : ''} ${this.isWeekend(date) ? 'weekend-bgr' : ''} ${this.props.isHoliday ? 'selected-holiday' : ''} ${this.props.type === 'public' ? 'public-holiday' : ''}`}>
            { this.renderSharedHoliday(type) }
            { targetDate }
          </Box>
        </div>
        <div className="holiday-info">
          {holidayInfo}
        </div>
      </Fragment>
    );
  }
}

export default CalendarDay;
