import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CalendarNav from './components/calendarNav';
import CalendarMain from './components/calendarMain';
import SetHolidays from './components/setHolidays';
import SetCountry from './components/setCountry';
import Legend from './components/Legend/Legend';
import Logo from './components/Logo/Logo';
import Link from '@material-ui/core/Link';
import Logout from './components/Logout/Logout';
import Donut from './components/donutChart/Donut'
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
      userId: this.state.userId,
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

  componentDidMount() {
    fetch(`${BaseUrl}/users/user?userId=${this.state.userId}`)
      .then(res => res.json())
      .then(res => {
        const userInfo = res;
        fetch(`${BaseUrl}/holiday/holidays?userId=${this.state.userId}`)
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
                user: userInfo
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

  renderUsageOverlay() {
    if (!this.state.country || !this.state.holidays) {
      return (<div className="usage-overlay">
        <p className="absolute-center">{`Hi ${this.state.user && this.state.user.firstName} to use the app please fill your holidays and select your country!`}</p>
      </div>)
    }
  }

  render() {
    const remainingHolidays = this.state.holidays - this.state.numberOfUsedHolidays;
    const publicHolidays = this.state.publicHolidays[this.state.selectedYear] ? this.state.publicHolidays[this.state.selectedYear].map(holiday => ({
      date: holiday.date.split('T')[0],
      info: holiday.info
    })) : [];

    return (
      <div className="d-flex">
        {this.isLoading()}
        {!this.state.isLoading && this.renderUsageOverlay()}

        <AppBar position="static" className="menu-container">
          <Toolbar className="toolbar">
            <Logo />
            <div className="menu-box">
              <SetHolidays count={this.state.holidays} setHolidays={this.setHolidays} />
              <SetCountry country={this.state.country} setCountry={this.setCountry} />
            </div>
          </Toolbar>
        </AppBar>

        <div className="main-container">
          <Logout user={this.state.user} />

          <div className="main-calendar">

            <div className="calendar-container position-relative">
              <div className="absolute-center w-100">
                <CalendarNav className="d-flex" selectYear={this.selectYear} selectMonth={this.selectMonth} />
                <CalendarMain useHoliday={this.useHoliday} publicHolidays={publicHolidays} listOfUsedHolidays={this.state.listOfUsedHolidays} canUseHolidays={remainingHolidays > 0} activeYear={this.state.selectedYear} activeMonth={this.state.selectedMonth} />
              </div>
            </div>

            <div className="content-container">
              <div className="content-box">
                <div className="content-header">DASHBOARD</div>
                <div className="text-box">
                  <Box>
                    <Donut remaining={this.state.numberOfUsedHolidays} total={this.state.holidays} />
                  </Box>
                  <Box className="text-center">
                    <span className="totals">Remaining days:&nbsp;</span> {remainingHolidays}
                  </Box>
                </div>
              </div>

              <div className="content-box">
                <div className="content-header">ADDITIONAL</div>
                <div className="text-box">
                  <div className="feedback-box">
                    <Link target="_blank" href='https://www.surveymonkey.com/r/3XKR6YW'>
                      Leave feedback
                  </Link>
                    <Button variant="outlined" size="small" className="account-menu" disabled>
                      Version Alpha 1.0.0
                  </Button>
                  </div>
                  <Legend remainingHolidays={remainingHolidays} totalNumberHolidays={this.state.holidays} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default App;
