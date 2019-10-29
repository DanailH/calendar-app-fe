import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import './style.scss';

class Legend extends React.Component {
	state = {
		isSnackBarOpen: false
	}

	TransitionUp(props) {
		return <Slide {...props} direction="up" />;
	}

	componentDidUpdate(nextProps) {
		if (this.props.remainingHolidays !== nextProps.remainingHolidays) {
			this.setState({
				isSnackBarOpen: this.props.remainingHolidays <= 0
			});

			setTimeout(() => this.setState({
				isSnackBarOpen: false
			}), 5000);
		}
	}

	render() {
		return (
			<div className="clearfix">
				<div className="position-bottom">
					<Snackbar
						open={this.state.isSnackBarOpen}
						TransitionComponent={this.TransitionUp}
						ContentProps={{
							'aria-describedby': 'message-id',
						}}
						message={<span id="message-id">You are out of holidays!</span>}
					/>
				</div>
			</div>

		)
	}
}

export default Legend;
