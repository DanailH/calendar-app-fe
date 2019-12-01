import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
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
          <Badge color="secondary" className="has-holidays" variant="dot" invisible={!(isHolidayMonth > -1)}>
            <ListItem button
              key={i}
              selected={this.state.activeMonthIndex === i}
              onClick={this.activateMonth.bind(this, month)}
            >
              <ListItemText>
                {month}
              </ListItemText>
            </ListItem>
          </Badge>
        )
      }
    );
  }

  render() {
    return (
      <div>
        <List component="nav" className="months">
          { this.renderMonths() }
        </List>
      </div>
    )
  };
}

export default MonthSelector;
