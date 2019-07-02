import React from 'react';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class MonthSelector extends React.Component {
  constructor() {
    super();

    this.state = {
      currentMonth: months[0],
      activeMonthIndex: 0
    };
  }

  componentDidMount() {
    this.setState({
      currentMonth: months[this.props.activeMonthIndex],
      activeMonthIndex: this.props.activeMonthIndex
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (state.activeMonthIndex !== props.activeMonthIndex) {
      return {
        currentMonth: months[props.activeMonthIndex],
        activeMonthIndex: props.activeMonthIndex
      };
    }

    return null;
  }

  isMonthActive(targetMonth) {
    return this.state.currentMonth === targetMonth;
  }

  activateMonth(month) {
    const newMonthIndex = months.findIndex(el => el === month);

    this.setState({
      currentMonth: month,
      activeMonthIndex: newMonthIndex
    })

    this.props.setMonthIndex(newMonthIndex);
    this.props.selectMonth(newMonthIndex + 1);
  }

  renderMonths() {
    return months.map(
      month => (
        <li
          key={month}
          onClick={this.activateMonth.bind(this, month)}
          className={`c-pointer list-group-item list-group-item-action ${this.isMonthActive(month) ? 'active' : ''}`}
        >
          { month }
        </li>
      )
    );
  }

  render() {
    return (
      <ul className="list-group list-group-flush text-center">
        { this.renderMonths() }
      </ul>
    )
  };
}

export default MonthSelector;
