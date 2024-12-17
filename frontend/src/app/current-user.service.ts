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

  private userData = new BehaviorSubject<any>(null); 
  userData$ = this.userData.asObservable();

  constructor() { }

  setUserData(data: any) {
    this.userData.next(data);
  }

  getUserData() {
    return this.userData.value;
  }

  
}
