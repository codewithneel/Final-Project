import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';

interface company{
  id: number,
  name: string,
  // description: string
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {
  selectedCompany : number = -1;
  companies : company[] = [
    {
      id: 1,
      name: "CookSys",
    },
    {
      id: 2,
      name: "Fedex"
    }
  ];
  // companies : company[] = []

  constructor(private currentUserService: CurrentUserService){}

  ngOnInit(): void {
    // this.companies = this.currentUserService.getUserData().companies;
  }

  onCompanyChange(): void{
    console.log(this.selectedCompany);
  }
}
