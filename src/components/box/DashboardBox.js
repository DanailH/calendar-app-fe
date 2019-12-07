import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
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
        <div className="d-flex justify-space align-baseline">
          <div className="content-header">DASHBOARD</div>
          <Link to="/dashboard" className="back-btn">
            <span className="more-text">More ></span>
          </Link>
        </div>

        <Donut remaining={this.props.remaining} total={this.props.total} />

        <Divider />

        <div className="dashboard-mini-info">

          <div className="dashboard-mini-info-box">
            <div className={`holiday-number dashboard-info-container ${this.props.remainingHolidays <= 0 ? 'error' : ''}`}>
              <div className="icon-container"><EventIcon/></div>
              <div>{this.props.remainingHolidays}
                <div className="holiday-header">
                  Left days
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-mini-info-box dashboard-info-container">
            <div className="icon-container"><LocationOnIcon /></div>
            <span className="country-info">{selectedCountry && selectedCountry.country}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardBox;
