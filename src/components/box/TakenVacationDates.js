import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import './style.scss';

const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

class TakenVacationDates extends Component {
	state = {
	}

	render() {
		const groupedHolidays = this.props.holidaysTaken.sort().reduce((obj, val) => {
			const date = new Date(val);

			if (date.getFullYear() in obj) {
				const entry = obj[date.getFullYear()];
				const entryLength = entry.length;
				if (entry[entryLength - 1].month === date.getMonth()) {
					entry[entryLength - 1].holidays.push(val);
					return obj;
				}

				entry.push({
					month: date.getMonth(),
					holidays: [val]
				})

				return obj;
			}

			obj[date.getFullYear()] = [{
				month: date.getMonth(),
				holidays: [val]
			}];

			return obj;
		}, {});

		console.log(groupedHolidays)

		return (
			<Fragment>
				<div className="sub-menu">Taken dates:</div>
				{Object.keys(groupedHolidays).map((key, i) => {
					return (
						<div>
							<div key={i}>{key}:</div>
							{
								groupedHolidays[key].map((el, i) => {
									return (
										<div key={i} className="dates-container">
											<div key={i} className="months-box">{monthNames[el.month]}:</div>
													<div className="d-flex">
											
											{
												el.holidays.map((el, i) => (
														<span key={i} className="date-box">{new Date(el).getDate()}</span>
												))
											}
													</div>
										</div>
									);
								})
							}
						</div>
					);
				})
				}
			</Fragment>
		)
	}
}

export default TakenVacationDates;
