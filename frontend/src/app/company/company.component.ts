import { Component } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent {
  selectedCompany : number = -1;
  companies : any = [
    {
      id: 1,
      name: "CookSys",
    },
    {
      id: 2,
      name: "Fedex"
    }
  ];

  onCompanyChange(): void{
    console.log(this.selectedCompany);
  }
}
