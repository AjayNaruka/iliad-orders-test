import { Injectable } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../../../../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private apiService: ApiServiceService
  ) { }

  getProducts(){
    return this.apiService.get(environment.api.endpoints.products.listProducts)
  }

  getProductDetail(id: number): Observable<Product>
  {
    return this.apiService.get(environment.api.endpoints.products.detailProduct + "/" + id)
  }
  
}
