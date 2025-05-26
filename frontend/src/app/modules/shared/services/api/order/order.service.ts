import { Injectable } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private apiService: ApiServiceService
  ) { }

  storeOrder(id: Number){
    return this.apiService.postAuth(environment.api.endpoints.orders.storeOrder, { product_id: id});
  }

  listOrders(data: any)
  {
    console.log(data);
    
    return this.apiService.getAuth(environment.api.endpoints.orders.listOrders, data)
  }

  deleteOrder(id: Number)
  {
    return this.apiService.postAuth(environment.api.endpoints.orders.deleteOrder, { order_id: id});
  }
}
