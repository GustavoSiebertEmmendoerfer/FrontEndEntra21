import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-order-item-form',
  templateUrl: './order-item-form.component.html',
  styleUrls: ['./order-item-form.component.css']
})
export class OrderItemFormComponent implements OnInit {
  value = 1;
  

  constructor(
    public serviceOrder: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  createOrder() {
    this.serviceOrder.postOrder()
    this.serviceOrder.ListOrder()
    this.serviceOrder.postOrderItem(this.value)
  }

}
