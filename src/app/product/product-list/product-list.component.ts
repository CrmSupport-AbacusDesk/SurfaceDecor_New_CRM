import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { PearlService } from 'src/app/pearl.service';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LocalStorage } from 'src/app/localstorage.service';
import { MatDialog } from '@angular/material';
import { StatusModalComponent } from 'src/app/order/status-modal/status-modal.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  animations: [slideToTop()]
})
export class ProductListComponent implements OnInit {
  productlist: any = [];
  tmp_productList: any = [];
  filter: any = false;
  data: any = [];
  page_limit: any = 50;
  start: any = 0;
  brand_list: any = [];
  product_brand: any = [];
  count: any;
  category_list: any = [];
  subCategory_list: any = [];
  total_page: any = '';
  pagenumber: any = '';
  loader: any;
  data_not_found = false;
  skelton: any = {}
  tab_active = 'all';
  scheme_active_count: any;
  download_product_excel_data: any;
  excel_data: any = [];
  updated_value =  '0' ;
  upper_lower_type = 'not_select_anything';
  assign_login_data: any = [];
  view_edit: boolean = true;
  view_add: boolean = true;
  view_delete: boolean = true;

  selected_category_name: any = ''
  login_user = JSON.parse(sessionStorage.getItem('st_user'));

