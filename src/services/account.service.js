import {
  BaseUrl
} from '../config';

class UserService {
  logoutUser() {
    return fetch(`${BaseUrl}/auth/logout`)
      .catch(error => console.error('Error: Logout user', error));
  }

  shareCalendar(email) {
    return fetch(`${BaseUrl}/users/shareCalendar`, {
      method: 'POST',
      body: JSON.stringify({
        targetUserEmail: email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .catch(error => console.error('Error: Logout user', error));
  }
}

export default new UserService();