import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

export const routes: Routes = [
    {path: "", component: HomepageComponent},
    {path: "login", component: LoginComponent},
    {path: "products", component: ProductsComponent}
];
