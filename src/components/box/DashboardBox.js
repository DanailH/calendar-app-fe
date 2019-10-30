import React, { Component } from 'react';
import Donut from '../donutChart/Donut';
import Divider from '@material-ui/core/Divider';
import './style.scss';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

class DashboardBox extends Component {
  state = {
    isDrawerOpen: false
  }

  toggleDrawer = () => {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen,
    });
  };

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

    console.log(groupedHolidays)

    return (
      <div className="content-box dashboard-box">
        <div className="d-flex justify-space ">
          <div className="content-header">DASHBOARD</div>
          <span className="more-text">More ></span>
        </div>
        <div className="text-box d-flex">
          <div className="flex-2">
            <Donut remaining={this.props.remaining} total={this.props.total} />
          </div>
          <div className="text-center flex-1">
            <span className="remaining-text">Remaining days:&nbsp;</span>
            <div className={`remaining-number ${this.props.remainingHolidays <= 0 ? 'error' : ''}`}>
              {this.props.remainingHolidays}
            </div>
          </div>
        </div>
        <Divider/>
        <div className="sub-menu">Taken dates:</div>

        {
          Object.keys(groupedHolidays).map((key, i) => {
            return (
              <div>
                <div key={i}>{key}:</div>
                {
                  groupedHolidays[key].map((el, i) => {
                    return (
                      <div key={i}>
                        <div key={i}>{monthNames[el.month]}:</div>
                        <ul key={i}>
                        {
                          el.holidays.map((el, i) => (<li key={i}>{new Date(el).toLocaleString().split(',')[0]}</li>))
                        }
                        </ul>
                      </div>
                    );
                  })
                }
              </div>
            );
          })
        }

      </div>
    )
  }
}

export default DashboardBox;
