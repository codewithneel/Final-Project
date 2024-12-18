import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {


  constructor(public _currentUserService: CurrentUserService){}

  teams: any[] = [];
  teamProjectLengthDict: {[key:number]: number}  = {};

  currentUser:any=null;
  

  addTeamMember:boolean=false;
  teamName: string='';
  description: string='';
  selectedMembers: any[] = [];
  teamMembers: any[] = [];
  selectedItem: any=null;

  ngOnInit(): void {
    this.currentUser=this._currentUserService.getUserData();
    this.teams=this.currentUser.teams

    if (this.currentUser && this.currentUser.companies.length > 0)
    {
      this.teamMembers = this.currentUser.companies[0].employees;
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

  async postTeam(companyId:number)
  {
    console.log("team name is "+this.teamName)
    console.log("Description is "+this.description);
    console.log("team members are ");
    for(var i=0;i<this.selectedMembers.length;i++)
    {
      console.log("member "+(i+1)+": "+this.selectedMembers[i]);
    }
    fetch(`http://localhost:8080/team/${companyId}`, {
      method: "POST",
      body: JSON.stringify({
        username: "",
        password: "this.password"
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
    
      }
     
      
    })
    .catch((error) => {
      console.error("Error:", error);
      
    });

  }
  

  async getNumOfProjects(teamId:number) 
  {
    
    /*localhost:8080/company/6/teams/11/projects `http://localhost:8080/6/teams/${teamId}/projects` */
    fetch(`http://localhost:8080/company/6/teams/${teamId}/projects`, {
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
