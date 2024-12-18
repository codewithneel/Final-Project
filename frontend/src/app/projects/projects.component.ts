import { Component } from '@angular/core';

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
export class ProjectsComponent {
  projects: Project[] = [
    { id: 1, name: 'Project 1', description: 'Lorem ipsum this project is about stuff', isActive: true },
    { id: 2, name: 'Project 2', description: 'Lorem ipsum this project is about stuff', isActive: true },
    { id: 3, name: 'Project 3', description: 'Lorem ipsum this project is about stuff', isActive: false },
    { id: 4, name: 'Project 4', description: 'Lorem ipsum this project is about stuff', isActive: true }
  ];

  showCreateModal: boolean = false;
  showEditModal: boolean = false;

  // Placeholder for project to edit
  currentProject: Project = { id: 0, name: '', description: '', isActive: true };

  // Add Project
  newProject: Project = { id: 0, name: '', description: '', isActive: true };

  openCreateModal() {
    this.newProject = { id: this.projects.length + 1, name: '', description: '', isActive: true };
    this.showCreateModal = true;
  }

  addProject() {
    this.projects.push({ ...this.newProject });
    this.showCreateModal = false;
  }

  openEditModal(project: Project) {
    this.currentProject = { ...project };
    this.showEditModal = true;
  }

  saveProject() {
    const index = this.projects.findIndex(p => p.id === this.currentProject.id);
    if (index !== -1) {
      this.projects[index] = { ...this.currentProject };
    }
    this.showEditModal = false;
  }
}
