import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RegisterComponent implements OnInit {
  model = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  };

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Create Account — Island Adventure Gear');
    // If already logged in, redirect
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (!this.model.firstName || !this.model.email || !this.model.password) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.model).subscribe({
      next: (res) => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err.error?.error || 'Registration failed. Please try again.';
      },
    });
  }
}
