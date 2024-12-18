import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {


  private sharedloggedIN = new BehaviorSubject<boolean>(false);
  sharedloggedIN$ = this.sharedloggedIN.asObservable();

  setSharedVariableloggedIN(value: boolean) {
    this.sharedloggedIN.next(value);
  }

  userData = new BehaviorSubject<any>(null); 
  userData$ = this.userData.asObservable();

  
  currentCompany= new BehaviorSubject<any>(null); 
  currentCompany$= this.currentCompany.asObservable();

  constructor() { }

  setUserData(data: any) {
    this.userData.next(data);
  }

  setCurrentCompany(data: any)
  {
    this.currentCompany.next(data);
  }

  getUserData() {
    return this.userData.value;
  }

  getCurrentCompany()
  {
    return this.currentCompany.value;
  }

  
}
