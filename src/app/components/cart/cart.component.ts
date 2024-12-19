import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { clearCart, removeFromCart } from '../../state/cart/cart.actions';
import { CartItem } from '../../state/cart/cart.state';
import {
  selectCartItemCount,
  selectCartItems,
} from '../../state/cart/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: false,
})
export class CartComponent {
  cartItems$;
  totalItems$;

  constructor(private store: Store<{ cart: { items: CartItem[] } }>) {
    this.cartItems$ = this.store.pipe(select(selectCartItems));
    this.totalItems$ = this.store.pipe(select(selectCartItemCount));
  }

  removeItem(pokemonName: string): void {
    this.store.dispatch(removeFromCart({ pokemonName }));
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }
}
