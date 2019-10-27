import { BaseUrl } from '../config';

class UserService {
	logoutUser() {
		return fetch(`${BaseUrl}/auth/logout`)
			.catch(error => console.error('Error: Logout user', error));
	}

	shareCalendar(email) {
		return fetch(`${BaseUrl}/users/shareCalendar`)
			.post({
				targetUserEmail: email
			})
			.catch(error => console.error('Error: Logout user', error));
	}
}

export default new UserService();