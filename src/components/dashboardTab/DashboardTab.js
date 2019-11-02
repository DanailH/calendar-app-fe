import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import Donut from '../donutChart/Donut';
import './style.scss';

class DashboardTab extends Component {
	state = {
	}

	render() {

		return (
			<div className="dashboard-tab-container">
				<Typography variant="h5">
					Holiday Overview
				</Typography>

				<div className="dashboard-container">
					<div className="dashboard-boxes">
						<div className="holiday-icon">
							<BeachAccessIcon />
						</div>
						<div className="holiday-number">
							{this.props.total}
						</div>
						<div className="holiday-header">
							Total days
						</div>
						<Divider />
						<div className="holiday-subheader">
						Your total number of holidays
						</div>
					</div>

					<div className="dashboard-boxes">
						<div className="holiday-icon">
							<DateRangeIcon />
						</div>
						<div className="holiday-number">
							{this.props.remaining}
						</div>
						<div className="holiday-header">
							Taken days
						</div>
						<Divider />
						<div className="holiday-subheader">
						The number of taken vacation days
						</div>
					</div>

					<div className="dashboard-boxes">
						<div className="holiday-icon">
							<AddCircleIcon />
						</div>
						<div className="holiday-number">
							{this.props.remainingHolidays}
						</div>
						<div className="holiday-header">
							Left days
						</div>
						<Divider />
						<div className="holiday-subheader">
						The number of left holidays
						</div>
					</div>
				</div>

				<div className="dashboard-main-container">
					<Donut remaining={this.props.remaining} total={this.props.total} />
				</div>
			</div>
		)
	}
}

export default DashboardTab;
