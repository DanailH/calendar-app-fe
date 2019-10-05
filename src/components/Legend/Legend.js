import React from 'react';
import Fab from '@material-ui/core/Fab';
import StarsIcon from '@material-ui/icons/Stars';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import HelpIcon from '@material-ui/icons/Help';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import './style.scss';

const holidayInfo = 'Selected days off';
const publicHolidayInfo = 'Public Holidays for the selected year';

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
                <div className="calendar-legend-wrapper f-right">
                    <Tooltip title={holidayInfo} aria-label="add">
                        <Fab size="small" color="primary" aria-label="add">
                            <Badge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                badgeContent={<HelpIcon />}
                            >
                                <StarsIcon />
                            </Badge>
                        </Fab>
                    </Tooltip>

                    <Tooltip title={publicHolidayInfo} aria-label="add">
                        <Fab size="small" color="secondary" aria-label="add">
                            <Badge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                badgeContent={<HelpIcon />}
                            >
                            <StarsIcon />
                            </Badge>
                        </Fab>
                    </Tooltip>
                </div>
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
