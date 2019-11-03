import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Divider from '@material-ui/core/Divider';
import { BaseUrl } from '../../config';
import './style.scss';

const userColors = [
  "color-1",
  "color-2",
  "color-3",
  "color-4",
  "color-5",
  "color-6",
  "color-7",
  "color-8",
  "color-9",
  "color-10",
]
class ShareUsersList extends Component {
  state = {
  }

  handleChange = event => {
    // this.setState({ checked: event.target.checked })
    const id = event.target.value

    fetch(`${BaseUrl}/holiday/holidays?userId=${id}`)
      .then(res => res.json())
      .then(console.log)

  }

  render() {
    console.log(this.props.sharedUsersData)
    return (
      <div>
        {this.props.sharedUsersData.map((user, i) => {
          console.log(user)
          return (
            <div className="shared-list-container">
            <div className="shared-list-wrapper">
              <FormControlLabel
                control={
                  <Checkbox                    
                    // checked={state.checkedB}
                    onChange={this.handleChange}
                    value={user._id}
                  />
                }
                label={user.firstName + ' ' + user.lastName}
              >
              </FormControlLabel>
              <LocalOfferIcon className={userColors[i]} />
            </div>
              <Divider/>
            </div>
          )
        }
        )}
      </div>
    )
  }
}

export default ShareUsersList;
