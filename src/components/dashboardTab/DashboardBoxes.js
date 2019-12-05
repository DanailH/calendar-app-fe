import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './style.scss';

class DashboardBoxes extends Component {
  render() {

    return (
        <div className="dashboard-mobile-scroll">
          <div className="dashboard-container">
            <div className="dashboard-boxes">

              <div className="holiday-icon beach-icon">
                <BeachAccessIcon />
              </div>
              <div className="holiday-number">
                {this.props.total}
              </div>
              <div className="holiday-header">
                Total days*
						</div>
              <Divider />
              <div className="holiday-subheader">
                *Your total number of holidays
						</div>
            </div>

            <div className="dashboard-boxes">
              <div className="holiday-icon date-icon">
                <DateRangeIcon />
              </div>
              <div className="holiday-number">
                {this.props.remaining}
              </div>
              <div className="holiday-header">
                Taken days*
						</div>
              <Divider />
              <div className="holiday-subheader">
                *The number of taken vacation days
						</div>
            </div>

            <div className="dashboard-boxes">
              <div className="holiday-icon add-icon">
                <AddCircleIcon />
              </div>
              <div className={`holiday-number ${this.props.remainingHolidays <= 0 ? 'error' : ''}`}>
                {this.props.remainingHolidays}
              </div>
              <div className="holiday-header">
                Left days*
						</div>
              <Divider />
              <div className="holiday-subheader">
                *The number of left holidays
							</div>
            </div>
          </div>
        </div>
    )
  }
}

export default DashboardBoxes;
