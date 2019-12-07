import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DoneIcon from '@material-ui/icons/Done';
import Divider from '@material-ui/core/Divider';
import Logo from '../Logo/Logo';
import FormError from '../FormError/FormError';
import { BaseUrl, ApiURL } from '../../config';
import './style.scss';
import '../Login/style.scss';

class Register extends React.Component {
  state = {
    isRegisterSuccessful: false,
    error: false,
    errorMessage: ''
  }

  handleRegister = (event) => {
    event.preventDefault();

    const elements = event.target.elements;
    const formData = {
      firstName: elements.firstName.value,
      lastName: elements.lastName.value,
      email: elements.email.value,
      password: elements.password.value,
      passwordRe: elements.passwordRe.value
    }

    fetch(`${BaseUrl}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status !== 200) {
        this.setState({
          error: true,
          errorMessage: res.statusText
        });
      } else {
        this.setState({
          isRegisterSuccessful: true
        });
      }
    })
    .catch(error => {
      console.error('Error:', error)
    });
  }

  render() {
    return (
      <div className="user-container">
        <Dialog open={this.state.isRegisterSuccessful} aria-labelledby="responsive-dialog-title">
          <DialogContent className="d-flex">
            <DoneIcon/>
            <DialogContentText>
              Congratulation! You are successfully register and now you can start planning you vacation days.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/login">
              <Button type="submit" variant="contained" className="user-form">
                Login
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
        <Container maxWidth="sm" className="user-form">
          <Logo name="FOIZ" />

          <br />

          <div className="social-login-container">
            <div>
              <a href={ApiURL + '/auth/facebook'} className="fb connect">

                <img className="fb-icon" alt="facebook-icon" src='./fb-social.png' />
                <span><b>Sign in with Facebook</b></span>
              </a>
            </div>
            <br />
            <div className="google-wrapper">
              <a href={ApiURL + '/auth/google'} className="google-btn">
                <span className="google-icon-wrapper">
                  <img className="google-icon" alt="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                </span>
                <span className="btn-text"><b>Sign in with Google</b></span>
              </a>
            </div>
          </div>

          <br />
          <Divider />
          <br />

          <form onSubmit={this.handleRegister}>
            <TextField
              id="firstName"
              label="First name"
              type="text"
              name="firstName"
              placeholder="First name"
              margin="normal"
              variant="outlined"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="lastName"
              label="Last name"
              type="text"
              name="lastName"
              placeholder="Last name"
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              name="email"
              placeholder="Enter email"
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="passwordRe"
              label="Repeat password"
              type="password"
              name="passwordRe"
              placeholder="Repeat the password"
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            {this.state.error && <FormError message={this.state.errorMessage} registerError={true} />}

            <div className="create-login-user">
              <div className="user-text">Already have an account?</div>
              <Link to="/login">Log in</Link>
            </div>

            <Button type="submit" variant="contained" className="user-button">
              Register
              </Button>
          </form>
        </Container>
      </div>
    );
  }
}

export default Register;
