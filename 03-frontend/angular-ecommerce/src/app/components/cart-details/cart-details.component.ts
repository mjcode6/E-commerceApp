import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/CartItem';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {


  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  
  constructor(private cartService: CartService){

  }
  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
   // get a handle to the cart items
   this.cartItems = this.cartService.cartItems;

   // subcribe to the catrt total price
   this.cartService.totalPrice.subscribe(
    data => this.totalPrice = data
   );

   //subcribe to the cart total quantity
   this.cartService.totalQuantity.subscribe(
    data => this.totalQuantity = data
   );

   // compute cart total price and quantity
        this.cartService.computeCartTotals();
  }

}
