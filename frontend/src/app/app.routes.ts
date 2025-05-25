import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { authGuard } from './auth.guard';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
    {path: "", component: HomepageComponent},
    {path: "login", component: LoginComponent, canActivate: [authGuard]},
    {path: "products", component: ProductsComponent},
    {path: "products/:id", component: ProductDetailComponent}
];
