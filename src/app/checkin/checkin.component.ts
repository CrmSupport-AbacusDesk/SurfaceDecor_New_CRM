import { Component, OnInit } from '@angular/core';
import { PearlService } from '../pearl.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog.component';
import * as moment from 'moment';
import { LocalStorage } from '../localstorage.service';
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  start_attend_time: string;
  loader:any;
  data_not_found=false;
  data:any = {};
  checkins:any = [];
  show_today:boolean = true;
  count_1:any;
  count_2:any;
  pagelimit:any=50; 
  skelton:any={}
  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  test_variable:string = 'pending';
  searchData: any = {};
  backButton: boolean = false;
  today_date = new Date().toISOString().slice(0,10);
  previous_function_name : any = ''
  excel_data:any=[];
  
  
  constructor(public serve:PearlService,public location: Location,public navparams: ActivatedRoute,public route:Router,public dialog:DialogComponent,public popup_dialog: MatDialog,public session:LocalStorage) { 
    
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'check in');
    console.log(index);
    
    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
    
    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
    
    console.log(this.navparams['params']['_value']['selectedUser']);
    this.searchData = (this.navparams['params']['_value']);
    console.log(this.searchData);
    
    
    if (this.searchData.selectedUser && this.searchData.selectedDate && this.searchData.selected_company_name) {
      this.backButton = true;
      if(this.searchData.selectedDate == this.today_date){
        this.checkins = [];
        this.data.user_name = this.searchData.selectedUser;
        this.data.company_name = this.searchData.selected_company_name;
        this.distributorList('get_today_checkin_new',1);
      }
      else{
        this.checkins = [];
        this.data.user_name = this.searchData.selectedUser;
        this.data.date_created = this.searchData.selectedDate;
        this.data.company_name = this.searchData.selected_company_name;
        
        this.distributorList('get_all_checkin_new',2);
      }
      console.log("in navparams");
      
    }
    
    
    this.distributorList('get_today_checkin_new',1);
    console.log('gfvdb');
    this.skelton = new Array(10);
  }
  
  ngOnInit() {
  }
  
  public onDateBetween(event , date_type): void 
  {
      console.log("date type ",date_type);
      if(date_type == 'date_from'){
        this.data.date_from = moment(event.value).format('YYYY-MM-DD');  
        console.log("Date From " , this.data.date_from);
      }else if(date_type == 'date_to'){
        this.data.date_to = moment(event.value).format('YYYY-MM-DD');    
        console.log("Date To " , this.data.date_to);
      }
      
  }
  
  distributorList(func_name,type:any='')
  {
    
    if(func_name == 'refresh'){
      this.data = {};
      this.checkins = [];
    }
    else{
      this.previous_function_name = func_name;
    }
    
    func_name = this.previous_function_name;
    
    
    console.log(this.pagelimit);
    this.loader=1;
    console.log(Object.getOwnPropertyNames(this.data).length);
    
    
    
    if( Object.getOwnPropertyNames(this.data).length != 0)
    {
      console.log("yes");
      
      
      this.checkins = [];
    }
    if(this.data.date_created)
    {
      this.data.date_created=moment(this.data.date_created).format('YYYY-MM-DD');
    }
    
    this.serve.fetchData({'start':this.checkins.length,'pagelimit':this.pagelimit,'search':this.data},"Distributors/"+func_name)
    .subscribe(((result:any)=>{
      console.log(result);
      this.checkins = this.checkins.concat(result['result']);
      
      
      this.count_1 = result.today_count;
      this.count_2 = result.all_count;
      if(func_name == 'get_today_checkin_new')
      this.show_today = true;    
      
      
      console.log(this.checkins);
      if(this.checkins.length ==0){
        this.data_not_found=true;
      } else {
        this.data_not_found=false;
      }
      setTimeout (() => {
        this.loader='';
        
      }, 100);
    }))
  }
  
  
  change_tab(fn_name,type)
  {
    this.checkins = [];
    this.data = {};
    this.distributorList(fn_name,type);
  }

  exportAsXLSX():void 
  {
    for(let i=0;i<this.checkins.length;i++){
      this.excel_data.push(
        {
          'Date':this.checkins[i].activity_date,
          'Sales Userz':this.checkins[i].exec_name,
          'Company Name':this.checkins[i].other_name==''?this.checkins[i].company_name:this.checkins[i].other_name,
          'Contact Person':this.checkins[i].contact_person && this.checkins[i].contact_person!='' ? this.checkins[i].contact_person : '--' ,
          'Contact No.':this.checkins[i].dr_mobile && this.checkins[i].dr_mobile!='' ? this.checkins[i].dr_mobile : '--' ,
          'Check In':this.checkins[i].visit_start,
          'Check Out':this.checkins[i].visit_end,
          'Remark':this.checkins[i].description});
      
    }
    console.log(this.excel_data);
    this.serve.exportAsExcelFile(this.excel_data, 'Check IN  Sheet');
  }
   
  
  openDialog(id,checkin_status): void 
  {
    const dialogRef = this.popup_dialog.open(StatusModalComponent, {
      width: '400px', data: {
        'data' : 'Change Status from checkin',
        'checkin_verification_status' : checkin_status,
        'checkin_id' : id,
      }
    });
    this.loader = 1;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loader = '';
      this.checkins = [];
      this.distributorList((this.show_today==false?'get_all_checkin_new':'get_today_checkin_new'),(this.show_today==false?2:1));
      
    },err => {
      this.loader = '';
    });
  }
  
  
  back(): void {
    console.log("location back method calls");
    console.log(this.location);
    this.location.back()
  }
  
}
