import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersByClientComponent } from 'src/components/orders-by-client/orders-by-client.component';
import { MenuComponent } from 'src/views/menu/menu.component';
import { NotFoundComponent } from 'src/views/not-found/not-found.component';
import { ProfileRestaurantComponent } from 'src/views/profile-restaurant/profile-restaurant.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'restaurant/:restaurantEmail', component: ProfileRestaurantComponent},
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  {path: 'Orders/:UserEmail',component: OrdersByClientComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
