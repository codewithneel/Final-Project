import { Component,Input, Output,EventEmitter, OnInit} from '@angular/core';
import { CurrentUserService } from '../current-user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIN:boolean=false;
  
  constructor(private _currentUserService: CurrentUserService){}

  loginLogic()
  {
    this._currentUserService.setSharedVariableloggedIN(true)
  }
  ngOnInit()
  {
    this._currentUserService.sharedloggedIN$.subscribe((value) => {
      this.loggedIN = value;
    });
  }

}
