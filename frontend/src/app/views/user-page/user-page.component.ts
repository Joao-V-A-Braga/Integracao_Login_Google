import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from '../home/home.service';
import { HomeData } from '../home/home-data.model';

import { LocalStorageService } from '../local-storage.service';

declare const gapi: any;
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private homeService: HomeService) {
      
    }

  ngOnInit(): void {
    this.IfLocalStorage()
  }


  public auth2: any;
   public async logOut() {
    this.storage.clear()
    await this.router.navigate([''])
      .then(_=>{
        window.location.reload()
      })

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then();
  }

  public IfLocalStorage() {
    const user = {
      id: this.storage.get('id'),
      name: this.storage.get('name'),
      email: this.storage.get('email'),
    }

    if (user.email) {

      this.homeService.homeData = <HomeData>({
        ...user
      })
    } else {
      this.router.navigate([''])
    }
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

  get id(): Number {
    return this.homeService.homeData.id
  }

}
