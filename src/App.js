import React from 'react';
import CalendarNav from './components/calendarNav';
import CalendarMain from './components/calendarMain';
import SetHolidays from './components/setHolidays';

class App extends React.Component {
  state = {
    selectedYear: new Date().getFullYear(),
    selectedMonth: 1,
    holidays: 0,
    numberOfUsedHolidays: 0,
    listOfUsedHolidays: []
  }

  constructor() {
    super();

    this.selectYear = this.selectYear.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.setHolidays = this.setHolidays.bind(this);
    this.useHoliday = this.useHoliday.bind(this);
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

  setHolidays(numberOfHolidays) {
    this.setState({
      holidays: numberOfHolidays
    });
  }

  useHoliday(holiday, used) {
    let holidaysArr = this.state.listOfUsedHolidays;

    if (used) {
      holidaysArr.push(holiday);
    } else {
      let index = holidaysArr.indexOf(holiday);

      if (index > -1) {
        holidaysArr.splice(index, 1);
      }
    }

    this.setState({
      listOfUsedHolidays: holidaysArr,
      numberOfUsedHolidays: used ? this.state.numberOfUsedHolidays + 1 : this.state.numberOfUsedHolidays - 1
    })
  }

  render() {
    const remainigHolidays = this.state.holidays - this.state.numberOfUsedHolidays;

    return (
      <div className="d-flex">
        <CalendarNav selectYear={this.selectYear} selectMonth={this.selectMonth} />

        <div className="w-100 pt-2">
          <div className="d-flex align-items-center align-self-center">
            <div className="w-20">
              <SetHolidays setHolidays={this.setHolidays} />
            </div>
            <div className="w-50 ml-auto">
              {`Remaining days: ${remainigHolidays}`}
              <br />
              {`Total number of holidays: ${this.state.holidays}`}
            </div>
          </div>
          <br />
          <CalendarMain useHoliday={this.useHoliday} listOfUsedHolidays={this.state.listOfUsedHolidays} canUseHolidays={!!remainigHolidays} activeYear={this.state.selectedYear} activeMonth={this.state.selectedMonth} />
        </div>
      </div>
    )
  };
}

export default App;
