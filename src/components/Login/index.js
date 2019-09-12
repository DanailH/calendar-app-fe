import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';

class Login extends React.Component {
  state = {
    isAuth: false
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

    fetch('/auth/login', {
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
    .catch(error => console.error('Error:', error));
  }

  render() {
    if (this.state.isAuth) {
      return <Redirect to='/' />
    }

    return (
      <div className="col-5 mt-5 mx-auto">
        <form onSubmit={this.handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <br /><br />
        <Link to="/register">Register an account!</Link>
      </div>
    );
  }
}

export default Login;
