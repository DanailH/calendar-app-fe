import React from 'react';

class SetHolidays extends React.Component {
  state = {
    holidaysValue: ''
  }

  constructor() {
    super();

    this.handleHolidaysChange = this.handleHolidaysChange.bind(this);
    this.setHolidaysNumber = this.setHolidaysNumber.bind(this);
  }

  handleHolidaysChange(event) {
    const count = event.target.value - 0;

    this.setState({
      holidaysValue: count
    });
  }

  setHolidaysNumber(event) {
    event.preventDefault();

    this.props.setHolidays(this.state.holidaysValue);
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
      <form onSubmit={this.setHolidaysNumber} className="input-group">
        <input type="number" name="holidays" value={this.state.holidaysValue} onChange={this.handleHolidaysChange} placeholder="Holidays per year" />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary" disabled={this.state.holidaysValue ? false : true}>Set</button>
        </div>
      </form>
    )
  };
}

export default SetHolidays;
