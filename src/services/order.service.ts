import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderItemFormComponent } from 'src/components/order-item-form/order-item-form.component';
import { Plate } from 'src/models/plate';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http:HttpClient,
    public dialogRef: MatDialog,
    public serviceLogin: LoginService,
    public router: Router
  ) { }

  readonly OrdersURL = `https://localhost:44308/api/Orders`
  selectedPlate: Plate

  openOrderItemModal(selectedPlate: Plate) {
    const dialogRef = this.dialogRef.open(OrderItemFormComponent)
    dialogRef.disableClose = true
    this.selectedPlate = selectedPlate
  }

  postOrder() {

    const body = {
      ClientEmail: this.serviceLogin.user.email,
      RestaurantEmail: this.router.url.substring(12)
    }

    return this.http.post(this.OrdersURL, body);
  }

  postOrderItem() {

    const body = {
    }

    return this.http.post(this.OrdersURL, body);
  }

}
