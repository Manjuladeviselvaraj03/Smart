import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../sharedResource/dataservice.service';

export const authGuard = () => {
  const dataService = inject(DataserviceService);
  const router = inject(Router);

  const userData = dataService.getUserData();
  
  if (userData && dataService.isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
