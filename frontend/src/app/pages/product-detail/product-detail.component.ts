import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../modules/shared/services/api/product/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../modules/shared/services/auth-service.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  private id: number = 0;
  constructor(
    private route: ActivatedRoute,
    private productApiService: ProductService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('GET DETAIL DATA...');
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.productApiService.getProductDetail(this.id).subscribe({
        next: (response: Product) => {
          this.product = response;
        },
        error: (err) => {
          console.error('API error:', err);
          // GO TO 404
        },
      });
    }
  }

  createOrder():void{
    if (this.authService.isLoggedIn()) {
      console.log(console.log("CREATE ORDER"));
    } else {
      const returnUrl = this.router.url;
      this.router.navigate(['/login'], { queryParams: { returnUrl } });
      console.log("GO TO LOGIN PAGE");
    }
    
  }
}
