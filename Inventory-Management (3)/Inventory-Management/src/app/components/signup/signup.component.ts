import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';  // Import the UserService
import { User } from '../../model/user';  // Import the User model
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule, RouterLink,CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = {
    name: '',
    email: '',
    password: '',
  };
  
  confirmPassword: string = '';

  errorMessage: string = '';

  // Inject UserService and Router into the constructor
  constructor(private router: Router, private userService: UserService) {}
  // This method will handle the form submission and interact with the backend
  onSubmit(signupForm:NgForm) {
    console.log(this.confirmPassword)
    if (this.user.password === this.confirmPassword) {
      // Call the signup method from UserService to create a new user
      this.userService.signup(this.user).subscribe({
        next: () => {
          console.log('Signup successful');
          this.router.navigate(['/login']);  // Redirect to the login page after successful signup
        },
        error: (err) => {
          console.error('Signup failed:', err);
          this.errorMessage = 'Signup failed. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Passwords do not match';
    }
  }
}
