import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoreComponent } from './store/store.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'store',component:StoreComponent},
  {path:'addrestaurant',component:AddRestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
