import { Injectable, EventEmitter } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { HomeData } from './home-data.model';



@Injectable({
  providedIn: 'root'
})
export class HomeService {

  emitirUsuarioProps = new EventEmitter<Object>();

  private _homeData = new BehaviorSubject<HomeData>({
    admin: false,
    email: '',
    exp: 0,
    iat: 0,
    id: 0,
    name: '',
    token: ''
  })

  constructor() { }

  get homeData() : HomeData{
    return this._homeData.value
  }

  set homeData(homeData: HomeData){
    this._homeData.next(homeData)
  }

}
 