import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

constructor(private formBuilder: FormBuilder){

}


  ngOnInit(): void {
   this.checkoutFormGroup = this.formBuilder.group({
    customer: this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['']

    }),

    shippingAddress: this.formBuilder.group({
            street: [''],
            city: [''],
            country: [''],
            zipCode: [''],
            state: ['']
            

    }),
    billingAddress: this.formBuilder.group({
      street: [''],
      city: [''],
      country: [''],
      zipCode: [''],
      state: ['']
      

}),
creditCardAddress: this.formBuilder.group({
  cardType: [''],
  nameOnCard: [''],
  cardNumber: [''],
  securityCode: [''],
  expirationMonth: [''],
  expirationYear: ['']
  
  

})



   });
  }

  copyShippingAddressToBillingAddress(event: Event) {
    const mouseEvent = event as MouseEvent;
    if (mouseEvent.target instanceof HTMLInputElement && mouseEvent.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }



  onSubmit(){
    console.log("handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log("this emaim adresse  is " + this.checkoutFormGroup.get('customer')?.value.email);
  }



  
}
