import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';
import { SessionStorage } from 'src/_services/SessionService';
import { DialogComponent } from '../dialog.component';
import { LocalStorage } from '../localstorage.service';
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-enquiry-from-app-listing',
  templateUrl: './enquiry-from-app-listing.component.html',
  styleUrls: ['./enquiry-from-app-listing.component.scss']
})
export class EnquiryFromAppListingComponent implements OnInit {

  skelton : any = new Array(10);
  loader:any=false;
  data_not_found=false;
  active_tab:any = 'All';
  enquiry_list:any=[];
  search:any={};
  sales_user_list:any=[];
  login: any = {};
  enable_edit:any=0;
  pagenumber:any=0;
  total_page:any=0;
  start:any=0;
  page_limit:any=50;
  assign_login_data:any=[];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  pagination_count:any=0
  constructor(public serve:PearlService,public popup_dialog: MatDialog,public route:Router,public sessionstorage:LocalStorage,public toastMsg:ToastrManager,
    public alertctrl:DialogComponent
    ) { 
    console.log(this.sessionstorage);
    this.login=this.sessionstorage.getSession(); 
    console.log(this.login);
    this.assign_login_data = this.sessionstorage.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Enquiry');
    console.log(index);
    
    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
     
    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
    
  }

  ngOnInit() {
    this.search=this.serve.enquiryListSearch;
    this.get_enquiry_list();
  }

  public onDate(event):void{
  this.search.date=moment(event.value).format("YYYY-MM-DD");
  this.get_enquiry_list();
  }
  get_enquiry_list(action:any=''){

    console.log("get_enquiry_list method calls");
    if(action == "refresh"){
      this.search = {};
      this.enquiry_list = [];
      this.start=0;

    }

    this.loader =true;
    this.serve.fetchData({'filter':this.search,'start':this.start,'pagelimit':this.page_limit},"Enquiry/enquiry_list").subscribe((result=>{
      console.log(result);
      this.enquiry_list=result['enquiry_list'];
      this.pagination_count =result['enquiry_count'];
      this.total_page =Math.ceil(this.pagination_count/this.page_limit);
      this.pagenumber=Math.ceil(this.start/this.page_limit)+1;
      console.log(this.enquiry_list);
      this.serve.enquiryListSearch ={};
      setTimeout (() => {
        this.loader= false;

      }, 700);

      if(this.enquiry_list.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
      }

    }))
  }

  imageModel(image){
    const dialogRef = this.popup_dialog.open( StatusModalComponent, {
      data:{
        image,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');

    });

  }
  orderDetail(id){
    console.log("id :"+id);

    this.serve.enquiryListSearch =this.search;
    this.route.navigate(['/order-detail/'+id])
  }

  enquiryDetail(id){
    console.log(`enquiry id :${id}`);
    // this.serve.plumberListSearch =this.search;
    this.route.navigate(['/enquiry-from-app-detail/'+id]);
  }

  delete_enquiry_row(id){
    console.log(id);
   console.log(this.login.value.data.id);
    let login_id=this.login.value.data.id;
    console.log(login_id);
    this.alertctrl.confirm("Are You Want to Delete This Enquiry ?").then((result)=>{
      if(result){
        this.serve.fetchData({'id':id, 'deleted_by':login_id},'Enquiry/delete_enquiry').subscribe((r)=>{
          console.log(r);
          if(r['msg']=="success"){
            this.get_enquiry_list('');
            this.toastMsg.successToastr("Successfully Deleted");
          }else{
            this.toastMsg.errorToastr("Something Went Wrong");
          }
        })
      }
    })
    
    
  }

}
