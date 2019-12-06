import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import ShareUsersList from '../shareUsersList/ShareUsersList';
import './style.scss';

class AdditionalBox extends Component {
  render() {
    return (
      <div className="content-box">
        <div className="content-header">ADDITIONAL</div>
        <div className="text-box">
          <ShareUsersList sharedUsersData={this.props.sharedUsersData} fetchSharedUsersData={this.props.fetchSharedUsersData} />

          {this.props.sharedUsersData.length === 0 &&
            <div className="missing-user-info">
              Here you will be able to see all of the calendars that are shared with you.
            </div>}

          <div className="feedback-box">
            <Link target="_blank" href='https://www.surveymonkey.com/r/3XKR6YW'>
              Leave feedback
            </Link>
            <Button variant="outlined" size="small" className="account-menu" disabled>
              Version Beta 1.0.0
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default AdditionalBox;
