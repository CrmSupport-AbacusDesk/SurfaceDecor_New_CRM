import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { filter, retry, toArray } from 'rxjs/operators';
import { DatabaseService } from 'src/_services/DatabaseService';
import { PearlService } from 'src/app/pearl.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-report-incentive-list',
  templateUrl: './report-incentive-list.component.html',
  styleUrls: ['./report-incentive-list.component.scss']
})
export class ReportIncentiveListComponent implements OnInit {
  ReportIncentiveList:any=[];
  ReportIncentiveBrandList:any=[];
  skelton:any=new Array(10);
  loader:boolean=false;
  search_val:any={};
  category_list: any = [];
  brand;
  tmp_category: any = [];
  category;
  tmp_subcategory: any = [];
  new_array:any=[];
  ReportIncentiveBrandList2:any=[];
  constructor(public serve: PearlService) { 
    this.getReportIncentive();
    this.getCategoryList();
   
  }

  ngOnInit() {
  }

  refresh(){
    this.search_val={};
    this.getReportIncentive();
  }
  getCategoryList() {
    this.serve.fetchData(0, "Product/product_category_list").subscribe((result) => {
      this.category_list = result['category'];
      this.tmp_category = this.category_list;
      console.log(this.tmp_category);

    });
  }

  category_array_filter(data, array) {
    this.category_list = this.filterList(data.toUpperCase(), array);
  }
  filterList(search_word, search_array) {
    this.new_array = [];
    console.log(search_array);
    console.log(search_word);
    for (var i = 0; i < search_array.length; i++) {
      if (search_array[i].category.toUpperCase().search(search_word) !== -1) {
        this.new_array.push(search_array[i]);
      }
    }
    return this.new_array;
  }

  getReportIncentive(){
    this.loader=true;
    this.serve.fetchData({'search':this.search_val},'User/brandPointMaster').pipe(
      retry(3)
    ).subscribe((res)=>{
      console.log(res);
      this.loader=false;
      this.ReportIncentiveList=res['incentiveMaster'];
      this.ReportIncentiveBrandList=res['brandData'];
      this.ReportIncentiveBrandList2=res['brandData'];
    },err=>{
      this.loader=false;
    })
  }


  filterBrandData(brand_name){
    const totalBrand=from(this.ReportIncentiveBrandList2);
    console.log(totalBrand);
    totalBrand.pipe(filter((data:any)=>data.brand_name.toUpperCase() == brand_name.toUpperCase() ),toArray()).subscribe((res)=>{
      console.log(res);
      this.ReportIncentiveBrandList2=res;
        console.log(this.ReportIncentiveBrandList2);
        if(this.ReportIncentiveBrandList2.length>0){
          return this.ReportIncentiveBrandList=this.ReportIncentiveBrandList2
        }
        else{
          return this.ReportIncentiveBrandList;
        }
    })


  }


  onBetweenDate(event,tab){
    console.log(event);
    console.log(tab);
    if(tab=='date_from'){
      this.search_val.date_from=moment(event.value).format('YYYY-MM-DD');
    }
    if(tab=='date_to'){
      this.search_val.date_to=moment(event.value).format('YYYY-MM-DD');

    }
  }

}
