import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:5000/app/getAllUsers', {withCredentials: true});
  }

  getAllAdvisors() {
    return this.http.get<User[]>('http://localhost:5000/app/getAllAdvisors', {withCredentials: true});
  }

  changeIsAdvisor(id: string, isAdvisor: boolean) {
    const body = new URLSearchParams();
    body.set('isAdvisor', true.toString());

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    return this.http.patch('http://localhost:5000/app/changeIsAdvisor?id=' + id, body, {withCredentials: true, headers: headers});
  }

  sendMessage(receiverId: string, senderEmail: string, message: string) {
    const body = new URLSearchParams();
    body.set('receiverId', receiverId);
    body.set('senderEmail', senderEmail);
    body.set('message', message);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post('http://localhost:5000/app/sendMessage', body, {withCredentials: true, headers: headers});
  }

  getMessages(userId: string) {
    const body = new URLSearchParams();
    body.set('userId', userId);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post('http://localhost:5000/app/getUnreadMessagesForUser', body, {withCredentials: true, headers: headers});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:5000/app/deleteUser?id=' + id, {withCredentials: true});
  }
}
