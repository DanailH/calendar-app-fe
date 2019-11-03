import React from 'react';
import TextField from '@material-ui/core/TextField';
import UpdateIcon from '@material-ui/icons/Update';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './style.scss';

class SetMaxHolidaysTransfer extends React.Component {
  state = {
    maxHolidaysTransferValue: 0
  }

  constructor() {
    super();
    this.handleMaxHolidaysTransferChange = this.handleMaxHolidaysTransferChange.bind(this);
    this.setMaxHolidays = this.setMaxHolidays.bind(this);
  }

  handleMaxHolidaysTransferChange(event) {
    const count = event.target.value - 0;
    event.preventDefault();
    this.setState({
      maxHolidaysTransferValue: count
    });
  }

  setMaxHolidays(event) {
    if (this.props.count !== this.state.maxHolidaysTransferValue) {
      event.preventDefault();
      this.props.setMaxHolidaysTransfer(this.state.maxHolidaysTransferValue);
    }
  }

  componentDidMount() {
    this.setState({
      maxHolidaysTransferValue: this.props.count
    });
  }

  componentDidUpdate(nextProps) {
    if (this.props.count !== nextProps.count) {
      this.setState({
        maxHolidaysTransferValue: this.props.count
      });
    }
  }

  render() {
    return (
      <TextField
        id="outlined-name"
        label="Maximum number of holidays to transfer"
        placeholder="Add number"
        name="maxTransferHolidays"
        type="number"
        value={this.state.maxHolidaysTransferValue > 0 ? this.state.maxHolidaysTransferValue : ''}
        onChange={this.handleMaxHolidaysTransferChange}
        onBlur={this.setMaxHolidays}
        className = "nav-fields"
        margin="normal"
        variant="outlined"
        InputProps={{
          startAdornment: <UpdateIcon />,
          endAdornment: (
            <IconButton onClick={this.setMaxHolidays} size="small" aria-label="directions">
              <ChevronRightIcon fontSize="inherit" />
            </IconButton>
          )
        }}
      />
    )
  };
}

export default SetMaxHolidaysTransfer;
