import React from 'react';

const currentDate = new Date();

class YearSelector extends React.Component {
  constructor() {
    super();

    this.state = {
      currentDate: currentDate,
      currentYear: currentDate.getFullYear()
    };
  }

  changeYear(direction) {
    let newYear;

    switch(direction) {
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
      currentYear: selectedDate.getFullYear()
    });

    this.props.resetSelectedMonth();
    this.props.selectYear(selectedDate.getFullYear());
  }

  render() {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <button className="btn" onClick={this.changeYear.bind(this, 'down')}>
          <i className="material-icons">arrow_left</i>
        </button>

        <div className="h5">{this.state.currentYear}</div>

        <button className="btn" onClick={this.changeYear.bind(this, 'up')}>
          <i className="material-icons">arrow_right</i>
        </button>
      </div>
    )
  };
}

export default YearSelector;
