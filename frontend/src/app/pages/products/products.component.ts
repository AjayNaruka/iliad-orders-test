import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../modules/shared/services/api/product/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: Product[] =  [];
  constructor(
    private productApiService: ProductService
  ){
    
  }
  
    ngOnInit(): void{      
      this.getProducts();
    }

    getProducts(){
    this.productApiService.getProducts()
      .subscribe(
        (response: any) => {
          this.products = response;
          console.log(this.products);
          
        }
      );
    }

}
