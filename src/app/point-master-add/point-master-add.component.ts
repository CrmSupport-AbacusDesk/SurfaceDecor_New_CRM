import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { retry } from 'rxjs/operators';
import { SessionStorage } from 'src/_services/SessionService';
import { DialogComponent } from '../dialog.component';
import { LocalStorage } from '../localstorage.service';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-point-master-add',
  templateUrl: './point-master-add.component.html',
  styleUrls: ['./point-master-add.component.scss']
})
export class PointMasterAddComponent implements OnInit {
  loader: boolean = false;
  data1: any = {};
  all_brands_list: any = [];
  item: any = {};
  all_brands_list2: any = [];
  all_product_list: any = [];
  all_product_list2: any = [];
  tempSearch: any = '';
  update_id: any = 0;
  login_user: any;
  login_id: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public serve: PearlService, public session: SessionStorage, public alert: DialogComponent, public toastCtrl: ToastrManager) {
    this.login_user = JSON.parse(sessionStorage.getItem('login'));

    this.login_id = parseInt(this.login_user['data']['id']);

    // this.get_brand_list();
    console.log(data);
    if (data.from == 'editPointMaster') {

      this.data1 = data.value;
      if (data.tab != "Product_Wise") {
        this.get_brand_list();
        this.data1.brand_id = [data.value.brand_id];

      } else {
        this.data1.product_status = data.value.product_status;
        this.get_Productlist();
        this.data1.product_id = [data.value.product_id];
        this.data1.product_points = data.value.points;
        this.data1.id = data.value.id;
      }


      this.data.incentive_wiseType = data.tab
      this.update_id = this.data1.id



    }


  }

  ngOnInit() {

  }

  submitPointMaster() {
    this.loader = true;
    this.data1.login_id = this.login_id;
    if (this.data.incentive_wiseType == 'Brand_Wise') {
      this.serve.fetchData({ 'data': this.data1 }, 'Announcement/add_point_master').pipe(retry(4)).subscribe((res) => {
        console.log(res);
        this.loader = false;
        if (res['msg'] == 'Success') {
          this.toastCtrl.successToastr("Successfully Added");
          this.dialog.closeAll();
        } else if (res['msg'] == 'Fail') {
          this.toastCtrl.errorToastr("Points For this Brand is already exists");

        } else {
          this.toastCtrl.errorToastr("Something Went Wrong...");

        }
      }, err => {
        this.loader = false;

      }
      )
    } else {
      this.serve.fetchData({ 'data': this.data1 }, 'Announcement/product_point_master').pipe(retry(4)).subscribe((res) => {
        console.log(res);
        this.loader = false;
        if (res['msg'] == 'Success') {
          this.toastCtrl.successToastr("Successfully Added");
          this.dialog.closeAll();
        } else if (res['msg'] == 'Fail') {
          this.toastCtrl.errorToastr("Points For this Brand is already exists");

        } else {
          this.toastCtrl.errorToastr("Something Went Wrong...");

        }
      }, err => {
        this.loader = false;

      }
      )
    }



  }


  editPointMaster() {
    this.loader = true;
    this.data1.login_id = this.login_id;

    if (this.data.incentive_wiseType == 'Brand_Wise') {
      this.serve.fetchData({ 'data': this.data1 }, 'Announcement/edit_point_master').pipe(retry(4)).subscribe((res) => {
        console.log(res);
        this.loader = false;
        if (res['msg'] == 'Success') {
          this.toastCtrl.successToastr("Successfully Added");
          this.dialog.closeAll();
        } else if (res['msg'] == 'Fail') {
          this.toastCtrl.errorToastr("Points For this Brand is already exists");

        } else {
          this.toastCtrl.errorToastr("Something Went Wrong...");

        }
      }, err => {
        this.loader = false;

      }
      )
    } else {
      console.log(this.data1);
      this.serve.fetchData({ 'data': this.data1 }, 'Announcement/editProductPointMaster').pipe(retry(4)).subscribe((res) => {
        console.log(res);
        this.loader = false;
        if (res['msg'] == 'Success') {
          this.toastCtrl.successToastr("Successfully Added");
          this.dialog.closeAll();
        } else if (res['msg'] == 'Fail') {
          this.toastCtrl.errorToastr("Points For this Product is already exists");

        } else {
          this.toastCtrl.errorToastr("Something Went Wrong...");

        }
      }, err => {
        this.loader = false;

      }
      )
    }


  }

  get_brand_list() {
    console.log("get_brand_list method calls");
    this.loader = true;
    this.serve.fetchData({}, 'Brand_list/brand_list').subscribe((result) => {
      console.log(result);
      this.loader = false;
      this.all_brands_list = result['brand_list'];
      this.all_brands_list.shift();
      console.log(this.all_brands_list);

      this.all_brands_list2 = result['brand_list'];

    });

  }

  get_Productlist() {
    console.log("get_brand_list method calls");
    this.data1 = {
      login_id: this.login_id,
      'product_status': this.data1.product_status
    };
    this.loader = true;
    this.serve.fetchData({ 'data': this.data1 }, 'Product/list_product').subscribe((result) => {
      console.log(result);
      this.loader = false;
      this.all_product_list = result['product_list'];
      // this.all_brands_list.shift();
      console.log(this.all_product_list);
      this.all_product_list2 = result['product_list'];
    }, err => {
      this.loader = false;

    });

  }

  selectAll(action) {
    if (action == 'allCategory_id') {
      console.log(this.data1.allCategory_id)
      if (this.data1.allCategory_id == true) {
        const brandData = [];
        for (let i = 0; i < this.all_brands_list.length; i++) {
          console.log(this.all_brands_list[i].id);
          brandData.push(this.all_brands_list[i].id);
        }
        this.data1.brand_id = brandData
      } else {
        this.data1.brand_id = [];
      }
      console.log(this.data1.brand_id);
    }



  }

  selectAll2(action) {
    this.loader = true;

    if (action == 'allProductName_id') {
      console.log(this.data1.allProductName_id);
      setTimeout(() => {
        if (this.data1.allProductName_id == true) {
          const productData = [];
          for (let i = 0; i < this.all_product_list.length; i++) {
            console.log(this.all_product_list[i].id);
            productData.push(this.all_product_list[i].id)
          }
          this.data1.product_id = productData;
        } else {
          this.data1.product_id = [];
        }
      }, 10000);

      console.log(this.data1.product_id);

    }
    this.loader = false;

  }

  filter_brand(brands) {
    console.log(brands);
    brands = brands.toLowerCase();
    this.tempSearch = '';
    this.all_brands_list = [];

    for (let i = 0; i < this.all_brands_list2.length; i++) {
      this.tempSearch = this.all_brands_list2[i].brand_name.toLowerCase();
      if (this.tempSearch.includes(brands)) {
        this.all_brands_list.push(this.all_brands_list2[i]);
      }
    }
  }


  filter_ProductName(productName) {
    console.log(productName);
    productName = productName.toLowerCase();
    this.tempSearch = '';
    this.all_product_list = [];
    for (let i = 0; i < this.all_product_list2.length; i++) {
      this.tempSearch = this.all_product_list2[i]['product_name'].toLowerCase();
      if (this.tempSearch.includes(productName)) {
        this.all_product_list.push(this.all_product_list2[i])
      }
    }

  }

}
