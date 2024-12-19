import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {


  constructor(public _currentUserService: CurrentUserService, private router: Router){}

  teams: any[] = [];
  teamProjectLengthDict: {[key:number]: number}  = {};

  currentUser:any=null;
  currentCompany:any=null;
  

  addTeamMember:boolean=false;
  teamName: string='';
  description: string='';
  selectedMembers: any[] = [];
  teamMembers: any[] = [];
  selectedItem: any=null;

  ngOnInit(): void {

    if(this._currentUserService.getSharedloggedIN()==false)
    {
      this.router.navigate(['']); 
    }

    this._currentUserService.userData$.subscribe((value) => {
      this.currentUser = value;
    });
   
    this.currentUser=this._currentUserService.getUserData();
    this.currentCompany=this._currentUserService.getCurrentCompany();
    this.teams=this.currentUser.teams

    if (this.currentUser && this.currentUser.companies.length > 0)
    {
      for(let company of this.currentUser.companies)
      {
        if(company.id==this.currentCompany)
        {
          this.teamMembers=company.employees;
        }
      }
    }
    else
    {
      this.teamMembers = []; 
    }
   
  }

  addToSelectedMembers()
  {
    if (this.selectedItem && !this.selectedMembers.includes(this.selectedItem)) {
      this.selectedMembers.push(this.selectedItem);
      console.log("just added "+this.selectedItem.profile.firstName);
    } 
    else
    {
      console.warn("Member is already selected or invalid.");
    }
  
  }

  removeMember(empId:number)
  {
    var selectedMembersTemp: any[] = [];

    var indexToRemove =-1;
    for(let i = 0; i < this.selectedMembers.length; i++)
    {
      if(this.selectedMembers[i].id == empId)
      {
        indexToRemove=i;
        
      }
      else
      {
        selectedMembersTemp.push(this.selectedMembers[i]);
      }
    }

    this.selectedMembers = selectedMembersTemp;
   
  }

  async postTeam()
  {
   
    const payload = {
      name: this.teamName,
      description: this.description,  // Correct field name
      teammates: this.selectedMembers.map(member => ({
        id: member.id,  // Send only the ID of teammates
      })),
    };

    console.log("Payload being sent:", payload)

    fetch(`http://localhost:8080/team/${this.currentCompany}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from post team:", data);
      
      this.currentUser=this._currentUserService.getUserData();
      this.teams=this.currentUser.teams
      
      this.addTeamMember=false;  
      
    })
    .catch((error) => {
      console.error("Error:", error);
      
    });

  }
  

  async getNumOfProjects(teamId:number) 
  {
    
    /*localhost:8080/company/6/teams/11/projects `http://localhost:8080/6/teams/${teamId}/projects` */
    /* `http://localhost:8080/company/6/teams/${teamId}/projects` */
    /* `http://localhost:8080/company/${currentCompany.id}/teams/${teamId}/projects`  */
    fetch(`http://localhost:8080/company/${this.currentCompany}/teams/${teamId}/projects`, {
      method: "GET",
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data.length);
      
      this.teamProjectLengthDict[teamId]=data.length;
      
      
    })
    .catch((error) => {
      console.error("Error:", error);
      this.teamProjectLengthDict[teamId]=0;
  });
 
  
  }

}
