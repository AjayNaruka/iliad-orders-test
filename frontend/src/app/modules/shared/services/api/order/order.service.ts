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
    return this.apiService.postAuth(environment.api.endpoints.orders.storeProducts, { product_id: id});
  }
}
