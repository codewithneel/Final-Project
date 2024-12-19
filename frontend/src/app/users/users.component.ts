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
  companyId: number = -1;
  employees: employee[] = [];
  displayedColumns: string[] = ["name", "email", "active", "admin", "status"]
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
    admin: [false],
    username: ['', [Validators.required]]
  })
  formFlag: boolean = false;
  employeeTableFlag: boolean = false;
  addEmailFlag: boolean = false;
  isUserCreated: boolean = false; 
  isEmp: boolean = false; 
  isExistingUserInserted: boolean = false;

  constructor(private fb: FormBuilder, private currentUserService: CurrentUserService, private router: Router){}

  ngOnInit(): void {
    if(!this.currentUserService.hasSession()) {
      this.router.navigateByUrl("/");
    }
    this.companyId = this.currentUserService.getCurrentCompany()
    fetch(`http://localhost:8080/company/${this.companyId}/users`)
    .then((response) => response.json())
    .then((data) => {
      for(const emp of data){
        this.addEmployeeToTable(emp);
      }
      this.employeeTableFlag = true;
    })
    .catch((error) => {console.error("Error:", error);});
  }

  validateEmail(): void{
    this.addEmailFlag = false;
    fetch(`http://localhost:8080/search/user/${this.form.value.email}`)
    .then((response) => response.json())
    .then((data) => {
      if(data.message === "User does not exist in db"){
        this.formFlag = true
      }else if(!((this.employees.find(emp => data.profile.email === emp.email)) === undefined)) {
        this.isEmp = true;
      }else{
        fetch(`http://localhost:8080/company/${this.companyId}/user/${data.id}`, {method: "PATCH"})
        .then(response => response.json())
        .then((data) => {
          this.addEmployeeToTable(data);
          this.employees = [... this.employees];
          this.isExistingUserInserted = true;
        })
        .catch(error => console.log(error));
      }
    })
    .catch((error) => {console.error("Error:", error);});
  }

  createUser(): void{
    fetch(`http://localhost:8080/users/${this.companyId}`, {
      method: "POST",
      body: JSON.stringify({
        credentials: {
          username: this.form.value.username,
          password: this.form.value.password
        },
        profile: {
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          email: this.form.value.email,
          phone: this.form.value.phone
        },
        admin: this.form.value.admin
      })
      ,
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((response) => response.json())
    .then((data) => {
      this.addEmployeeToTable(data);
      this.employees = [... this.employees];
      this.formFlag = false;
      this.form.reset();
      this.isUserCreated = true; 
    });
  }

  addUser(): void {
    this.resetForm();
    this.addEmailFlag = true;
  }

  resetForm(): void {
    this.form.reset();
    this.isEmp = false;
    this.formFlag = false;
    this.isUserCreated = false;
    this.isExistingUserInserted = false;
  }

  private addEmployeeToTable(emp: any): void{
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
}
