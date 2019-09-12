import React from 'react';

class SetCountry extends React.Component {
  state = {
    country: ''
  }

  constructor() {
    super();

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.setCountryCode = this.setCountryCode.bind(this);
  }

  handleCountryChange(event) {
    this.setState({
      country: event.target.value
    });
  }

  setCountryCode(event) {
    event.preventDefault();

    this.props.setCountry(this.state.country);
  }

  componentDidUpdate(nextProps) {
    if (this.props.country !== nextProps.country) {
      this.setState({
        country: this.props.country
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.setCountryCode} className="input-group">
        <input type="text" name="countryCode" value={this.state.country} onChange={this.handleCountryChange} placeholder="Country code" />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary" disabled={this.state.country ? false : true}>Set</button>
        </div>
      </form>
    )
  };
}

export default SetCountry;
