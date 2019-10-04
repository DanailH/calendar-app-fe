import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PublicIcon from '@material-ui/icons/Public';
import './style.scss';
import '../../styles/general.scss';

const countries = [
  {
    value: 'nl',
    label: 'Netherlands',
  },
  {
    value: 'bg',
    label: 'Bulgaria',
  },
];
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
    console.log(this.state.country)
    return (
      <form onBlur={ this.setCountryCode } className="input-group">
        <TextField
          id="outlined-select-currency"
          select
          label="Country"
          name="countryCode"
          value={ this.state.country !== null ? this.state.country : '' }
          onChange={ this.handleCountryChange }
          placeholder="Please select your country"
          className="nav-fields"
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <PublicIcon />,
          }}
        >
          {countries.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </form>
    )
  };
}

export default SetCountry;
