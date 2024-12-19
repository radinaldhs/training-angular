import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartItem } from '../../state/cart/cart.state';
import { selectCartItemCount } from '../../state/cart/cart.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
})
export class NavbarComponent {
  cartItemCount$: Observable<number>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.cartItemCount$ = this.store.select(selectCartItemCount);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
