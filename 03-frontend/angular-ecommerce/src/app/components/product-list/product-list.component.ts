import { Component, OnInit } from '@angular/core';

import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';



@Component({
  selector: 'app-product-list',
 
  templateUrl: './product-list-grid.component.html',
  
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;

  // new properties for pagination

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;


  previousKeyword: string = "";
  theKeyWord: any;
  


  constructor(private productService: ProductService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  
  }
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
    
 }


  handleSearchProducts() {
   const theKeyWord:string = this.route.snapshot.paramMap.get('keyword')!;

// if we have diffrent keyword than previous 

//then set thePageNumber to 1
//
//

if(this.previousKeyword != theKeyWord){
  this.thePageNumber = 1;
}

this.previousKeyword = theKeyWord;

console.log(`theKeyword=${this.theKeyWord}, thePageNumber=${this.thePageNumber}`);

   // now search forthe product using keyword
   this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                              this.thePageSize,
                                              theKeyWord
   ).subscribe(this.processResult());
   
  }

  handleListProducts(){
// check if "id" parameter is available
const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

if (hasCategoryId) {
  // get the "id" param string. convert string to a number using the "+" symbol
  this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

  // get the "name" param string
  this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
}else {
  // if category in is not available ... default to category id number 1
  this.currentCategoryId = 1;
  this.currentCategoryName = 'Books';
}



//
// check if we have diffrent category than previous
// note: Angular will reuse the component if it is currently viewed

// if we have a diffrent category id than previous
// then set a pageNumber back to one

if(this.previousCategoryId != this.currentCategoryId){
  this.thePageNumber = 1;
}

this.previousCategoryId = this.currentCategoryId;
console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

// now get the product for the given category id



this.productService.getProductListPaginate(this.thePageNumber - 1,
                                          this.thePageSize,
                                          this.currentCategoryId
).subscribe(
 this.processResult()
);

  }

  updatePageSize(pageSize: string){

    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult(){
    return(data: any) => {
     
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }
  
addToCart(theProduct: Product){
console.log(`Add to Cart: ${theProduct.name}, ${theProduct.unitPrice}`);

// have to do some real work..
}



}
