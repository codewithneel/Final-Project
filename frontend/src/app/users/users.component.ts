import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  id: number = -1;
  employees: employee[] = [];
  // dataSource = new MatTableDataSource<any>(this.employees);
  employeeTableFlag: boolean = false;
  addEmailFlag: boolean = false;
  formFlag: boolean = false;
  email: string = ""
  displayedColumns: string[] = ["name", "email", "active", "admin", "status"]
  form: FormGroup = this.fb.group({
    //email: [this.email, Validators.required, Validators.email],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    password: ['', Validators.required],
    admin: [false],
    username: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private currentUserService: CurrentUserService, private router: Router){}

  ngOnInit(): void {
    if(!this.currentUserService.hasSession()) {
      this.router.navigateByUrl("/");
    }
    this.id = this.currentUserService.getCurrentCompany()
    fetch(`http://localhost:8080/company/${this.id}/users`)
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
      this.employeeTableFlag = true;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  validateEmail(){
    this.addEmailFlag = false;
    fetch(`http://localhost:8080/search/user/${this.email}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if(data.message === "User does not exist in db"){
        console.log("New user")
      }
    })
    .then(() => this.formFlag = true)
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  createUser(){
    fetch(`http://localhost:8080/users/${this.id}`, {
      method: "POST",
      body: JSON.stringify({
        credentials: {
          username: this.form.value.username,
          password: this.form.value.password
        },
        profile: {
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          email: this.email,
          phone: this.form.value.phone
        },
        admin: this.form.value.admin
      })
      ,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      let isAdmin = data.admin ? "Yes" : "No";
      let isActive = data.active ? "Yes" : "No";
      this.employees.push({
        name: data.profile.firstName + " " + data.profile.lastName,
        email: data.profile.email,
        active: isActive,
        admin: isAdmin,
        status: data.status,
      });
      console.log(this.employees)
    });
    this.form.reset();
    this.email = '';
    this.formFlag = false;
    // this.employeeTableFlag = true;
  }

  addUser(){
    this.addEmailFlag = true;
    // this.employeeTableFlag = false;
  }
}
