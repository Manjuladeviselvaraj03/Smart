import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
   isLoggedIn = false;
  userData: any = null;

  onLoginSuccess(user: any) {
    this.isLoggedIn = true;
    this.userData = user;
  }
  ngOnInit():void{

  }

  logout(){
      this.isLoggedIn = false;
    this.userData = null;
  }
}
