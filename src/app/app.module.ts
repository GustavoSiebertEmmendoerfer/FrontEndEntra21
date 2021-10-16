import {
  MatCommonModule,
  MatNativeDateModule,
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions,
} from '@angular/material/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { SideNavComponent } from '../views/side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from '../views/not-found/not-found.component';
import { MenuComponent } from '../views/menu/menu.component';
import { ClientRegisterFormComponent } from '../components/client-register-form/client-register-form.component';
import { ToastrModule } from 'ngx-toastr';
import { RestaurantRegisterFormComponent } from '../components/restaurant-register-form/restaurant-register-form.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { ProfileRestaurantComponent } from '../views/profile-restaurant/profile-restaurant.component';
import { AddPlateFormComponent } from '../components/add-plate-form/add-plate-form.component';
import { DeleteConfirmFormComponent } from '../components/delete-confirm-form/delete-confirm-form.component';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  terminateOnPointerUp: true,
  animation: {
    enterDuration: 0,
    exitDuration: 0,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    NotFoundComponent,
    MenuComponent,
    ClientRegisterFormComponent,
    RestaurantRegisterFormComponent,
    LoginFormComponent,
    ProfileRestaurantComponent,
    AddPlateFormComponent,
    DeleteConfirmFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
