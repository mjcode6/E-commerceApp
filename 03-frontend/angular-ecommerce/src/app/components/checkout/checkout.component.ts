import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { X8shoppingFormService } from '../../services/x8shopping-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

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

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];


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

// populate countries

this.x8ShoppingFormService.getCountries().subscribe(
  data => {
    console.log("Retrived countries: " + JSON.stringify(data));
    this.countries = data;
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


  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);


    // if current year equels the selected year , then start with current month

    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth()+ 1;
    }else{
      startMonth = 1;
    }


    this.x8ShoppingFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrived credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }
  getStates(formGroupName: string){
     const formGroup = this.checkoutFormGroup.get(formGroupName);

     const countryCode = formGroup?.value.country.code;
     const countryName = formGroup?.value.country.name;

     console.log(`{formGroupName} countryCode: ${countryCode}`);
     console.log(`{formGroupName} countryName: ${countryName}`);
  }
}
