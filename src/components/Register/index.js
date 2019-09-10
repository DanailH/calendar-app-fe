import React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  handleRegister(event) {
    event.preventDefault();

    const elements = event.target.elements;

    console.log(elements.email.value)
    console.log(elements.password.value)
    console.log(elements.passwordRe.value)

    const formData = {
      email: elements.email.value,
      password: elements.password.value,
      passwordRe: elements.passwordRe.value
    }

    fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className="col-5 mt-5 mx-auto">
        <Link to="/login">Back to login</Link>
        <br /><br />
        <form onSubmit={this.handleRegister}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Repeat password</label>
            <input type="password" name="passwordRe" className="form-control" id="passwordRe" placeholder="Repeat password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    );
  }
}

export default Register;
