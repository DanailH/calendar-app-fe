import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CalendarNav from './components/calendarNav';
import CalendarMain from './components/calendarMain';
import Account from './components/account/Account';
import Navigation from './components/navigation/Navigation';
import DashboardBox from './components/box/DashboardBox';
import AdditionalBox from './components/box/AdditionalBox';
import './App.scss';
import './styles/base.scss';
import { BaseUrl } from './config';

class App extends React.Component {
  state = {
    userId: localStorage.getItem('_id'),
    selectedYear: new Date().getFullYear(),
    selectedMonth: new Date().getMonth(),
    holidays: 0,
    country: '',
    numberOfUsedHolidays: 0,
    listOfUsedHolidays: [],
    publicHolidays: {},
    isLoading: true
  }

  constructor() {
    super();

    this.selectYear = this.selectYear.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.setHolidays = this.setHolidays.bind(this);
    this.useHoliday = this.useHoliday.bind(this);
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
      country: this.state.country,
      holidaysCount: numberOfHolidays,
      selectedHolidays: this.state.listOfUsedHolidays
    };

    fetch(`${BaseUrl}/holiday/holidays`, {
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
    fetch(`${BaseUrl}/holiday/holidays`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(
      fetch(`${BaseUrl}/holiday/public?countryCode=${country}`)
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

    fetch(`${BaseUrl}/holiday/holidays`, {
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

  // TODO: Refactor
  componentWillMount() {
    fetch(`${BaseUrl}/auth/isAuth`)
      .then((res) => {
        if(res.status === 401) {
          localStorage.removeItem('_id');
          window.location.href = '/login';
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  componentDidMount() {
    fetch(`${BaseUrl}/users/user`)
      .then(res => res.json())
      .then(res => {
        const userInfo = res;
        fetch(`${BaseUrl}/holiday/holidays`)
          .then(res => res.json())
          .then(res => {
            const userData = res;
            fetch(`${BaseUrl}/holiday/public?countryCode=${res.country}`)
              .then(res => res.json())
              .then(res => this.setState({
                country: res.countryCode,
                publicHolidays: res.publicHolidays,
                holidays: userData.holidaysCount,
                listOfUsedHolidays: userData.selectedHolidays,
                numberOfUsedHolidays: userData.selectedHolidays.length,
                isLoading: false,
                user: userInfo,
                drawerIsOpen: false
              }))
              .catch(error => {
                this.setState({
                  holidays: userData.holidaysCount,
                  listOfUsedHolidays: userData.selectedHolidays,
                  numberOfUsedHolidays: userData.selectedHolidays.length,
                  isLoading: false,
                  user: userInfo
                })

                console.error('Error:', error)
              })
          })
          .catch(error => console.error('Error:', error));
      })
      .catch(error => console.error('Error:', error));
  }

  isLoading() {
    if (this.state.isLoading) {
      return (
        <div className="loader-overlay">
          <div className="absolute-center">
            <CircularProgress size={100} thickness={3} />
          </div>
        </div>
      )
    }
  }

  render() {
    const dates = this.state.listOfUsedHolidays.map(date => new Date(date).toLocaleDateString()).sort()
    const months = this.state.listOfUsedHolidays.map(date => new Date(date).getMonth()).filter((x, i, a) => a.indexOf(x) === i)

    console.log(months)
    const remainingHolidays = this.state.holidays - this.state.numberOfUsedHolidays;
    const publicHolidays = this.state.publicHolidays[this.state.selectedYear] ? this.state.publicHolidays[this.state.selectedYear].map(holiday => ({
      date: holiday.date.split('T')[0],
      info: holiday.info
    })) : [];

    return (
      <div className="d-flex">
        {this.isLoading()}
        <Navigation
          count={this.state.holidays}
          country={this.state.country}
          setHoliday={this.setHolidays}
          setCountry={this.setCountry}
        />

        <div className="main-container">
          <Account user={this.state.user} />

          <div className="main-calendar">

            <div className="calendar-container position-relative">
              <div className="absolute-center calendar-wrapper w-100">
                <CalendarNav className="d-flex" selectYear={this.selectYear} selectMonth={this.selectMonth} holidayMonths={months} />
                <CalendarMain useHoliday={this.useHoliday} publicHolidays={publicHolidays} listOfUsedHolidays={this.state.listOfUsedHolidays} canUseHolidays={remainingHolidays > 0} activeYear={this.state.selectedYear} activeMonth={this.state.selectedMonth} />
              </div>
            </div>

            <div className="content-container">
              <DashboardBox
                remaining={this.state.numberOfUsedHolidays} 
                total={this.state.holidays}
                remainingHolidays={remainingHolidays}
              />
              <AdditionalBox/>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default App;
