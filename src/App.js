import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
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

  componentDidMount() {
    fetch(`/users/user?userId=${this.state.userId}`)
      .then(res => res.json())
      .then(res => {
        const userInfo = res;
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
    const publicHolidays = this.state.publicHolidays[this.state.selectedYear] ? this.state.publicHolidays[this.state.selectedYear].map(holiday => holiday.split('T')[0]) : [];
  
    return (
      <div>
        <div className="mobile-overlay">
          <Logo />

          <p>Sorry, our app is currently not available for mobile devices!</p>
        </div>
        
        <div className="main-container">
          {this.isLoading()}

          <Grid container>
            <Grid item xs={2} className="menu-container">
              <Logo />
              <div className="menu-box">
                <SetHolidays count={this.state.holidays} setHolidays={this.setHolidays} />
                <SetCountry country={this.state.country} setCountry={this.setCountry} />
                <Box>
                  <Donut remaining={this.state.numberOfUsedHolidays} total={this.state.holidays} />
                </Box>
                <Box className="text-center">
                  <span className="totals">Remaining days:&nbsp;</span> {remainingHolidays}
                </Box>
              </div>
              
              <div className="feedback-box">
                <Link target="_blank" href='https://www.surveymonkey.com/r/3XKR6YW'>
                  Leave feedback
                </Link>
                <Button variant="outlined" size="small" className="account-menu" disabled>
                  Version Alpha 1.0.0
                </Button>
              </div>
            </Grid>

            <Grid item xs={10}>
              <Grid container className="h-100 position-relative">
                {this.renderUsageOverlay()}

                <Grid item xs={2} className="months-container d-flex">
                  <Grid container justify="center" alignItems="center">
                    <CalendarNav selectYear={this.selectYear} selectMonth={this.selectMonth} />
                  </Grid>
                </Grid>

                <Grid item xs={1} className="curve-container">
                  <div className="curve"></div>
                </Grid>

                <Grid item xs={9} className="main-calendar">
                  <Logout user={this.state.user} />

                  <div className="center-calendar-block w-100">
                    <CalendarMain useHoliday={this.useHoliday} publicHolidays={publicHolidays} listOfUsedHolidays={this.state.listOfUsedHolidays} canUseHolidays={remainingHolidays > 0} activeYear={this.state.selectedYear} activeMonth={this.state.selectedMonth} />
                    <Legend remainingHolidays={remainingHolidays} totalNumberHolidays={this.state.holidays} />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  };
}

export default App;
