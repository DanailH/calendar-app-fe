import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PeopleIcon from '@material-ui/icons/People';
import ErrorIcon from '@material-ui/icons/Error';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import UserService from '../../services/account.service';
import './style.scss';

class ShareCalendar extends Component {
  state = {
    isAuth: true,
    anchorEl: null,
    sharedEmail: '',
    sharedEmailSuccess: false,
    sharedEmailFailed: false,
    closePopover: false
  }

  handleEmailChange = (event) => {
    const email = event.target.value;
    event.preventDefault();
    this.setState({
      sharedEmail: email,
      sharedEmailFailed: false,
    });
  }

  sendEmail = (e) => {
    e.preventDefault();

    UserService.shareCalendar(this.state.sharedEmail)
      .then(res => {
        if (res.status === 404) {
          this.setState({
            sharedEmailFailed: true
          })
        } else {
          this.setState({
            sharedEmailSuccess: true,
            sharedEmailFailed: false,
            sharedEmail: '',
          })
        }
      })
      .catch(err => {
        this.setState({ sharedEmailFailed: true })
      })
  }

  toggleShareMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      closePopover: false
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
      sharedEmailSuccess: false,
      closePopover: true
    });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" size="small" className="share-btn" onClick={this.toggleShareMenu}>
          <PeopleIcon />
          Share
        </Button>
        <Popover
          open={Boolean(this.state.anchorEl)}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div className="send-box">
            <CloseIcon className="close-btn" onClick={this.handleClose}/>
            {((!this.state.sharedEmailSuccess && !this.state.closePopover) || this.state.sharedEmail !== '') ? (
              <Fragment>
                <form onSubmit={this.sendEmail}>
                  <div className="d-flex share-box">
                    <span className="to-text">To:</span>
                    <TextField
                      id="standard-name"
                      label="Enter email"
                      type="email"
                      value={this.state.sharedEmail}
                      onChange={this.handleEmailChange}
                    />
                  </div>
                  <Divider />
                  <div className="to-text">
                    Now you can share your calendar with someone, with just one click.
                    Fill the email of the person that you would like to share with and start planning
                    and tracking together your yearly vacation days.</div>
                  <div className="text-right">
                    <Button variant="outlined" size="small" type="submit" className="send-btn">
                      Send
                    </Button>
                  </div>
                </form>
                {(this.state.sharedEmailFailed && this.state.sharedEmail !== '') && (
                  <div className="error-box">
                    <Divider />
                    <div className="d-flex msg-box">
                      <ErrorIcon color="error" />
                      <span>Something went wrong! Please try again</span>
                    </div>
                  </div>
                )}
              </Fragment>
            )
              : (
                <div className="d-flex msg-box">
                  <CheckIcon />
                  <span>The invitation has been sent successfully and it's on its way.</span>
                </div>
              )}
          </div>
        </Popover>
      </div>
    )
  }
}

export default ShareCalendar;