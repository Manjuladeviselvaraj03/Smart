import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  loginform!:FormGroup
  isLoggedIn:boolean=false;
  private apiUrl = 'http://localhost:8080/api';
  private userData: any = null;

  constructor(private http: HttpClient) {
     const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        this.userData = JSON.parse(storedUser);
        // restore logged-in state when a user object exists in storage
        this.isLoggedIn = true;
      } catch (e) {
        console.error('Failed to parse stored user from localStorage', e);
        localStorage.removeItem('user');
        this.userData = null;
        this.isLoggedIn = false;
      }
    }
  }

  logout(){
    this.isLoggedIn=false;
    this.userData = null;
      localStorage.removeItem('user');
  }
  
  getUserData(): any {
    return this.userData;
  }
  
  setUserData(data: any) {
    this.userData = data;
    this.isLoggedIn = true;
     localStorage.setItem('user', JSON.stringify(data));
  }
  
  clearUserData() {
    this.userData = null;
    this.isLoggedIn = false;
  }
  
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  
  getAllEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllEvents`);
  }
  
  getAllMeetups(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllMeetups`);
  }
  
  registerEvent(registrationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerEvent`, registrationData);
  }
  
  getUserEvents(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getUserEvents?username=${username}`);
  }
  
  getTopEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getTopEvents`);
  }
  
}
