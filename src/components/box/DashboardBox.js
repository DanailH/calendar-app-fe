import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Donut from '../donutChart/Donut';
import './style.scss';

const country = [
  {
    code: 'bg',
    country: 'Bulgaria'
  },
  {
    code: 'nl',
    country: 'Netherlands'
  },
]
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
    const selectedCountry = country.filter(el => el.code === this.props.selectedCountry)[0]
    return (
      <div className="content-box dashboard-box">
        <div className="d-flex justify-space ">
          <div className="content-header">DASHBOARD</div>
          <Link to="/dashboard" className="back-btn">
            <span className="more-text">More ></span>
          </Link>
        </div>

        <Donut remaining={this.props.remaining} total={this.props.total} />

        <Divider />

        <div className="text-center">
          <LocationOnIcon />
          <span>{selectedCountry && selectedCountry.country}</span>
        </div>
        <div className="text-center">
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
    )
  }
}

export default DashboardBox;
