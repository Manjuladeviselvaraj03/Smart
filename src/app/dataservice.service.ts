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

  constructor(private http: HttpClient) {}

  logout(){
    this.isLoggedIn=false;
    this.userData = null;
  }
  
  getUserData(): any {
    return this.userData;
  }
  
  setUserData(data: any) {
    this.userData = data;
    this.isLoggedIn = true;
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
