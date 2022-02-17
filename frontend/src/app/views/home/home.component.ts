import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import axios from 'axios'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string = '';
  password: string = '';


  async click(){
    await this.http.post('http://localhost:3000/signin', {
      email: this.email, password: this.password
    })
    .subscribe(res => console.log(res), err => console.log(err))
    
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
