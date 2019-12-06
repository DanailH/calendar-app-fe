import React from 'react';
import MonthSelector from '../monthSelector';
import './style.scss';

class CalendarNav extends React.Component {
  state = {
    activeMonthIndex: new Date().getMonth()
  };

  constructor() {
    super();

    this.setMonthIndex = this.setMonthIndex.bind(this);
  }

  setMonthIndex(index) {
    this.setState({
      activeMonthIndex: index
    });
  }

  componentDidUpdate(nextProps) {
    if (this.props.selectedMonth !== nextProps.selectedMonth) {
      this.setState({
        activeMonthIndex: this.props.selectedMonth - 1
      });
    }
  }

  render() {
    return (
      <div className="month-selector-container">
        <MonthSelector holidayMonths={this.props.holidayMonths} selectMonth={this.props.selectMonth} setMonthIndex={this.setMonthIndex} activeMonthIndex={this.state.activeMonthIndex} />
      </div>
    )
  };
}

export default CalendarNav;
