import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HomeData } from './home-data.model';

import { HomeService } from './home.service';

declare const gapi: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private element: ElementRef, private homeService: HomeService, private http: HttpClient, private router: Router) {
  }


  email: string = '';
  password: string = '';

  async click(): Promise<void> {
    this.http.post('http://localhost:3000/signin', {
      email: this.email, password: this.password
    })
      .subscribe(res => {
        this.router.navigate(['/userPage'])
        this.homeService.homeData = <HomeData>({
          ...res
        })
      }, err => console.log(err))
  }


  ngOnInit() {
    this.googleInit();
  }
  public auth2: any;

  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: "57345851816-qrlcfpn1p2bdo53sj3ea23ci546bmihk.apps.googleusercontent.com",
      });
      that.onSignIn(that.element.nativeElement.firstChild);
    });
  }

  onSignIn(element: any) {

    const that = this
     this.auth2.attachClickHandler(element, {},
      function (googleUser: any) {

        const id_token = googleUser.getAuthResponse().id_token;
         that.http.post('http://localhost:3000/g-signin', {token: id_token},{
          headers: {
            'Content-Type':'application/json'
          }
        })
        .subscribe(res =>{
          console.log(res)
        }, err => console.log(err))
      })
  }
}
