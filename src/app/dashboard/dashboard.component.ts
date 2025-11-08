import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  
   isLoggedIn = false;
  userData: any = null;

  constructor(public dataService: DataserviceService) {}

  ngOnInit(): void {

    this.isLoggedIn = this.dataService.isLoggedIn;
    this.userData = this.dataService.getUserData();
  }

  logout(): void {
    this.dataService.logout();
    this.isLoggedIn = false;
    this.userData = null;
  }
}