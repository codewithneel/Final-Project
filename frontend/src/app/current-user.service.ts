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

  constructor() { }

  
}
