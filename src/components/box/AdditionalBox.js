import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import './style.scss';

class AdditionalBox extends Component {
	state = {
		isDrawerOpen: false
	}

	toggleDrawer = () => {
		this.setState({
			isDrawerOpen: !this.state.isDrawerOpen,
		});
	};

	render() {
		return (
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
				</div>
			</div>
		)
	}
}

export default AdditionalBox;
