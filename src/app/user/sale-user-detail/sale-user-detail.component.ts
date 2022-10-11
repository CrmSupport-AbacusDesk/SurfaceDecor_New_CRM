import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { PearlService } from 'src/app/pearl.service';
import { MatDialog } from '@angular/material';
import { UserEmailModalComponent } from '../user-email-modal/user-email-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/dialog.service';
import { EditAddressComponent } from 'src/app/edit-address/edit-address.component';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StatusModalComponent } from 'src/app/order/status-modal/status-modal.component';
import { read } from 'fs';


@Component({
  selector: 'app-sale-user-detail',
  templateUrl: './sale-user-detail.component.html',
  animations: [slideToTop()]
})
export class SaleUserDetailComponent implements OnInit {
  manager: any;
  rsm: any = [];
  ass_user: any = [];
  detail: any = {};
  state_list: any = [];
  district_list: any = [];
  city_list: any = [];
  area_list: any = [];
  Dealer_list: any = [];
  pinCode_list: any = [];
  user_id;
  input_type = "";
  visible = true;
  loader: any;
  rsm_list: any = [];
  datauser: any = {};
  assign_module_data: any = [];
  team_edit: any = [];
  all_brands_list: any;
  brands_update: any;
  selected_file: any = [];
  urls: any = [];
  tmp_userList: any = [];
  not_upload_more_images: boolean = true;
  search: any = {};
  tmpsearch: any = {};
  user_profile: any = '';


  constructor(public alert: DialogComponent, public serve: PearlService, public dialog: MatDialog, public rout: Router, public editdialog: DialogService, public route: ActivatedRoute, public toast: ToastrManager,) {
    this.datauser = JSON.parse(sessionStorage.getItem('st_user'));

    this.route.params.subscribe(params => {
      console.log(params);
      this.user_id = params.id;
      console.log(this.user_id);

    });
    this.userDetail();
    this.getStateList();

  }

  dr_brand_list: any = []
  access_level: any;
  userDetail() {
    this.loader = 1;


    let value = { "id": this.user_id }
    this.serve.fetchData(value, "User/user_detail").subscribe((result) => {
      console.log(result);
      this.detail = result['user_detail']['data'];
      this.assign_module_data = result['user_detail']['assignModule'];
      this.dr_brand_list = this.detail['assign_brand']
      this.Dealer_list = result['user_detail']['data']['dealer']
      // this.user_profile=['user_detail']['data']['user_profile']

      this.access_level = this.detail.access_level;
      console.log(this.access_level)
      this.assign_users(this.access_level);
      this.team_edit = result['user_detail']['data']['assign_user'];
      console.log(this.team_edit);






      setTimeout(() => {
        this.loader = '';

      }, 700);

    })

  }


  ngOnInit() {
    this.input_type = "password";
    this.get_brand_list();

  }

  getStateList() {
    console.log("addUser");
    this.serve.fetchData(0, "User/state_user_list").subscribe((response => {
      console.log(response);
      this.state_list = response['query']['state_name'];
      console.log(this.state_list);
    }));

  }
  getDistrict() {
    console.log(this.detail.state_name);
    this.serve.fetchData(this.detail.state_name, "User/district_user_list").subscribe((response => {

      this.district_list = response['query']['district_name'];
      console.log(this.district_list);

    }));

  }

  getCityList() {
    console.log(this.detail.district_name);

    console.log(this.detail.state_name);
    let value = { "state": this.detail.state_name, "district": this.detail.district_name }
    this.serve.fetchData(value, "User/city_user_list").subscribe((response => {
      console.log(response);
      this.city_list = response['query']['city'];
      console.log(this.city_list);

    }));
  }

  getAreaList() {
    console.log(this.detail.district);
    let value = { "state": this.detail.state_name, "district": this.detail.district_name, "city": this.detail.city }
    this.serve.fetchData(value, "User/area_user_list").subscribe((response => {
      console.log(response);
      this.area_list = response['query']['area'];
      console.log(this.area_list);

    }));
  }

  getPinCodeList() {
    console.log(this.detail.state_name, this.detail.district_name, this.detail.city, this.detail.area);
    let value = { "state": this.detail.state_name, "district": this.detail.district_name, "city": this.detail.city, "area": this.detail.area }
    this.serve.fetchData(value, "User/pincode_user_list").subscribe((response => {
      console.log(response);
      this.pinCode_list = response['query']['pincode'];
      console.log(this.pinCode_list);

    }));
  }

  updateDetail() {
    console.log(this.detail.id);
    console.log(this.detail);
    let value = { 'id': this.detail.id, 'data': this.detail };
    this.serve.fetchData(value, "User/update_user").subscribe((result => {
      console.log(result);

      if (result) {
        this.rout.navigate(['/sale-user-list']);
      }

    }))

  }






