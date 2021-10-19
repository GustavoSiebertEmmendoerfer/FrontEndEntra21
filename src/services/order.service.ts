import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderItemFormComponent } from 'src/components/order-item-form/order-item-form.component';
import { Order } from 'src/models/order';
import { OrderResponse } from 'src/models/orderResponse';
import { Plate } from 'src/models/plate';
import { ResponseModel } from 'src/models/response';
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
  readonly OrdersItemURL = `https://localhost:44308/api/OrderItem`
  selectedPlate: Plate
  OrderList : OrderResponse[] = []
  OrderID : OrderResponse

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

    return this.http.post<ResponseModel>(this.OrdersURL, body).subscribe();
  }

  ListOrder() {
    this.http
      .get<ResponseModel>(`https://localhost:44308/api/Orders/userOrders/${this.serviceLogin.user.email}`)
      .toPromise()
      .then((res) => this.OrderList = res.dateSet as OrderResponse[]);
  }

  postOrderItem(i:number) {

    const body = {
      quantity : i,
      orderId : 16,
      plateId: this.selectedPlate.plateId
    }

    return this.http.post<ResponseModel>(this.OrdersItemURL, body).subscribe(x=>console.log(x.dateSet));
  }

}
