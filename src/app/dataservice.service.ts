import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  loginform!:FormGroup
  isLoggedIn:boolean=false;
  logout(){
    this.isLoggedIn=false;
  }
 getUserData(): any {
    throw new Error('Method not implemented.');
  }
  clearUserData() {
    throw new Error('Method not implemented.');
  }
  
  
}
