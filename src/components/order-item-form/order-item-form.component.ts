import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  }

}
