import React from 'react';

class Login extends React.Component {
  handleLogin(event) {
    event.preventDefault();

    const elements = event.target.elements;

    console.log(elements.email.value)
    console.log(elements.password.value)

    const formData = {
      email: elements.email.value,
      password: elements.password.value
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
      <form onSubmit={this.handleLogin} className="col-5 mt-5 mx-auto">
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
    );
  }
}

export default Login;