  constructor(public dialog: DialogComponent, public secondary_dialog: MatDialog, public serve: PearlService, public rout: Router, public toast: ToastrManager, public session: LocalStorage,public alert:DialogComponent) {

    this.skelton = new Array(10);
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'product master');
    console.log(index);

    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;

    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);

    this.data.stock_type = 'all'

    this.data= this.serve.productListSearch;
    this.start= this.serve.productStart;


    this.getProductList('all');
    this.getCategoryList();
    this.status_product();
  }

  ngOnInit() {

    console.log(this.start);

  }

  getProductList(type) {
    this.tab_active = type;

    this.loader = 1;

    this.serve.fetchData({ 'brand': this.data.brand, 'category': this.data.category, 'sub_category': this.data.sub_category, "product_name": this.data.product_name, "cat_no": this.data.cat_no, "stock_type": this.data.stock_type, 'start': this.start, 'pagelimit': this.page_limit, 'sch_status': this.data.scheme_status, 'type': type, 'design_code': this.data.design_code, 'product_finish': this.data.product_finish,'status_code':this.data.status_code,'panel_code':this.data.panel, 'status':this.data.status , 'stock_qty' : this.data.updated_value , 'search_type':this.data.upper_lower_type , 'discontinued': this.data.discontinues }, "Product/product_list").subscribe((result) => {
      this.productlist = result['product_list'];
      this.count = result['count'];
      this.scheme_active_count = result['scheme_active_count'];
      if (this.productlist.length == 0) {
        console.log("yes");
      }
      this.total_page = Math.ceil(this.count/ this.page_limit );
      console.log("this total page",this.count / this.page_limit)
      this.pagenumber = Math.ceil(this.start / this.page_limit) + 1;
      this.tmp_productList = this.productlist;
      this.serve.productListSearch ={};
      this.serve.productStart =0;
      setTimeout(() => {
        this.loader = '';
      }, 700);
      if (this.productlist.length == 0) {
        this.data_not_found = true;
      } else {
        this.data_not_found = false;

      }
    })
  }



  exportAsXLSX() {
    console.log("download_excel method calls");
    this.excel_data = [];
    console.log(this.data);

    this.serve.fetchData({ 'category': this.data.category, 'sub_category': this.data.sub_category, "product_name": this.data.product_name, "cat_no": this.data.cat_no }, "Product/product_list_excel").subscribe((result => {
      console.log(result);
      this.download_product_excel_data = result['product_list'];
      console.log(this.download_product_excel_data);

      for (let i = 0; i < this.download_product_excel_data.length; i++) {

        let keys_value: any = [];
        keys_value = Object.keys(this.download_product_excel_data[i])

        let excel_object: any = {}

        for (let secondary_index = 0; secondary_index < keys_value.length; secondary_index++) {
          excel_object[keys_value[secondary_index]] = this.download_product_excel_data[i][keys_value[secondary_index]]
        }

        this.excel_data.push(excel_object)

      }
      console.log(this.excel_data);
      this.serve.exportAsExcelFile(this.excel_data, 'PRODUCT SHEET');
      setTimeout(() => {

      }, 700);
    }))

  }


  goToDetailHandler(pId) {

    console.log(pId);
    window.open(`/product-detail/` + pId);
  }


  deleteProduct(id) {
    this.dialog.delete('Product Data !').then((result) => {
      if (result) {
        console.log('Test Done');
        let value = { "id": id }
        this.serve.fetchData(value, "Product/delete_product").subscribe((result) => {
          if (result) {
            this.getProductList('all');
          }
        });
      }
    });
  }


  refresh() {
    this.data=[];
    this.start=0
    this.getProductList('all');
  }


  productdetail: any = [];

  detailProduct(id) {
    let value = { "id": id }
    this.serve.fetchData(value, "Product/product_detail").subscribe((result => {
      this.productdetail = result['product_detail'];
      if (result) {
        this.rout.navigate(['/product-detail/' + id]);
      }
    }))
  }

  Filter() {
    this.filter = true;
  }
  close() {
    this.filter = false;
  }

  clear() {
    this.data.brand = "";
    this.data.category = "";
    this.data.sub_category = "";



    this.refresh();
  }



  brand;
  tmp_category: any = [];
  category;
  tmp_subcategory: any = [];
  getCategoryList() {
    this.serve.fetchData(0, "Product/product_category_list").subscribe((result) => {
      this.category_list = result['category'];
      this.tmp_category = this.category_list;
      console.log(this.tmp_category);

    });
  }

  getSubCategoryList() {
    this.category = this.data.category;
    let value = { "brand": this.brand, "category": this.category };

    this.serve.fetchData(value, "Product/product_sub_category_list").subscribe((result) => {
      this.subCategory_list = result['sub_category'];
      this.tmp_subcategory = this.subCategory_list;
      console.log(this.tmp_subcategory);

    });
  }

  brand_array_filter(data, array) {

    this.brand_list = this.filterList(data.toUpperCase(), array);
  }

  category_array_filter(data, array) {
    this.category_list = this.filterList(data.toUpperCase(), array);
  }
  sub_categoryy_array_filter(data, array) {
    this.subCategory_list = this.filterList(data.toUpperCase(), array);
  }

  new_array: any = [];
  filterList(search_word, search_array) {
    this.new_array = [];
    for (var i = 0; i < search_array.length; i++) {
      if (search_array[i].toUpperCase().search(search_word) !== -1) {
        this.new_array.push(search_array[i]);
      }
    }
    return this.new_array;
  }

  go_to(where: any = '', id: any = '0') {

    console.log("go_to method calls");
    console.log("where = " + where);


    if (where == 'production_plan') {
      this.rout.navigate(['/production-plan-list/']);
    }


    else if (where == 'update_category') {

      console.log("no dialog box wil open")
      // const dialogRef = this.secondary_dialog.open(StatusModalComponent, {
      //   width: '600px', data: {
      //     'selected_cetegory_id':id,
      //     'from' : 'product_listing_page'
      //   }
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      //   this.getProductList('all');
      //   this.getCategoryList();
      // });

    }

    else if (where == 'update_subcategory') {

      const dialogRef = this.secondary_dialog.open(StatusModalComponent, {
        width: '600px', data: {
          'selected_sub_category_id': id,
          'from': 'product_listing_page'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.getProductList('all');
        this.getCategoryList();
      });

    }


    else {
      console.log("In Else");
      console.log("where = " + where);
    }

  }

  update_product_status(product_id) {

    console.log("update_product_status method calls");
    console.log("product_id = " + product_id);
    this.alert.confirm("You Want To Change Status Of This Product").then((res)=>{
      if(res){
        this.serve.fetchData({ 'update_by': this.login_user['data']['id'], 'product_id': product_id }, "Product/update_product_status").subscribe(resp => {
          console.log(resp);
          if(resp['msg']=='Product Activated'){
            this.dialog.success("Product Activated","Successfully");
          }else if(resp['msg']="Product Deactivated"){
            this.dialog.success("Product Deactivated","Successfully");
          }
    
    
    
        })  
      }
    })
  

  }
  // aamir changes

distinct_status_array:any=[];
  status_product(){
    // console.log("this data ",this.data);

    this.serve.fetchData({},'Product/distinct_status_code').subscribe((data)=>{
      // console.log("distinct status code",data);
      this.distinct_status_array=data['statusCode'];
      // console.log("this distinct status array", this.distinct_status_array);

    })

  }
  productDetail(id){
    console.log(`product id : ${id}`);
    this.serve.productListSearch = this.data;
    this.serve.productStart = this.start
    this.rout.navigate(['/product-detail/'+id])
  }
  update_stock(value, type){
    console.log(value , type);
      this.getProductList('all');
  }
}



