import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../dialog.component';
import { PearlService } from '../pearl.service';
@Component({
  selector: 'app-targetadd',
  templateUrl: './targetadd.component.html',
  styleUrls: ['./targetadd.component.scss']
})
export class TargetaddComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  target_list:any=[];
  login_user: any={};
  login_id: any = '0';
  today_date = new Date();
  current_year = new Date().getFullYear();
  one_year_from_now = (this.today_date.getFullYear() + 1);
  all_brands_list:any=[];
  all_company_list:any=[];


  data:any={}
  
  constructor(public route:ActivatedRoute,public serve:PearlService,public dialog1:MatDialog,public dialog:DialogComponent,@Inject(MAT_DIALOG_DATA)public data1) { 
    this.login_user = JSON.parse(sessionStorage.getItem('login'));
    this.login_id = parseInt(this.login_user['data']['id']);
    this.data.created_by = this.login_id;
    
    console.log(this.current_year);
    console.log(this.one_year_from_now);
    this.getTargetList();
    
    // this.getTargetList();
    this.disable_month(2021,'1')
    
  }
  
  ngOnInit() {

    this.get_brand_list();
    this.get_company_list();
    this.dropdownList = this.all_brands_list;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'brand_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
    
  }
  getallbrand(id){
    if(id=='0'){
    for( var j=0;j<this.all_brands_list.length;j++){
      this.data.brand.push(this.all_brands_list[j].id)
      console.log(this.data.brand)

    }
    }

  }
  
  add_target(){
    console.log(this.data);
    this.serve.fetchData(this.data,"User/submit_Companytarget")
    .subscribe(resp=>{
      console.log(resp);
      if(resp['msg'] == 'Inserted Successfully')
      {
        this.dialog.success("Target Added", "Successfully");
        this.dialog1.closeAll();
      }
      this.getTargetList();
      var user_id = this.data.user_id;
      this.data = {};
      this.data.user_id = user_id;
      this.data.created_by = this.login_id;
      
    })
    
  }
  
  getTargetList()
  {
    this.serve.fetchData({},"User/companyTarget_list").subscribe((result)=>{
      console.log(result);
      this.target_list=result['target_list'];
    });
  }
  
  
  deleteTarget(id){
    
    console.log(id);
    this.serve.fetchData({'id':parseInt(id)},"User/delete_target").subscribe((result)=>{
      console.log(result);
      this.getTargetList();
    });
  }
  
  
  disable_month(year,month){
   
    if(year == this.today_date.getFullYear()){
      
      if(month < this.today_date.getMonth()){
        return true;
      }
      else{
        return false;
      }
    }
    
    else{
      return false;
    }
    
  }

  get_brand_list() {
    console.log("get_brand_list method calls");
    this.serve.fetchData({}, 'Brand_list/brand_list').subscribe((result) => {
      console.log(result);
      this.all_brands_list = result['brand_list'];
      
    });
    
  }
  
  get_company_list() {
    console.log("get_brand_list method calls");
    this.serve.fetchData({}, 'User/companyList').subscribe((result) => {
      console.log(result);
      this.all_company_list = result['companyList'];
      
    });
    
  }
   
}