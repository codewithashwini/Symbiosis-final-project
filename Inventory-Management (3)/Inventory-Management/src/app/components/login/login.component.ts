import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service'; // Import AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, RouterLink],  // Correct usage of FormsModule and RouterModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private authService: UserService, private router: Router) {} // Inject AuthService

  // This method will handle the form submission
  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      // Call the login service with form values
      this.authService.login(this.user.email, this.user.password).subscribe({
        next: () => {
          // Handle success: navigate to dashboard or some other page
          this.router.navigate(['/dashboard']); // Adjust the route as necessary
        },
        error: () => {
          // Handle error: display error message
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      });
    } else {
      // Form is invalid, you can handle form validation errors here
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
