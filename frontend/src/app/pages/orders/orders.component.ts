import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../modules/shared/services/api/order/order.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  orders: Order[] =  [];

  constructor(
    private orderApiService: OrderService
  ){

  }

  ngOnInit(): void {
    this.retrieveOrders();
  }

  retrieveOrders(){
    this.orderApiService.listOrders()
      .subscribe({
        next: (res: any) => {
          console.log(res[0]);
          
          this.orders = res
          
        },
        error: (err) => {
          console.log(err);
          
        }
      })
  }
}
