import React from 'react';
import CalendarNav from './components/calendarNav';
import CalendarMain from './components/calendarMain';

class App extends React.Component {
  state = {
    selectedYear: new Date().getFullYear(),
    selectedMonth: 1
  }

  constructor() {
    super();

    this.selectYear = this.selectYear.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
  }

  selectYear(year) {
    this.setState({
      selectedYear: year,
      selectedMonth: 1
    });
  }

  selectMonth(month) {
    this.setState({
      selectedMonth: month
    });
  }

  render() {
    return (
      <div className="d-flex">
        <CalendarNav selectYear={this.selectYear} selectMonth={this.selectMonth} />

        <CalendarMain activeYear={this.state.selectedYear} activeMonth={this.state.selectedMonth} />
      </div>
    )
  };
}

export default App;
