import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class X8shoppingFormService {

  constructor() { }


  getCreditCardMonths(startMonth: number): Observable<number[]>{
    
    let data: number[] = [];
    // build an array for Months dropDown list

    //start at currentb month and loop until

    for (let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }

    return of(data);
  }


  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];
 // build an array for Year dropDown list

    //start at current Year and loop until

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    
    
    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }


    return of(data);

  }
}
