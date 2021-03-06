import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import CalendarNav from './components/calendarNav';
import CalendarMain from './components/calendarMain';
import Account from './components/account/Account';
import Navigation from './components/navigation/Navigation';
import DashboardBox from './components/box/DashboardBox';
import AdditionalBox from './components/box/AdditionalBox';
import DashboardTab from './components/dashboardTab/DashboardTab';
import YearSelector from './components/yearSelector/index';
import './App.scss';
import './styles/base.scss';
import { BaseUrl } from './config';

class App extends React.Component {
  state = {
    selectedYear: new Date().getFullYear(),
    selectedMonth: new Date().getMonth() + 1,
    holidays: 0,
    maxHolidaysTransfer: 0,
    numberOfTransferedDays: 0,
    country: '',
    numberOfUsedHolidays: 0,
    listOfUsedHolidays: [],
    publicHolidays: {},
    isLoading: true,
    sharedUsersData: [],
    sharedUsersHolidays: [],
  }

  constructor() {
    super();

    this.selectYear = this.selectYear.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.setMaxHolidaysTransfer = this.setMaxHolidaysTransfer.bind(this);
    this.setHolidays = this.setHolidays.bind(this);
    this.useHoliday = this.useHoliday.bind(this);
    this.setCountry = this.setCountry.bind(this);
  }

  // TODO: known issue - when new year comes the transfered days wont be saved !
  selectYear(year) {
    const numberUsedHolidays = this.state.listOfUsedHolidays.filter(date => new Date(date).getFullYear() === year).length;
    const remainingHolidays = this.state.holidays - this.state.numberOfUsedHolidays;
    let numberOfDaysToTransfer;

    if (remainingHolidays <= this.state.maxHolidaysTransfer && remainingHolidays !== 0) {
      numberOfDaysToTransfer = remainingHolidays;
    } else if (remainingHolidays > this.state.maxHolidaysTransfer) {
      numberOfDaysToTransfer = this.state.maxHolidaysTransfer;
    } else {
      numberOfDaysToTransfer = 0;
    }

    if (new Date().getFullYear() !== year) {
      this.setState({
        selectedYear: year,
        selectedMonth: 1,
        holidays: this.state.holidays + numberOfDaysToTransfer,
        numberOfTransferedDays: numberOfDaysToTransfer,
        numberOfUsedHolidays: numberUsedHolidays
      });
    } else {
      this.setState({
        selectedYear: year,
        selectedMonth: 1,
        holidays: this.state.holidays - this.state.numberOfTransferedDays,
        numberOfUsedHolidays: numberUsedHolidays
      });
    }
  }

  selectMonth(month) {
    this.setState({
      selectedMonth: month
    });
  }

  setMaxHolidaysTransfer(maxHolidaysTransfer) {
    const data = {
      country: this.state.country,
      holidaysCount: this.state.holidays,
      maxHolidaysTransfer: maxHolidaysTransfer,
      selectedHolidays: this.state.listOfUsedHolidays
    };

    fetch(`${BaseUrl}/holiday/holidays`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => this.setState({
        maxHolidaysTransfer: res.maxHolidaysTransfer,
        user: {
          isNewUser: false
        }
      }))
      .catch(error => console.error('Error:', error));
  }

  setHolidays(numberOfHolidays) {
    const data = {
      country: this.state.country,
      holidaysCount: numberOfHolidays,
      maxHolidaysTransfer: this.state.maxHolidaysTransfer,
      selectedHolidays: this.state.listOfUsedHolidays
    };

    fetch(`${BaseUrl}/holiday/holidays`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => this.setState({
        holidays: res.holidaysCount,
        user: {
          isNewUser: false
        }
      }))
      .catch(error => console.error('Error:', error));
  }

