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

  isAdmin:boolean=false;

  ngOnInit(): void {

    if(this._currentUserService.getSharedloggedIN()==false)
    {
      this.router.navigate(['']); 
    }

    this.isAdmin=this._currentUserService.getUserData().admin

    this._currentUserService.userData$.subscribe((value) => {
      this.currentUser = value;
    });
   
    this.currentUser=this._currentUserService.getUserData();
    this.currentCompany=this._currentUserService.getCurrentCompany();
    this.getTeamMates();

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

  editProjects(teamId:number)
  {
    this.router.navigate(['/projects'], { queryParams: { teamId: teamId}}); 
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

  onMemberChange(): void
  {
    this.addToSelectedMembers();
    
  }

  getTeamMates()
  { 
    fetch(`http://localhost:8080/team/${this.currentCompany}/teammates`, {
      method: "GET",
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Team mates are Response:", data);
      this.teams=data;
      
      
    })
    .catch((error) => {
      console.error("Error:", error);
      
  });
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
      this.getTeamMates();

      this.addTeamMember=false;  
      
    })
    .catch((error) => {
      console.error("Error:", error);
      
    });

  }
  

  async getNumOfProjects(teamId:number) 
  {
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
