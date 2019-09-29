import React from 'react';
// import './style.scss';
import { ReactComponent as Logo } from '../../utils/svg/header.svg';

const holidayInfo = 'Selected days off';
const publicHolidayInfo = 'Public Holidays for the selected year';

class Header extends React.Component {
    render() {
        return (
         <Logo/>
        )}
}

export default Header;