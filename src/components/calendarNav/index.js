import React from 'react';
import YearSelector from '../yearSelector';
import MonthSelector from '../monthSelector';
import './style.scss';

class CalendarNav extends React.Component {
  constructor() {
    super();

    this.resetMonth = this.resetMonth.bind(this);
    this.setMonthIndex = this.setMonthIndex.bind(this);

    this.state = {
      activeMonthIndex: new Date().getMonth() - 1
    };
  }

  resetMonth() {
    this.setState({
      activeMonthIndex: 0
    });
  }

  setMonthIndex(index) {
    this.setState({
      activeMonthIndex: index
    });
  }

  render() {
    return (
      <div className="calendar-nav-container">
        <YearSelector resetSelectedMonth={this.resetMonth} selectYear={this.props.selectYear} />
        <MonthSelector holidayMonths={this.props.holidayMonths} selectMonth={this.props.selectMonth} setMonthIndex={this.setMonthIndex} activeMonthIndex={this.state.activeMonthIndex} />
      </div>
    )
  };
}

export default CalendarNav;
