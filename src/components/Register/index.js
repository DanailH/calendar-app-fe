import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DoneIcon from '@material-ui/icons/Done';
import Logo from '../Logo/Logo';
import FormError from '../FormError/FormError';
import './style.scss';

class Register extends React.Component {
  state = {
    isRegisterSuccessful: false,
    error: false
  }

  handleRegister = (event) => {
    event.preventDefault();

    const elements = event.target.elements;
    const formData = {
      name: elements.name.value,
      surname: elements.surname.value,
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
      .then(response => {
        this.setState({
          isRegisterSuccessful: true
        });

        console.log('Success:', JSON.stringify(response))
      })
      .catch(error => {
        this.setState({
          error: true
        });

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
              <Button type="submit" variant="contained" className="user-button">
              Login
            </Button>
            </Link>
          </DialogActions>
        </Dialog>
        <Container maxWidth="sm" className="user-form">
          <Logo />
          <form onSubmit={this.handleRegister}>
            <TextField
              id="name"
              label="Name"
              type="text"
              name="name"
              placeholder="Name"
              margin="normal"
              variant="outlined"
              autoFocus
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="surname"
              label="Surname"
              type="text"
              name="surname"
              placeholder="Surname"
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
            
            { this.state.error && <FormError registerError={true} /> }
            
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
