import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { X8shoppingFormService } from '../../services/x8shopping-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

constructor(private formBuilder: FormBuilder,
  private x8ShoppingFormService: X8shoppingFormService
){

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

// populate credit card months
const startMonth: number = new Date().getMonth() + 1;
console.log("start montn " + startMonth);

this.x8ShoppingFormService.getCreditCardMonths(startMonth).subscribe(
  data => {
    console.log("Retrived credit card month: " + JSON.stringify(data));
    this.creditCardMonths = data;
  }

);


// populate credit card years

this.x8ShoppingFormService.getCreditCardYears().subscribe(
  data => {
    console.log("Retrived credit card year: " + JSON.stringify(data));
    this.creditCardYears = data;
  }

);


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
