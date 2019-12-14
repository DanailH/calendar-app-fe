import React, { Component, Fragment } from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Divider from '@material-ui/core/Divider';
import './style.scss';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class TakenVacationDates extends Component {
  render() {
    const groupedHolidays = this.props.holidaysTaken.sort().reduce((obj, val) => {
      const date = new Date(val);

      if (date.getFullYear() in obj) {
        const entry = obj[date.getFullYear()];
        const entryLength = entry.length;
        if (entry[entryLength - 1].month === date.getMonth()) {
          entry[entryLength - 1].holidays.push(val);
          return obj;
        }

        entry.push({
          month: date.getMonth(),
          holidays: [val]
        })

        return obj;
      }

      obj[date.getFullYear()] = [{
        month: date.getMonth(),
        holidays: [val]
      }];

      return obj;
    }, {});

    return (
      <Fragment>
        {Object.keys(groupedHolidays).map((key, i) => {
          return (
            <div key={i}>
              <div className="sub-menu">
                <div className="taken-icon date-icon">
                  <DateRangeIcon />
                </div>
                <div key={i} className="sub-menu-header">
                  Days taken from {key}
                </div>
              </div>
              {
                groupedHolidays[key].map((el, i) => {
                  return (
                    <div key={i} className="dates-container">
                      <div key={i} className="months-box">{monthNames[el.month]}</div>
                      <div className="dates-wrapper">
                        <div className="d-flex date-box">
                          {
                            el.holidays.map((el, i) => (
                              <span key={i} className="date-el">{new Date(el).getDate()}</span>
                            ))
                          }
                        </div>
                        <Divider />
                      </div>
                    </div>
                  );
                })
              }
            </div>
          );
        })
      }
        {(Object.keys(groupedHolidays).length === 0) && <div className="missing-user-info">Oh! You haven't selected any vacation days yet.
          Go to the settings tab in the Navigation and fill in your total number of yearly vacation days so you can start planning and tracking.</div>}
      </Fragment>
    )
  }
}

export default TakenVacationDates;
