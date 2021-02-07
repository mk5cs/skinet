import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  products!: IProduct[];
  brands!: IBrand[];
  types!: IType[];
  shopParams = new ShopParams();
  totalCount!: number;


  sortOptiones = [
    { name: 'Alphabetical', value: 'name'},
    { name: 'Price: Low to High', value: 'priceAsc'},
    { name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shoService: ShopService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getProducts();
    this.getTypes();

  }

  getProducts() {
    this.shoService.getProducts(this.shopParams).subscribe((response: any) => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    });
  }

  getBrands() {
    this.shoService.getBrands().subscribe((response: any) => {
      this.brands = [{id:0,name:'All'}, ...response];
    });
  }

  getTypes() {
    this.shoService.getTypes().subscribe((response: any) => {
      this.types = [{id:0,name:'All'}, ...response];;
    });
  }

  onBrandSelected(brandId : number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelcted(typeId: number)
  {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event)
    {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }

  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
