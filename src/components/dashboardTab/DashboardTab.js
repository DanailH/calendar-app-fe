import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Donut from '../donutChart/Donut';
import TakenVacationDates from '../box/TakenVacationDates';
import DashboardBoxes from './DashboardBoxes';
import './style.scss';


class DashboardTab extends Component {
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
				<DashboardBoxes
					total={this.props.total}
					remaining={this.props.remaining}
					remainingHolidays={this.props.remainingHolidays}
				/>
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
