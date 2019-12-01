import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Donut from '../donutChart/Donut';
import TakenVacationDates from '../box/TakenVacationDates';
import './style.scss';

class DashboardTab extends Component {
	state = {
	}

	render() {

		return (
			<div className="dashboard-tab-container">
				<div>
					<Link to="/" className="back-btn">
						<ArrowBackIosIcon /><span>Back to home</span>
					</Link>
				</div>
				<Typography variant="h5">
					Holiday Dashboard
        </Typography>
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
				<div className="dashboard-main-container">
					<div className="donut-container">
						<Donut remaining={this.props.remaining} total={this.props.total} />
					</div>
					<div className="taken-days-container">
						<TakenVacationDates holidaysTaken={this.props.holidaysTaken} />
					</div>
				</div>
			</div>
		)
	}
}

export default DashboardTab;
