import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Logo from '../Logo/Logo';
import FormError from '../FormError/FormError';
import { BaseUrl } from '../../config';

class Login extends React.Component {
  state = {
    isAuth: false,
    error: false
  }

  constructor() {
    super();

    this.handleLogin = this.handleLogin.bind(this);
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
        localStorage.setItem('_id', res._id);

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
      <div className="user-container">
        <Container maxWidth="sm" className="user-form">
          <Logo name="FOIZ"/>
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
