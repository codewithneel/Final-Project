import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  loggedIN:boolean=false;
  isAdmin:boolean=false;
  usersFNandLI:string="";

  constructor(private _currentUserService: CurrentUserService){}

  ngOnInit()
  {
    this.isAdmin=this._currentUserService.getUserData().admin
    this.usersFNandLI= this._currentUserService.getUserData().profile.firstName +" "+this._currentUserService.getUserData().profile.lastName[0]+"."
    this._currentUserService.sharedloggedIN$.subscribe((value) => {
      this.loggedIN = value;
    });
  }

}
