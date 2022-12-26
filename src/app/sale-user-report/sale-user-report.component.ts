import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { filter, retry, toArray } from 'rxjs/operators';
import { DatabaseService } from 'src/_services/DatabaseService';
import { PearlService } from 'src/app/pearl.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-sale-user-report',
  templateUrl: './sale-user-report.component.html',
  styleUrls: ['./sale-user-report.component.scss']
})
export class SaleUserReportComponent implements OnInit {
  ReportIncentiveList: any = [];
  ReportIncentiveBrandList: any = [];
  skelton: any = new Array(10);
  loader: boolean = false;
  search_val: any = {};
  category_list: any = [];
  brand;
  tmp_category: any = [];
  category;
  tmp_subcategory: any = [];
  download_User_Report_excel_data: any = []
  new_array: any = [];
  excel_data: any = [];
  pagelimit: any = 50;

  ReportIncentiveBrandList2: any = [];
  constructor(public serve: PearlService) {
    this.search_val = {
      active_tab: 'Market',
      'start': this.ReportIncentiveList.length,
      'pagelimit': this.pagelimit
    };
    this.getReportIncentive();
    this.getCategoryList();

  }

  ngOnInit() {
  }

  refresh() {
    this.search_val = {};
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

  getReportIncentive() {
    this.loader = true;
    this.serve.fetchData({ 'search': this.search_val }, 'User/userPointMaster').pipe(
      retry(3)
    ).subscribe((res) => {
      console.log(res);
      this.loader = false;
      this.ReportIncentiveList = res['userData'];
      this.ReportIncentiveBrandList = res['BrandList'];
      this.ReportIncentiveBrandList2 = res['BrandList'];
    }, err => {
      this.loader = false;
    })
  }


  filterBrandData(brand_name) {
    const totalBrand = from(this.ReportIncentiveBrandList2);
    console.log(totalBrand);
    totalBrand.pipe(filter((data: any) => data.brand_name.toUpperCase() == brand_name.toUpperCase()), toArray()).subscribe((res) => {
      console.log(res);
      this.ReportIncentiveBrandList2 = res;
      console.log(this.ReportIncentiveBrandList2);
      if (this.ReportIncentiveBrandList2.length > 0) {
        return this.ReportIncentiveBrandList = this.ReportIncentiveBrandList2
      }
      else {
        return this.ReportIncentiveBrandList;
      }
    })


  }

  tempSearch: any = '';

  filterBrandListData(brand_name) {
    brand_name = brand_name.toUpperCase();
    this.tempSearch = '';
    this.ReportIncentiveBrandList = [];
    for (let i = 0; i < this.ReportIncentiveBrandList2.length; i++) {
      this.tempSearch = this.ReportIncentiveBrandList2[i].brand_name.toUpperCase();

      if (this.tempSearch.search(brand_name)) {
        this.ReportIncentiveBrandList.push(this.ReportIncentiveBrandList2[i]);
      }

    }


  }

  onBetweenDate(event, tab) {
    console.log(event);
    console.log(tab);
    if (tab == 'date_from') {
      this.search_val.date_from = moment(event.value).format('YYYY-MM-DD');
    }
    if (tab == 'date_to') {
      this.search_val.date_to = moment(event.value).format('YYYY-MM-DD');

    }
  }

  exportAsXLSX() {
    console.log("download_excel method calls");
    this.excel_data = [];
    this.loader = true;
    this.serve.fetchData({ 'search': this.search_val }, 'User/userPointMaster').subscribe((result => {
      console.log(result);
      this.loader = false;
      this.download_User_Report_excel_data = result['userData'];
      console.log(this.download_User_Report_excel_data);

      for (let i = 0; i < this.download_User_Report_excel_data.length; i++) {

        let keys_value: any = [];
        keys_value = Object.keys(this.download_User_Report_excel_data[i])

        let excel_object: any = {}

        for (let secondary_index = 0; secondary_index < keys_value.length; secondary_index++) {
          excel_object[keys_value[secondary_index]] = this.download_User_Report_excel_data[i][keys_value[secondary_index]]
        }

        this.excel_data.push(excel_object)

      }
      console.log(this.excel_data);
      this.serve.exportAsExcelFile(this.excel_data, 'PRODUCT SHEET');
      setTimeout(() => {

      }, 700);
    }), err => {
      this.loader = false;

    })

  }

}
