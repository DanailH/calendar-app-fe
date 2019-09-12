import React from 'react';
import { Redirect } from 'react-router-dom';
import CalendarNav from './components/calendarNav';
import CalendarMain from './components/calendarMain';
import SetHolidays from './components/setHolidays';
import SetCountry from './components/setCountry';

class App extends React.Component {
  state = {
    selectedYear: new Date().getFullYear(),
    selectedMonth: 1,
    holidays: 0,
    country: '',
    numberOfUsedHolidays: 0,
    listOfUsedHolidays: [],
    publicHolidays: [],
    isAuth: true,
    userId: localStorage.getItem('_id')
  }

  constructor() {
    super();

    this.selectYear = this.selectYear.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.setHolidays = this.setHolidays.bind(this);
    this.useHoliday = this.useHoliday.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.setCountry = this.setCountry.bind(this);
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
    const data = {
      userId: this.state.userId,
      country: this.state.country,
      holidaysCount: numberOfHolidays,
      selectedHolidays: this.state.listOfUsedHolidays
    };

    fetch('/holiday/holidays', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => this.setState({
      holidays: res.holidaysCount
    }))
    .catch(error => console.error('Error:', error));
  }

  setCountry(country) {
    const data = {
      userId: this.state.userId,
      country: country,
      holidaysCount: this.state.holidays,
      selectedHolidays: this.state.listOfUsedHolidays
    };

    fetch('/holiday/holidays', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(
      fetch(`/holiday/public?countryCode=${country}`)
        .then(res => res.json())
        .then(res => this.setState({
          country: res.countryCode,
          publicHolidays: res.publicHolidays
        }))
        .catch(error => console.error('Error:', error))
    )
    .catch(error => console.error('Error:', error));

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

    const data = {
      userId: this.state.userId,
      country: this.state.country,
      holidaysCount: this.state.holidays,
      selectedHolidays: holidaysArr
    };

    fetch('/holiday/holidays', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => this.setState({
        listOfUsedHolidays: holidaysArr,
        numberOfUsedHolidays: used ? this.state.numberOfUsedHolidays + 1 : this.state.numberOfUsedHolidays - 1
      }))
      .catch(error => console.error('Error:', error));
  }

  handleLogOut() {
    fetch('/auth/logout')
    .then(localStorage.removeItem('_id'))
    .then(this.setState({isAuth: false}))
    .catch(error => console.error('Error:', error));
  }

  componentDidMount() {
    fetch(`/holiday/holidays?userId=${this.state.userId}`)
      .then(res => res.json())
      .then(res => {
        const userData = res;

        fetch(`/holiday/public?countryCode=${res.country}`)
          .then(res => res.json())
          .then(res => this.setState({
            country: res.countryCode,
            publicHolidays: res.publicHolidays,
            holidays: userData.holidaysCount,
            listOfUsedHolidays: userData.selectedHolidays,
            numberOfUsedHolidays: userData.selectedHolidays.length
          }))
          .catch(error => console.error('Error:', error))
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    console.log(this.state)

    const remainigHolidays = this.state.holidays - this.state.numberOfUsedHolidays;

    if (!this.state.isAuth) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <button type="button" className="btn btn-warning" onClick={this.handleLogOut}>Log out</button>
        <br/><br/>
        <div className="d-flex">
          <CalendarNav selectYear={this.selectYear} selectMonth={this.selectMonth} />

          <div className="w-100 pt-2">
            <div className="d-flex align-self-center">
              <div className="w-20 flex-column">
                <SetHolidays count={this.state.holidays} setHolidays={this.setHolidays} />
                <br />
                <SetCountry country={this.state.country} setCountry={this.setCountry} />
              </div>
              <div className="w-50 ml-auto">
                {`Remaining days: ${remainigHolidays}`}
                <br />
                {`Total number of holidays: ${this.state.holidays}`}
              </div>
            </div>
            <br />
            <CalendarMain useHoliday={this.useHoliday} publicHolidays={this.state.publicHolidays} listOfUsedHolidays={this.state.listOfUsedHolidays} canUseHolidays={!!remainigHolidays} activeYear={this.state.selectedYear} activeMonth={this.state.selectedMonth} />
          </div>
        </div>
      </div>
    )
  };
}

export default App;