  setCountry(country) {
    const data = {
      country: country,
      holidaysCount: this.state.holidays,
      maxHolidaysTransfer: this.state.maxHolidaysTransfer,
      selectedHolidays: this.state.listOfUsedHolidays
    };
    fetch(`${BaseUrl}/holiday/holidays`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(
      fetch(`${BaseUrl}/holiday/public?countryCode=${country}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(res => this.setState({
          country: res.countryCode,
          publicHolidays: res.publicHolidays,
          user: {
            isNewUser: false
          }
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
      country: this.state.country,
      holidaysCount: this.state.holidays,
      maxHolidaysTransfer: this.state.maxHolidaysTransfer,
      selectedHolidays: holidaysArr
    };

    fetch(`${BaseUrl}/holiday/holidays`, {
      method: 'POST',
      credentials: 'include',
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
    fetch(`${BaseUrl}/auth/isAuth`, {
      credentials: 'include'
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem('auth');
          window.location.href = '/login';
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  componentDidMount() {
    fetch(`${BaseUrl}/users/user`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        const userInfo = res;
        if (userInfo.sharedUsers && userInfo.sharedUsers.length) {
          const sharedUsersData = userInfo.sharedUsers.map(id =>
            fetch(`${BaseUrl}/users/user?userId=${id}`, {
              credentials: 'include'
            })
              .then(res => res.json())
          );

          Promise.all(sharedUsersData)
            .then(data => this.setState({
              sharedUsersData: data
            }))
            .catch(error => console.error('Error:', error));
        }

        fetch(`${BaseUrl}/holiday/holidays`, {
          credentials: 'include'
        })
          .then(res => res.json())
          .then(res => {
            const userData = res;
            fetch(`${BaseUrl}/holiday/public?countryCode=${res.country}`, {
              credentials: 'include'
            })
              .then(res => res.json())
              .then(res => this.setState({
                country: res.countryCode,
                publicHolidays: res.publicHolidays,
                holidays: userData.holidaysCount,
                maxHolidaysTransfer: userData.maxHolidaysTransfer,
                listOfUsedHolidays: userData.selectedHolidays,
                numberOfUsedHolidays: userData.selectedHolidays.filter(date => new Date(date).getFullYear() === this.state.selectedYear).length,
                isLoading: false,
                user: userInfo,
                drawerIsOpen: false
              }))
              .catch(error => {
                this.setState({
                  holidays: userData.holidaysCount,
                  maxHolidaysTransfer: userData.maxHolidaysTransfer,
                  listOfUsedHolidays: userData.selectedHolidays,
                  numberOfUsedHolidays: userData.selectedHolidays.filter(date => new Date(date).getFullYear() === this.state.selectedYear).length,
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
    if (this.state.user && this.state.user.isNewUser) {
      return (
        <div className="usage-overlay"></div>
      )
    }
  }

  fetchSharedUsersData = (event, index) => {
    const id = event.target.value

    if (event.target.checked) {
      fetch(`${BaseUrl}/holiday/holidays?userId=${id}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(user => {
          const selectedSharedUser = this.state.sharedUsersHolidays.filter(el => el.userId === user.userId);
          const prepUserData = {
            userId: user.userId,
            selectedHolidays: user.selectedHolidays,
            colorIndex: index
          };

          if (!selectedSharedUser.length) {
            this.setState({
              sharedUsersHolidays: [...this.state.sharedUsersHolidays, prepUserData]
            });
          }

        })
        .catch(error => console.error('Error:', error));
    } else {
      const sharedUsersUpdated = this.state.sharedUsersHolidays.filter(el => el.userId !== id);

      this.setState({
        sharedUsersHolidays: sharedUsersUpdated
      });
    }
  }

  render() {
    const route = this.props.location.pathname;
    const holidaysForCurrentYear = this.state.listOfUsedHolidays.filter(date => new Date(date).getFullYear() === this.state.selectedYear);
    const months = holidaysForCurrentYear.map(date => new Date(date).getMonth()).filter((x, i, a) => a.indexOf(x) === i)
    const remainingHolidays = this.state.holidays - this.state.numberOfUsedHolidays;
    const publicHolidays = this.state.publicHolidays[this.state.selectedYear] || [];

    return (
      <div className="d-flex app-container">
        {this.isLoading()}
        <Navigation
          maxHolidaysTransfer={this.state.maxHolidaysTransfer}
          count={this.state.holidays}
          country={this.state.country}
          setMaxHolidaysTransfer={this.setMaxHolidaysTransfer}
          setHoliday={this.setHolidays}
          setCountry={this.setCountry}
          user={this.state.user}
          isLoading={this.state.isLoading}
        />
        <div className="main-container">
          <Account user={this.state.user} />

          {(() => {
            if (route === '/dashboard') {
              return <DashboardTab
                remaining={this.state.numberOfUsedHolidays}
                total={this.state.holidays}
                remainingHolidays={remainingHolidays}
                holidaysTaken={holidaysForCurrentYear}
              />;
            }

            if (route === '/') {
              return (
                <div className="main-content">
                  {this.renderUsageOverlay()}

                  <div className="main-calendar">
                    <Typography variant="h5" className="main-header">
                      Holiday Overview
                    </Typography>
                    <div className="d-flex justify-space align-fl-end">
                      <div className="content-header">Months bar</div>
                      <YearSelector selectYear={this.selectYear} />
                    </div>
                    <CalendarNav className="d-flex" selectedMonth={this.state.selectedMonth} selectYear={this.selectYear} selectMonth={this.selectMonth} holidayMonths={months} />
                    <div className="content-header">Calendar & Holidays</div>
                    <div className="calendar-base-wrapper calendar-wrapper w-100">
                      <CalendarMain sharedCalendars={this.state.sharedUsersHolidays} useHoliday={this.useHoliday} publicHolidays={publicHolidays} listOfUsedHolidays={holidaysForCurrentYear} canUseHolidays={remainingHolidays > 0} activeYear={this.state.selectedYear} activeMonth={this.state.selectedMonth} />
                    </div>
                  </div>
                  <div className="mobile-boxes-scroll">
                  <div className="content-container">
                    <DashboardBox
                      remaining={this.state.numberOfUsedHolidays}
                      total={this.state.holidays}
                      remainingHolidays={remainingHolidays}
                      holidaysTaken={holidaysForCurrentYear}
                      selectedCountry={this.state.country}
                    />
                    <AdditionalBox sharedUsersData={this.state.sharedUsersData} fetchSharedUsersData={this.fetchSharedUsersData} />
                  </div>
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    )
  };
}

export default App;
