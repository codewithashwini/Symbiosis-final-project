import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ProductService } from '../../service/product.service';
import { OrderService } from '../../service/order.service';  // Import OrderService
import { User } from '../../model/user';
import { Product } from '../../model/product';
import { Order } from '../../model/order';  // Import Order model
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Removed FormsModule as it's unnecessary here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User = { id: 0, name: '', email: '', password: '' };
  totalProducts: number = 0;
  pendingOrders: number = 0;
  completedOrders: number = 0;
  recentActivities: any[] = [];

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private orderService: OrderService  // Inject OrderService
  ) { }

  ngOnInit(): void {
    this.loadUserData();  // First load the user data
    this.loadTotalProducts();
    this.loadRecentActivities();
  }

  // Load user data and fetch orders only after the user data is loaded
  loadUserData() {
    const userId = 1;  // This could be dynamic (e.g., from session or authentication context)
    this.userService.getUserById(userId).subscribe(
      (userData: User) => {
        this.user = userData;
        // Once user data is loaded, load order data
        if (this.user.id) {
          this.loadOrderData();  // Fetch orders based on user ID
        } else {
          console.error('User ID is not available');
        }
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
  }

  loadTotalProducts() {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.totalProducts = products.length;
      },
      error => {
        console.error('Error fetching product data', error);
      }
    );
  }

  // Fetch pending and completed orders
  loadOrderData() {
    if (this.user.id) {
      this.orderService.getOrdersByUserId(this.user.id).subscribe(
        (orders: Order[]) => {
          this.pendingOrders = orders.filter(order => order.status === 'pending').length;
          this.completedOrders = orders.filter(order => order.status === 'completed').length;
        },
        error => {
          console.error('Error fetching orders data', error);
        }
      );
    } else {
      console.error('User ID is not available');
    }
  }

  loadRecentActivities() {
    // You can replace this hardcoded data with dynamic activities from an API.
    this.recentActivities = [
      { message: 'Added new product', date: '2024-12-25' },
      { message: 'Updated stock quantity', date: '2024-12-24' },
      { message: 'Completed an order', date: '2024-12-23' }
    ];
  }
}
