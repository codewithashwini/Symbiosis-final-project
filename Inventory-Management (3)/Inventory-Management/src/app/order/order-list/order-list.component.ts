import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Order } from '../../model/order';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string = '';
  user: any;
  isLoading: boolean = true;  // Declare isLoading property and initialize it to true

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
      },
      error => {
        console.error('Error fetching orders!', error);
      }
    );
  }

  // Navigate to the update page for an order
  updateOrder(orderId: number | undefined): void {
    if (orderId) {
      this.router.navigate(['/order-update', orderId]);  // Navigate to the order-update route with the ID
    } else {
      console.error('Order ID is not available');
    }
  }

  // Delete order by ID
  deleteOrder(orderId: number | undefined): void {
    if (orderId) {
      if (confirm('Are you sure you want to delete this order?')) {
        this.orderService.deleteOrder(orderId).subscribe(
          () => {
            console.log('Order deleted successfully');
            this.loadOrders();  // Reload the order list after deletion
          },
          (error) => {
            console.error('Error deleting order', error);  // Log error if deletion fails
          }
        );
      }
    } else {
      console.error('Order ID is not available for deletion');
    }
  }

  // Navigate to the order creation page
  createNewOrder(): void {
    this.router.navigate(['/add-order']);  // Navigate to the order-create page
  }


  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  editOrder(orderId: number | undefined): void {
    if (orderId !== undefined) {
      this.router.navigate(['/edit-order', orderId]);
    } else {
      console.error('Order ID is not available');
    }
  }
}
