import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HomeData } from './home-data.model';

import { HomeService } from './home.service';
import { LocalStorageService } from '../local-storage.service'


declare const gapi: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storage: LocalStorageService, private ngZone: NgZone, private element: ElementRef, private homeService: HomeService, private http: HttpClient, private router: Router) {
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
        this.storage.set('id', this.homeService.homeData.id)
        this.storage.set('name', this.homeService.homeData.name)
        this.storage.set('email', this.homeService.homeData.email)
      }, err => console.log(err))
  }


  async ngOnInit() {
    this.IfLocalStorage()
    this.googleInit();
  }

  public IfLocalStorage() {

    if (this.storage.get('id')) {
      const user = {
        id: this.storage.get('id'),
        name: this.storage.get('name'),
        email: this.storage.get('email'),
      }

      this.homeService.homeData = <HomeData>(
        {
          ...user
        })
      this.router.navigate(['/userPage'])
    } else {
      return
    }
  }


  public auth2: any;

  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: "57345851816-qrlcfpn1p2bdo53sj3ea23ci546bmihk.apps.googleusercontent.com",
        cookiepolicy: 'single_host_origin',
      });
      that.onSignIn(that.element.nativeElement.querySelector(".g-signin2"));
    });
  }

  onSignIn(element: any) {
    const that = this

    this.auth2.attachClickHandler(element, {},
      function (googleUser: any) {

        const id_token = googleUser.getAuthResponse().id_token;
        that.http.post('http://localhost:3000/g-signin', { token: id_token }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .subscribe(res => {
            that.ngZone.run(() => that.router.navigate(['/userPage']))

            that.homeService.homeData = <HomeData>({
              ...res
            })
            that.storage.set('id', that.homeService.homeData.id)
            that.storage.set('name', that.homeService.homeData.name)
            that.storage.set('email', that.homeService.homeData.email)
          }, err => console.log(err))
      })
  }
}
