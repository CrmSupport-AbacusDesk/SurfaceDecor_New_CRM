import { Component, OnInit, ViewChild } from '@angular/core';
import { PearlService } from 'src/app/pearl.service';
import { DialogComponent } from 'src/app/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material';
import * as moment from 'moment';



@Component({
  selector: 'app-followup-add',
  templateUrl: './followup-add.component.html',
  styleUrls: ['./followup-add.component.scss']
})
export class FollowupAddComponent implements OnInit {

  formData=new FormData();
  data:any={};
  selectedFile: any = [];
  urls: any = [];
  loader:any;
  login_user : any;
  login_id : any;
  pop_id: any;
  all_brands_list:any=[];
  item:any={};
  selected_multiple_brands : any = [];
  today_date = new Date().toISOString().slice(0,10);
  lists: any;
  dr_user:any=[];
  dr_user2:any=[];
  sales_user:any=[];
  sales_user2:any=[];
  tmpSearch:any='';
  constructor(public serve:PearlService,public dialog:DialogComponent,public rout: Router,public route: ActivatedRoute) {
    console.log("add pop n gift calls");

   

    this.login_user = JSON.parse(sessionStorage.getItem('login'));

    this.login_id = parseInt(this.login_user['data']['id']);
    this.login_user = this.login_user['data']['name'];
    console.log(this.login_user);

    console.log(this.login_id);

    this.lists = new FormControl();

  }

  ngOnInit() {
    // this.get_brand_list();
  }

  back() {
    window.history.go(-1);
  }

 

  getSalesUserlist(){
    this.loader=true;
    this.serve.fetchData(this.data,'User/sales_users').subscribe((res)=>{
      console.log(res);
        this.sales_user=res['sales_user'];
        this.sales_user2=res['sales_user'];
      setTimeout(() => {
      this.loader=false;
        
      }, 2000);
    },err=>{
      this.loader=false;
    })
  }

  getCompanyName(){
    this.loader=true;
    this.serve.fetchData({'executive_id':this.data.executive},'User/user_dr_assign_list').subscribe((res)=>{
      console.log(res);
        this.dr_user=res['dr_user'];
        this.dr_user2=res['dr_user'];
      setTimeout(() => {
      this.loader=false;
        
      }, 2000);
    },err=>{
      this.loader=false;
    })
  }

  dr_data(searchuser){
    console.log(searchuser);
    this.tmpSearch='';
    this.sales_user=[];
    for(let i=0;i<this.sales_user2.length;i++){
      searchuser=searchuser.toLowerCase();
      this.tmpSearch=this.sales_user2[i]['name'].toLowerCase();
      if(this.tmpSearch.includes(searchuser)){
        this.sales_user.push(this.sales_user2[i]);
      }
    }
    
  }

  searchCompanyName(searchComapny){
    this.tmpSearch='';
    this.dr_user=[];
    for(let x=0;x<this.dr_user2.length;x++){
      searchComapny=searchComapny.toLowerCase();
      this.tmpSearch=this.dr_user2[x]['company_name'].toLowerCase();
      if(this.tmpSearch.includes(searchComapny)){
        this.dr_user.push(this.dr_user2[x]);
      }
    }
  }

  AddFollowUpData(){

    this.loader=true;

    if(this.data.followup_date){
      this.data.followup_date=moment(this.data.followup_date).format('YYYY-MM-DD');
    }
    

    this.serve.fetchData({data:this.data,'login_id':this.login_id},'save/fldls').subscribe((res)=>{
      
      setTimeout(() => {
        this.loader=false;
      }, 2000);
    },err=>{
      this.loader=false;
    })
  }

  



 


 

  
 

  


}
