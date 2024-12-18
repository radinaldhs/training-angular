import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: false,
})
export class AuthComponent implements OnInit {
  activeTab: string = 'login';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  user: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user) {
      this.router.navigate(['/']);
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  async login(): Promise<void> {
    try {
      await this.authService.login(this.email, this.password);
      this.user = this.authService.getUser();
      this.router.navigate(['/']);
    } catch (error) {}
  }

  async register(): Promise<void> {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await this.authService.register(this.email, this.password);
      this.user = this.authService.getUser(); // Update user state
      this.router.navigate(['/auth']);
    } catch (error) {
      // Handle error if needed
    }
  }
}
