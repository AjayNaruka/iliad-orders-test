import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../modules/shared/services/api/order/order.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  searchForm: FormGroup;

  constructor(private orderApiService: OrderService, formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group({
      search: ['', Validators.required],
      order: ['date_desc', Validators.required],
    });
  }

  ngOnInit(): void {
    this.retrieveOrders();
    this.searchForm.valueChanges.subscribe((value) => {
      this.retrieveOrders();
      console.log(this.orders);
      
    });
  }

  retrieveOrders() {
    this.orderApiService.listOrders(this.searchForm.value).subscribe({
      next: (res: any) => {
        this.orders = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteOrder(orderId: Number): void {
    this.orderApiService.deleteOrder(orderId).subscribe({
      next: (res) => {
        console.log(res);
        this.retrieveOrders();
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
