import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';
import { Router } from '@angular/router';

interface employee {
  name: string,
  email: string,
  active: string,
  admin: string,
  status: string
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  id: number = 6;
  employees: employee[] = [];
  employeeTableFlag: boolean = false;
  addUserFlag: boolean = false;
  email: string = ""
  displayedColumns: string[] = ["name", "email", "active", "admin", "status"]

  constructor(private currentUserService: CurrentUserService, private router: Router){}

  ngOnInit(): void {
    if(!this.currentUserService.hasSession()) {
      this.router.navigateByUrl("/");
    }
    fetch(`http://localhost:8080/company/${this.id}/users`, {
      // method: "GET",
      // mode: "no-cors"
    })
    .then((response) => response.json())
    .then((data) => {
      for(const emp of data){
        let isAdmin = emp.admin ? "Yes" : "No";
        let isActive = emp.active ? "Yes" : "No";
        this.employees.push({
          name: emp.profile.firstName + " " + emp.profile.lastName,
          email: emp.profile.email,
          active: isActive,
          admin: isAdmin,
          status: emp.status,
        })
      }
      console.log(this.employees)
      this.employeeTableFlag = true;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  addUser(){
    this.addUserFlag = true;
  }

  validateEmail(){
    fetch(`http://localhost:8080/search/user/${this.email}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if(data.message === "User does not exist in db"){
        console.log("New user")
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }




}
