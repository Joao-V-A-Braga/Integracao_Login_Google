import { Component, OnInit } from '@angular/core';

import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    
  }

  get name(): String {
    return this.homeService.homeData.name
  }
  
  get email(): String {
    return this.homeService.homeData.email
  }

  get token(): String {
    return this.homeService.homeData.token
  }

}
 