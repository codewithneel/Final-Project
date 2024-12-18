import { Component,Input, Output,EventEmitter, OnInit} from '@angular/core';
import { CurrentUserService } from '../current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIN:boolean=false;

  username: string='';
  password: string='';
  
  constructor(private _currentUserService: CurrentUserService, private router: Router){}

  loginLogic()
  {
 
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
      if(data.message=="The username provided does not belong to an active user.")
      {
        this._currentUserService.setSharedVariableloggedIN(false);
      }
      else
      {
        this._currentUserService.setSharedVariableloggedIN(true);
        this.loggedIN = true; 
        this.router.navigate(['/company']); 
      }
     
      
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
