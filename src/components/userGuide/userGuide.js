import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import './style.scss';

class UserGuide extends Component {
  state = {
  }
  openNavDrawer = () => {
    this.props.openDrawer();
  }

  render() {
    return (
      <Fragment>
        <div className="guide-container absolute-center">
          <div>
            Welcome {this.props.userName} in Foiz - your personal holidays tracking app! You're almost ready to start planning and tracking your vacation,
            but first let's fill in the necessary details
          </div>
          <Button variant="outlined" size="small" onClick={this.openNavDrawer} className="next-btn">
            Next
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default UserGuide;
