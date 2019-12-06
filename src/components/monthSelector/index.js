import React from 'react';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import './style.scss';

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
      (month, i) => {
        const isHolidayMonth = this.props.holidayMonths.indexOf(i);
        return (
          <Badge
            key={i}
            className="has-holidays"
            badgeContent={<BeachAccessIcon/>}
            invisible={!(isHolidayMonth > -1)}>
            <Tab
              label={month}
              key={i}
              selected={this.state.activeMonthIndex === i}
              onClick={this.activateMonth.bind(this, month)}
            >
            </Tab>
          </Badge>
        )
      }
    );
  }

  render() {
    return (
      <Tabs
        value={this.state.activeMonthIndex}
        variant="scrollable"
        scrollButtons="on"
      >
        {this.renderMonths()}
      </Tabs>
    )
  };
}

export default MonthSelector;
