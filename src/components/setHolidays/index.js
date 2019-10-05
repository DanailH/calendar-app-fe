import React from 'react';
import TextField from '@material-ui/core/TextField';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './style.scss';

class SetHolidays extends React.Component {
  state = {
    holidaysValue: 0
  }

  constructor() {
    super();
    this.handleHolidaysChange = this.handleHolidaysChange.bind(this);
    this.setHolidaysNumber = this.setHolidaysNumber.bind(this);
  }

  handleHolidaysChange(event) {
    const count = event.target.value - 0;
    event.preventDefault();
    this.setState({
      holidaysValue: count
    });
  }

  setHolidaysNumber(event) {
    if (this.props.count !== this.state.holidaysValue) {
      event.preventDefault();
      this.props.setHolidays(this.state.holidaysValue);
    }
  }

  componentDidUpdate(nextProps) {
    if (this.props.count !== nextProps.count) {
      this.setState({
        holidaysValue: this.props.count
      });
    }
  }

  render() {
    return (
      <TextField
        id="outlined-name"
        label="Holidays per year"
        placeholder="Add holidays"
        name="holidays"
        type="number"
        value={this.state.holidaysValue > 0 ? this.state.holidaysValue : ''}
        onChange={this.handleHolidaysChange}
        onBlur={this.setHolidaysNumber}
        className = "nav-fields"
        margin="normal"
        variant="outlined"
        InputProps={{
          startAdornment: <CalendarTodayIcon />,
          endAdornment: (
            <IconButton onClick={this.setHolidaysNumber} size="small" aria-label="directions">
              <ChevronRightIcon fontSize="inherit" />
            </IconButton>
          )
        }}
      />
    )
  };
}

export default SetHolidays;
