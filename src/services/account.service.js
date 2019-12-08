import {
  BaseUrl
} from '../config';

class UserService {
  logoutUser() {
    return fetch(`${BaseUrl}/auth/logout`. {
      credentials: 'include'
    })
      .catch(error => console.error('Error: Logout user', error));
  }

  shareCalendar(email) {
    return fetch(`${BaseUrl}/users/shareCalendar`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        targetUserEmail: email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default new UserService();