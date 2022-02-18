import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { UserPageComponent } from './views/user-page/user-page.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "userPage",
    component: UserPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
