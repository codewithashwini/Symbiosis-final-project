import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { Order } from '../../model/order';  // Assuming you have an Order model
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-create-order',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  // Order object
  order: Order = {
    product: '',      // This will be the product ID, assuming the frontend sends it as a string
    quantity: 0,
    status: 'pending',
    orderdate: ''     // A string representing the order date
  };

  // Array to hold products fetched from the backend
  products: Product[] = [];

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private orderService: OrderService,
    private productService: ProductService,  // Inject ProductService
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the products from the backend when the component is initialized
    this.fetchProducts();
  }

  // Fetch the products from the backend
  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Error fetching products!';
      }
    );
  }

  // Handle order creation
  onSubmit(orderForm: NgForm): void {
    if (orderForm.valid) {
      this.orderService.createOrder(this.order).subscribe(
        (response) => {
          this.successMessage = 'Order created successfully!';
          orderForm.reset();
          this.router.navigate(['/dashboard']);  // Navigate to orders list
        },
        (error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.errorMessage = 'Unable to connect to the server. Please try again later.';
          } else {
            this.errorMessage = 'Error creating order!';
          }
          console.error('Error:', error);
        }
      );
    }
  }
}