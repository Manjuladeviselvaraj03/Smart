import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
 getUserData(): any {
    throw new Error('Method not implemented.');
  }
  clearUserData() {
    throw new Error('Method not implemented.');
  }
  loginform!:FormGroup
  isLoggedIn:boolean=false;
  logout(){
    this.isLoggedIn=false;
  }
  
}
