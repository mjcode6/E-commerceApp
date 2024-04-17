import { Injectable } from '@angular/core';
import { CartItem } from '../common/CartItem';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() { }

  addToCart(theCartItem: CartItem){
    // check if we already have item in our cart
let alreadyExistsInCart: boolean = false;
let exisitingCatrItem!: CartItem;


if(this.cartItems.length > 0){
//  find the item in the cart based on item id
for(let tempCartItem of this.cartItems){
  if(tempCartItem.id === theCartItem.id){
    exisitingCatrItem = tempCartItem;
    break;
  }
}

    // check if we found it

   alreadyExistsInCart = (exisitingCatrItem != undefined);

}
if(alreadyExistsInCart){
 // increment the quantity

 exisitingCatrItem.quantity++;

}else{
  // just add the item in to the array

  this.cartItems.push(theCartItem);
}
 
    // compute cart total price and total quantity

    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;


    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // published the new value ... and remember all customer will recive new data

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart datab just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
 



  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("Contents of the cart:");

    for (let tempCartItem of this.cartItems) {
        const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
        console.log(`Name: ${tempCartItem.name}, Quantity: ${tempCartItem.quantity}, Unit Price: ${tempCartItem.unitPrice}, Subtotal Price: ${subTotalPrice}`);
    }
    console.log(`Total Price: ${totalPriceValue.toFixed(2)}, Total Quantity: ${totalQuantityValue}`);

    console.log("_____");
}

}
