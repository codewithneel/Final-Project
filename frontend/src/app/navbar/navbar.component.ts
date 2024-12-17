import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  loggedIN:boolean=false;

  constructor(private _currentUserService: CurrentUserService){}

  ngOnInit()
  {
    this._currentUserService.sharedloggedIN$.subscribe((value) => {
      this.loggedIN = value;
    });
  }

}
