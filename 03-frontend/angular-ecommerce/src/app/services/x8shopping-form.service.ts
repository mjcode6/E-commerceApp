import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { State } from '@popperjs/core';

@Injectable({
  providedIn: 'root'
})
export class X8shoppingFormService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<getResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }


  getStates(theCountryCode: string): Observable<State[]>{
    // search url
    const searcStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<getResponseStates>(searcStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }


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


interface getResponseCountries{
  _embedded: {
    countries: Country[]
  }
}



interface getResponseStates{
  _embedded: {
    states: State[]
  }
}