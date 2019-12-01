import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './style.scss';

const currentDate = new Date();

class YearSelector extends React.Component {
  constructor() {
    super();

    this.state = {
      currentDate: currentDate,
      currentYear: currentDate.getFullYear(),
      isCurrentYear: true
    };
  }

  changeYear(direction) {
    let newYear;

    switch (direction) {
      case 'up':
        newYear = this.state.currentDate.setFullYear(this.state.currentDate.getFullYear() + 1);
        break;
      case 'down':
        newYear = this.state.currentDate.setFullYear(this.state.currentDate.getFullYear() - 1);
        break;
      default:
        newYear = null;
        break;
    };

    const selectedDate = new Date(newYear);

    this.setState({
      currentDate: selectedDate,
      currentYear: selectedDate.getFullYear(),
      isCurrentYear: !this.state.isCurrentYear
    });

    this.props.selectYear(selectedDate.getFullYear());
  }

  render() {
    return (
      <Grid className="year-selector" container direction="row" alignItems="center" justify="flex-end">
        <IconButton className="material-icons" disabled={this.state.isCurrentYear} onClick={this.changeYear.bind(this, 'down')}>
          arrow_left
        </IconButton>

        <Typography variant="h6">
          {this.state.currentYear}
        </Typography>

        <IconButton className="material-icons" disabled={!this.state.isCurrentYear} onClick={this.changeYear.bind(this, 'up')}>
          arrow_right
        </IconButton>
      </Grid>
    )
  };
}

export default YearSelector;
