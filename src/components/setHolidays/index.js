import React from 'react';
import TextField from '@material-ui/core/TextField';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
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
    console.log(this.state)
    return (
      <form onBlur={this.setHolidaysNumber}>
        <TextField
          id="outlined-name"
          label="Holidays per year"
          placeholder="Add the number of your holidays"
          name="holidays"
          type="number"
          value={this.state.holidaysValue}
          onChange={this.handleHolidaysChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <CalendarTodayIcon/>,
          }}
        />
      </form>
    )
  };
}

export default SetHolidays;
