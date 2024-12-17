import { Component,Input, Output,EventEmitter, OnInit} from '@angular/core';
import { CurrentUserService } from '../current-user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIN:boolean=false;

  username: string='';
  password: string='';
  
  constructor(private _currentUserService: CurrentUserService){}

  loginLogic()
  {
 
    this._currentUserService.setSharedVariableloggedIN(true)
    fetch("http://localhost:8080/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: this.username,
        password: this.password
      })
      ,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
      
      this._currentUserService.setUserData(data);
      this._currentUserService.setSharedVariableloggedIN(true);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  ngOnInit()
  {
    this._currentUserService.sharedloggedIN$.subscribe((value) => {
      this.loggedIN = value;
    });
  }

}
