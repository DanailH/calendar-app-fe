import React, { Component } from 'react';
import Donut from '../donutChart/Donut';
import Divider from '@material-ui/core/Divider';
import './style.scss';

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
		return (
			<div className="content-box">
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
						<div className="remaining-number">{this.props.remainingHolidays}
						</div>
					</div>
				</div>
				<Divider/>
				<div className="sub-menu">Taken dates:</div>
			</div>
		)
	}
}

export default DashboardBox;
