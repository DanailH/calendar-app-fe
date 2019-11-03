import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Logo from '../Logo/Logo';
import FormError from '../FormError/FormError';
import { BaseUrl, ApiURL } from '../../config';
import Divider from '@material-ui/core/Divider';
import './style.scss';

class Login extends React.Component {
  state = {
    isAuth: false,
    error: false
  }

  constructor() {
    super();

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleFBLogin = () => {
    fetch(`${BaseUrl}/auth/facebook`)
      .then(console.log)
      .catch(console.log)
  }

  handleLogin(event) {
    event.preventDefault();

    const elements = event.target.elements;
    const formData = {
      email: elements.email.value,
      password: elements.password.value
    }

    fetch(`${BaseUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('auth', true);

        this.setState({
          isAuth: true
        })
      })
      .catch(error => {
        this.setState({
          error: true
        })

        console.error('Error:', error)
      });
  }

  render() {
    if (this.state.isAuth) {
      return <Redirect to='/' />
    }

    return (
      <div className="user-container login-container">
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
            <br/>
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

          <form onSubmit={this.handleLogin}>
            <TextField
              id="email"
              label="Email"
              type="email"
              name="email"
              placeholder="Enter email"
              margin="normal"
              variant="outlined"
              autoFocus
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
            <div className="create-login-user">
              <div className="user-text">Don't have an account?</div>
              <Link to="/register">Create account</Link>
            </div>

            {this.state.error && <FormError loginError={true} />}

            <Button type="submit" variant="contained" className="user-button">
              Login
            </Button>
          </form>
        </Container>
      </div>
    );
  }
}

export default Login;
