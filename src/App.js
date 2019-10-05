import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CalendarNav from './components/calendarNav';
import CalendarMain from './components/calendarMain';
import SetHolidays from './components/setHolidays';
import SetCountry from './components/setCountry';
import Legend from './components/Legend/Legend';
import Logo from './components/Logo/Logo';
import Logout from './components/Logout/Logout.jsx';
import Donut from './components/donutChart/Donut'
import './App.scss';
import './styles/base.scss';

class App extends React.Component {
  state = {
    selectedYear: new Date().getFullYear(),
    selectedMonth: new Date().getMonth(),
    holidays: 0,
    country: '',
    numberOfUsedHolidays: 0,
    listOfUsedHolidays: [],
    publicHolidays: [],
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
    console.log(country)
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
          publicHolidays: res.publicHolidays.map(holiday => holiday.split('T')[0])
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
    fetch(`/holiday/holidays?userId=${this.state.userId}`)
      .then(res => res.json())
      .then(res => {
        const userData = res;
        console.log(userData)
        fetch(`/holiday/public?countryCode=${res.country}`)
          .then(res => res.json())
          .then(res => this.setState({
            country: res.countryCode,
            publicHolidays: res.publicHolidays.map(holiday => holiday.split('T')[0]),
            holidays: userData.holidaysCount,
            listOfUsedHolidays: userData.selectedHolidays,
            numberOfUsedHolidays: userData.selectedHolidays.length
          }))
          .catch(error => {
            this.setState({
              holidays: userData.holidaysCount,
              listOfUsedHolidays: userData.selectedHolidays,
              numberOfUsedHolidays: userData.selectedHolidays.length
            })

            console.error('Error:', error)
          })
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    const remainingHolidays = this.state.holidays - this.state.numberOfUsedHolidays;

    return (
      <div className="main-container">
        <Grid container>
          <Grid item xs={2} className="menu-container">
            <Logo />
            <div className="menu-box">
              <SetHolidays count={this.state.holidays} setHolidays={this.setHolidays} />
              <SetCountry country={this.state.country} setCountry={this.setCountry} />
              <Box>
                <Donut remaining={this.state.numberOfUsedHolidays} total={this.state.holidays} />
                <span className="totals">Remaining days:&nbsp;</span> {remainingHolidays}
              </Box>
            </div>
          </Grid>

          <Grid item xs={2} className="months-container d-flex">
            <Grid container justify="center" alignItems="center">
              <CalendarNav selectYear={this.selectYear} selectMonth={this.selectMonth} />
            </Grid>
          </Grid>

          <Grid item xs={1} className="curve-container">
            <div className="curve"></div>
          </Grid>

          <Grid item xs={7} className="main-calendar">
            <Logout />

            <div className="center-block w-100">
              <CalendarMain useHoliday={this.useHoliday} publicHolidays={this.state.publicHolidays} listOfUsedHolidays={this.state.listOfUsedHolidays} canUseHolidays={remainingHolidays > 0} activeYear={this.state.selectedYear} activeMonth={this.state.selectedMonth} />
              <Legend remainingHolidays={remainingHolidays} totalNumberHolidays={this.state.holidays} />
            </div>
          </Grid>
        </Grid>
      </div>
    )
  };
}

export default App;