  category = "user";
  openEditDialog(value, type): void {
    const dialogRef = this.dialog.open(UserEmailModalComponent, {
      width: '350px',
      data: {
        value,
        type,
        user_id: this.user_id,
        category: this.category
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');

      this.userDetail();


    });
  }

  editaddress() {
    const dialogRef = this.dialog.open(EditAddressComponent, {
      width: '590px',
      data: {
        data: this.detail
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
      this.userDetail();

    });

  }
  show_password() {
    this.input_type = 'text';
    this.visible = false;
  }

  hide_password() {
    this.input_type = 'password';
    this.visible = true;
  }
  team_update: any = false;
  edit_assigned_team() {

    this.team_update = true;

  }
  active: any = {};

  toggleterritory(key, action) {
    console.log(action);
    console.log(key);

    if (action == 'open') { this.active[key] = true; }
    if (action == 'close') { this.active[key] = false; }

    console.log(this.active);


  }
  product_Brand(value, index, event, data) {



    if (event.checked) {
      if (data.name == "Select All") {
        console.log("inside select all");
        for (let i = 0; i < this.rsm_list.length; i++) {
          this.rsm_list[i].check = true;
          this.rsm.push(this.rsm_list[i].id)
          console.log(this.rsm);

        }
      }
      this.rsm.push(value);
      console.log(this.rsm);

    }
    else {
      if (data.name == "Select All") {
        console.log("inside select all");
        for (let i = 0; i < this.rsm_list.length; i++) {
          this.rsm_list[i].check = false;
          this.rsm = [];
          console.log(this.rsm);

        }
      }
      for (var j = 0; j < this.rsm_list.length; j++) {
        if (this.rsm_list[index]['id'] == this.rsm[j]) {
          this.rsm.splice(j, 1);
        }
      }
      console.log(this.rsm);
    }
    this.ass_user = this.rsm

  }

  getItemsList(search) {
    console.log(search);

    this.rsm_list = [];
    for (var i = 0; i < this.tmp_userList.length; i++) {
      search = search.toLowerCase();
      this.tmpsearch = this.tmp_userList[i]['name'].toLowerCase() + ' ' + this.tmp_userList[i]['role_name'].toLowerCase();
      if (this.tmpsearch.includes(search)) {
        this.rsm_list.push(this.tmp_userList[i]);
      }
    }
    console.log(this.rsm_list);

  }


  assign_users(accesslevel) {
    console.log(accesslevel);
    this.serve.fetchData({ 'user_type': accesslevel }, "User/assign_users").subscribe((response => {
      console.log(response);


      this.rsm_list = response['assign_users'];
      console.log(this.rsm_list);
      if (this.rsm_list) {
        console.log('in if');
        for (let i = 0; i < this.rsm_list.length; i++) {
          console.log('in for1');

          for (let j = 0; j < this.team_edit.length; j++) {
            console.log('in for2');

            if (this.rsm_list[i]['name'] == this.team_edit[j]['name']) {
              console.log('in if 2');

              this.rsm_list[i].check = true;
              console.log(this.rsm_list[i]);
              if (this.rsm.indexOf(this.rsm_list[i]['id']) === -1) {
                this.rsm.push(this.rsm_list[i]['id']);
                console.log(this.rsm);
              }



              this.rsm.push();
              console.log(this.rsm);

            }
          }

        }
      }
      this.tmp_userList = this.rsm_list;
    }));

  }
  update_assignusers() {
    this.team_update = false;
    console.log(this.detail.id);
    console.log(this.rsm);
    this.serve.fetchData({ 'users': this.rsm, 'user_id': this.detail.id }, "User/update_assigned_users").subscribe((response => {
      console.log(response);
      if (response) {
        this.userDetail();
        this.toast.successToastr("Users Updated !!");
      } else {
        this.toast.errorToastr("Something Went Wrong");
      }

    }));
    this.userDetail();

  }

  assign_module(module_name, event, index) {

    console.log(module_name);
    console.log(event);
    console.log(index);

    if (event.checked) {
      this.assign_module_data[index][module_name] = 'true';
      this.assign_module_data[index]['view'] = 'true';

    }
    else {
      this.assign_module_data[index][module_name] = 'false';

    }
    console.log(this.assign_module_data);

    this.serve.fetchData(this.assign_module_data[index], "User/assign_module_user_update").subscribe(response => {

      if (response['msg'] == 'Success') {
        this.userDetail();
        this.toast.successToastr("Module Rights Updated !!");
      } else {
        this.toast.errorToastr("Something Went Wrong");
      }
      // console.log(response);
      // this.userDetail();
    });

  }

  brand_list_id: any;
  get_brand_list() {
    console.log("get_brand_list method calls");
    this.serve.fetchData({}, 'Brand_list/brand_list').subscribe((result) => {
      console.log(result);
      this.all_brands_list = result['brand_list'];
      for (let i = 0; i < this.all_brands_list.length; i++) {
        console.log('full workin');

        for (let j = 0; j < this.dr_brand_list.length; j++) {
          console.log('full');

          if (this.all_brands_list[i].id = this.dr_brand_list[j].id) {
            console.log('working');
            //  console.log(this.dr_brand_list);


            this.all_brands_list[i].checks = true;
            this.checks.push(this.all_brands_list[i].id)
            //  console.log(this.checks);

          }


        }
      }
    });

  }


  check_brands(brand_id) {
    console.log("check_brands method calls");

    let index = -1
    // console.log("before index", index);
    // let secondary_index = -1

    // console.log("FIND detail kya aa rhi hai",this.detail);
    index = this.detail['assign_brand'].findIndex(row => row.brand == brand_id);
    console.log("sale index detail", index);
    // secondary_index = this.dr_brand_list.findIndex(row => row.brand == brand_id)


    // secondary_index >= 0 ? this.dr_brand_list.splice(secondary_index,1)  : '';
    return index >= 0 ? true : false


  }
  checks: any = [];
  show: any;
  brands(lead) {
    console.log("data brand user list" + lead);
    console.log(lead.checks);
    if (lead.checks == true) {
      if (lead.brand_name == 'Select All') {
        console.log("inside select all");
        for (let i = 0; i < this.all_brands_list.length; i++) {
          this.all_brands_list[i].checks = true;
          this.checks.push(this.all_brands_list[i].id);
          console.log(this.checks);

        }
      }
      this.checks.push(lead.id)
      console.log(this.checks);
      this.show = lead.checks;
      console.log("show", this.show)

    } else {
      if (lead.brand_name == 'Select All') {
        console.log("inside select all");
        for (let i = 0; i < this.all_brands_list.length; i++) {
          this.all_brands_list[i].checks = false;
          this.checks = [];
          console.log(this.checks);

        }
      }
      for (let j = this.checks.length - 1; j >= 0; j--) {
        if (lead.id == this.checks[j]) {
          console.log("works properly false condtion", this.checks.length - 1);
          this.checks.splice(j, 1)
        }
        // console.log(this.checks);

      }


    }


  }

  update_brands(brand_id) {
    console.log("brand_id = " + brand_id);
    this.loader = true;

    this.serve.fetchData({ "brand_id": this.checks, 'user_id': this.user_id, 'assign_by': this.datauser['data']['id'] }, 'User/assign_brand_to_user').subscribe((result) => {
      console.log(result);
      if (result['msg'] == 'Successfully to assign') {
        this.userDetail();
        this.toast.successToastr("Brand Updated !!");
      } else {
        this.toast.errorToastr("Something Went Wrong");
      }
      // if(result)
      // this.userDetail();
    });
    this.loader = false;
    this.brands_update = 'false';

  }
  update_assigned_brands(brands) {
    this.brands_update = brands
  }

  openImage(image): void {
    const dialogRef = this.dialog.open(StatusModalComponent, {
      // width:'400px',
      data: {
        image: image,
        from: 'user_image'
      }
    })
  }
  insertImage(event) {
    console.log(event);

    this.urls = [];
    this.selected_file = [];
    // this.loader=1;
    console.log(this.selected_file);
    let files = event.target.files;
    console.log(files);
    if (files) {
      console.log("in if");
      console.log(this.selected_file);
      for (let file of files) {
        console.log("in for");
        let reader = new FileReader();
        console.log(this.selected_file);
        console.log(reader);

        reader.onload = (e: any) => {
          console.log(e);
          console.log(this.selected_file);
          this.urls.push(e.target.result);
          console.log(this.urls);
          this.selected_file = this.urls;
          console.log(this.selected_file);
          this.update_user_profile_image(this.selected_file);

        }
        reader.readAsDataURL(file)
      }
    }

  }

  update_user_profile_image(image) {
    console.log("user Profile method called", this.selected_file);
    this.loader = true;

    this.serve.fetchData({ "user_image": image[0], 'user_id': this.user_id, 'updated_by': this.datauser['data']['id'] }, 'User/update_user_profile').subscribe((result) => {
      console.log(result);
      if (result['msg'] == 'Successfully Image Updated') {
        this.userDetail();
        this.toast.successToastr("Image Updated !!");
      } else {
        this.toast.errorToastr("Something Went Wrong. Please try again");
      }

    });
    this.loader = false;

  }



}
