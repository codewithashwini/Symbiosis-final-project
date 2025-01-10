import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
// import { OrderCreateComponent } from './order/create-order/create-order.component';
// import { OrderListComponent } from './order/order-list/order-list.component';

export const routes: Routes = [
  { path: 'home', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'product-list', component: ProductListComponent }, 
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'add-order', component:  CreateOrderComponent},
  { path: 'order-list', component: OrderListComponent},
  { path: 'edit-order', component: EditProductComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Add a default route
];
