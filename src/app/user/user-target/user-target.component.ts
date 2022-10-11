import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PearlService } from 'src/app/pearl.service';
import { DialogComponent } from 'src/app/dialog.component';
import * as moment from 'moment';
import { parse } from 'querystring';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { StatusModalComponent } from 'src/app/order/status-modal/status-modal.component';

@Component({
  selector: 'app-user-target',
  styleUrls: ['./user-target.component.scss'],
  templateUrl: './user-target.component.html',
})
export class UserTargetComponent implements OnInit {
  
  target_list:any=[];
  brand_list:any=[];
  loader:boolean=false;
  login_user: any={};
  login_id: any = '0';
  today_date = new Date();
  current_date:any=new Date().toISOString().slice(0,10);
  current_year = new Date().getFullYear();
  one_year_from_now = (this.today_date.getFullYear() + 1);
  all_brands_list:any=[];
  month:any=["January","February","March","April","May","June","July","August","September","October","November","December"];
  monthName:any;

  
  
  constructor(public route:ActivatedRoute,public serve:PearlService,public dialog:DialogComponent,@Inject(MAT_DIALOG_DATA)public data,public Dialog:MatDialog) { 
    
    console.log(this.current_year);
    console.log(this.one_year_from_now);
    this.login_user = JSON.parse(sessionStorage.getItem('login'));
    console.log(this.login_user);
    this.login_id = parseInt(this.login_user['data']['id']);
    console.log(this.login_id);
    this.data.created_by = this.login_id;
    console.log(this.data);
    this.getTargetList();
    this.disable_month(2021,'1')
    if(data.company_target=='company_target'){
      this.company_data(this.data.id)
      console.log('====================================');
      console.log("hlooo");
      console.log('====================================');
    }
    if(data.company_target=='company_sale_target'){
      this.company_sale_data(this.data.id)
      console.log('====================================');
      console.log(this.data.id);
      console.log('====================================');
    }
    this.monthName=this.month[new Date().getMonth()];

  }
  
  ngOnInit() {


    this.get_brand_list();
    
  }
  
  
  add_target(){
    console.log(this.data);
    this.serve.fetchData(this.data,"User/submit_target")
    .subscribe(resp=>{
      console.log(resp);
      this.getTargetList();
      var user_id = this.data.user_id;
      this.data = {};
      this.data.user_id = user_id;
      this.data.created_by = this.login_id;
      
    })
    
  }
  
  company_data(id)
  {
    this.loader=true;
    this.serve.fetchData({'company_id':id},"User/dashboardCompanyBrandTargetSumarry").subscribe((result)=>{
      console.log(result);
      this.brand_list=result['brandList'];
      setTimeout(() => {
        this.loader=false
      }, 1000);
    });
  }
  company_sale_data(id)
  {
    this.loader=true;
    this.serve.fetchData({'company_id':id},"User/dashboardCompanyBrandSalesSumarry").subscribe((result)=>{
      console.log(result);
      this.brand_list=result['companyList'];
      setTimeout(() => {
        this.loader=false
      }, 1000);
    });
  }
  getTargetList()
  {
    this.serve.fetchData({'id':this.data.user_id},"User/target_list").subscribe((result)=>{
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
  
  openDialog(image){
    const dialogRef = this.Dialog.open(StatusModalComponent,{
      // width: '500px',
      panelClass:'image-modal',
        data:{
          image,
          from:"user target modal"
        }
      }
      )
      dialogRef.afterClosed().subscribe((result)=>{
        console.log(result);
        console.log("this dialog box is closed");
      })
  }
  
}
