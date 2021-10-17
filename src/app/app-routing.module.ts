import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guard/auth.guard';
import { MenuComponent } from 'src/views/menu/menu.component';
import { NotFoundComponent } from 'src/views/not-found/not-found.component';
import { ProfileRestaurantComponent } from 'src/views/profile-restaurant/profile-restaurant.component';

const routes: Routes = [

  { path: 'menu', component: MenuComponent },
  { path: 'profile-restaurant', component: ProfileRestaurantComponent },
  { path: 'restaurant/:restaurantName', component: ProfileRestaurantComponent,canActivate:[AuthGuard]},
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
