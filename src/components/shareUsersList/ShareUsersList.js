import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Divider from '@material-ui/core/Divider';
import { UsersColors } from '../../constants';
import './style.scss';

class ShareUsersList extends Component {
  render() {
    return (
      <div>
        {this.props.sharedUsersData.map((user, i) => {
          return (
            <div key={i} className="shared-list-container">
              <div className="shared-list-wrapper">
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={event => this.props.fetchSharedUsersData(event, i)}
                      value={user._id}
                    />
                  }
                  label={user.firstName + ' ' + user.lastName}
                >
                </FormControlLabel>
                <LocalOfferIcon className={UsersColors[i]} />
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
