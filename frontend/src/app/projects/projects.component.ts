import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from '../current-user.service';

interface Project {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  currentCompanyId: number | null = null;
  teamId: number | null = null;
  teamName: string = ''; // Store the team name dynamically
  isAdmin: boolean = false;

  showCreateModal: boolean = false;
  showEditModal: boolean = false;

  newProject: Project = { id: 0, name: '', description: '', isActive: true };
  currentProject: Project = { id: 0, name: '', description: '', isActive: true };

  baseUrl = 'http://localhost:8080'; // Base URL for API calls

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    if (this.currentUserService.getSharedloggedIN() === false) {
      this.router.navigate(['']);
    }

    this.currentCompanyId = +this.currentUserService.getCurrentCompany();
    console.log('Current Company ID:', this.currentCompanyId);

    const userData = this.currentUserService.getUserData();
    if (userData) {
      this.isAdmin = userData.admin;
    }

    this.route.queryParams.subscribe((params) => {
      this.teamId = +params['teamId']; // Convert to number
      console.log('Team ID from query:', this.teamId);

      if (this.currentCompanyId && this.teamId) {
        this.fetchProjects(this.currentCompanyId, this.teamId);
      } else {
        console.warn('Missing company or team ID.');
      }
    });
  }

  fetchProjects(companyId: number, teamId: number): void {
    const url = `${this.baseUrl}/company/${companyId}/teams/${teamId}/projects`;
    this.http.get<any[]>(url).subscribe({
      next: (response) => {
        console.log('Fetched projects:', response);

        this.projects = response.map((project) => ({
          id: project.id,
          name: project.name,
          description: project.description,
          isActive: project.active,
        }));

        // Dynamically set the team name if available
        if (response.length > 0 && response[0].team?.name) {
          this.teamName = response[0].team.name;
        } else {
          this.teamName = `Team ${teamId}`; // Fallback to team ID
        }
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
        this.teamName = `Team ${teamId}`; // Fallback if the request fails
      },
    });
  }

  openCreateModal(): void {
    this.newProject = { id: 0, name: '', description: '', isActive: true }; // Reset the new project form
    this.showCreateModal = true;
  }

  addProject(): void {
    if (!this.currentCompanyId || !this.teamId) {
      console.error('Cannot create project without companyId or teamId.');
      return;
    }

    const payload = {
      name: this.newProject.name,
      description: this.newProject.description,
      active: this.newProject.isActive,
      team: { id: this.teamId },
    };

    const url = `${this.baseUrl}/projects/${this.currentCompanyId}/${this.teamId}/newProject`;
    this.http.post<Project>(url, payload).subscribe({
      next: (response) => {
        console.log('Project created:', response);
        this.projects.push(response);
        this.showCreateModal = false;
      },
      error: (error) => {
        console.error('Error creating project:', error);
      },
    });
  }

  // Open the Edit Project modal
  openEditModal(project: Project): void {
    this.currentProject = { ...project };
    this.showEditModal = true;
  }

  saveProject(): void {
    if (!this.currentCompanyId || !this.teamId) {
      console.error('Cannot update project without companyId or teamId.');
      return;
    }

    const payload = {
      id: this.currentProject.id,
      name: this.currentProject.name,
      description: this.currentProject.description,
      active: this.currentProject.isActive, // Send isActive as active
      team: { id: this.teamId },
    };

    const url = `${this.baseUrl}/projects/${this.currentCompanyId}/${this.teamId}/updateProject`;
    this.http.patch<any>(url, payload).subscribe({
      next: (response) => {
        console.log('Project updated:', response);

        // Update the project in the local array
        const index = this.projects.findIndex((p) => p.id === response.id);
        if (index !== -1) {
          this.projects[index] = {
            id: response.id,
            name: response.name,
            description: response.description,
            isActive: response.active, // Correctly map active to isActive
          };
        }

        this.showEditModal = false;
      },
      error: (error) => {
        console.error('Error updating project:', error);
      },
    });
  }


}
