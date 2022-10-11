import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BillingdocumentComponent } from 'src/app/billingdocument/billingdocument.component';
import { DialogComponent } from 'src/app/dialog.component';
import { LocalStorage } from 'src/app/localstorage.service';
import { PearlService } from 'src/app/pearl.service';
import { UploadFileModelComponent } from 'src/app/upload-file-model/upload-file-model.component';

@Component({
  selector: 'app-invoice-billing',
  templateUrl: './invoice-billing.component.html',
  styleUrls: ['./invoice-billing.component.scss']
})
export class InvoiceBillingComponent implements OnInit {
  
  
  billing_list:any=[];
  skelton: any = new Array(10);
  loader: any ;
  data_not_found: any = false;
  search:any={};
  search_val:any={};
  pagenumber:any = 0;
  total_page:any = 0; 
  start:any=0;
  page_limit:any=50
  paymentReturnArray:any=[];
  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  login_id:any='';
  last_synchronised_data_date : any = '';
  payment_list: any=[];
  active_tab:any = 'Billing';
  overall_total_sum: any = {};
  overall_total_payment_amount: any = '0';
  excel_data: any = [];
  download_billing_excel_data: any = [];
  download_payment_excel_data: any;
  pagination_count: any = 0;
  payment_return_object:any={};
  dr_count:any;
  
  
  constructor(public serve: PearlService,public session:LocalStorage,public dialog_box:MatDialog,public secondry_route:Router, public dialog:DialogComponent , public toast:ToastrManager) 
  {
 
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.login_id=this.assign_login_data.data.id;
    console.log( this.login_id);

    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'billing');
    console.log(index);
    
    if(index != -1){
      this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
      this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
      this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
      console.log(this.view_add);
      console.log(this.view_edit);
      console.log(this.view_delete);
      
    }
    this.get_billing_data_list()
    
  }
  
  ngOnInit() {
    this.search =this.serve.billingListSearch;
  }
 
  get_billing_data_list(action:any='')
  {
    console.log("get_billing_data_list method calls");
    
    if(action == "refresh"){
      this.search = {};
      this.billing_list = [];
      this.start =0;
    }
    
    this.loader=true;
    this.serve.fetchData({'start':this.start,'pagelimit':this.page_limit,'filter':this.search},"Tally_invoice_credit/tally_invoice_credit_billing_listing")
    .subscribe((result=>{
      console.log(result);
      this.billing_list = result['credit_billing_list'];
      this.last_synchronised_data_date = result['last_synchronised_data_date'];
      this.overall_total_sum = result['overall_total_sum'];
      
      this.pagination_count=result['count'];
      this.total_page = Math.ceil(this.pagination_count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;

      this.serve.billingListSearch ={};
      
      // this.dr_count = result['distributor']['distributor_pagination_count'];
      setTimeout (() => {
        this.loader=false;
        
      }, 700);
      if(this.billing_list.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
      }
    }))
    
  }
  
  get_payment_data_list(action:any=''){
    console.log("get_payment_data_list method calls");
    
    if(action == "refresh"){
      this.search = {};
      this.payment_list = [];
    }
    
    this.loader=true;
    this.serve.fetchData({'start':this.start,'pagelimit':this.page_limit,'filter':this.search},"Tally_invoice_credit/invoice_payment_listing")
    .subscribe((result=>{
      console.log(result);
      this.payment_list = result['list'];
      this.last_synchronised_data_date = result['last_synchronised_data_date'];
      this.overall_total_payment_amount = result['overall_total_payment_amount'];

      this.pagination_count=result['count'];
      this.total_page = Math.ceil(this.pagination_count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
      this.serve.billingListSearch ={};
      setTimeout (() => {
        this.loader=false;
        
      }, 700);
      if(this.payment_list.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
      }
    }))
    
  }
  
  
  upload_excel()
  {
    const dialogRef = this.dialog_box.open(UploadFileModelComponent,{
      width: '500px',
      data:{
        'from':'invoice_billing_list',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get_billing_data_list();
      this.get_payment_data_list();
    });
  }
  
  con_date(date){
    
    this.search.date = moment(date).format('YYYY-MM-DD');
    console.log(this.search.date);
    this.active_tab == 'Billing' ? this.get_billing_data_list() : this.get_payment_data_list();
    
  }
  con_date_created(date){
    
    this.search.date_created = moment(date).format('YYYY-MM-DD');
    console.log(this.search.date_created);
    this.active_tab == 'Billing' ? this.get_billing_data_list() : this.get_payment_data_list();
    
  }
  go_to(id,type){
    this.serve.billingListSearch =this.search;
    this.secondry_route.navigate(['/invoice-billing-detail/'+id],{ queryParams: { id,type} });
  }
  
  
  download_excel():void {
    
    console.log(this.active_tab);
    this.excel_data = [];
    if(this.active_tab == 'Billing'){
      
      this.serve.fetchData({'filter':this.search},"Tally_invoice_credit/tally_invoice_credit_billing_listing_excel")
      .subscribe((result=>{
        console.log(result);
        this.download_billing_excel_data = result['credit_billing_list'];
        
        for(let i=0;i<this.download_billing_excel_data.length;i++){
          
          let keys_value : any = [];
          keys_value = Object.keys(this.download_billing_excel_data[i])
          
          let excel_object: any = {}
          
          for(let secondary_index=0;secondary_index<keys_value.length;secondary_index++){
            excel_object[keys_value[secondary_index]]=this.download_billing_excel_data[i][keys_value[secondary_index]]        
          }
          this.excel_data.push(excel_object)
          
        }
        console.log(this.excel_data);
        this.serve.exportAsExcelFile(this.excel_data, this.active_tab+' EXCEL');
        
        setTimeout (() => {
          this.loader=false;
        }, 700);
      }))
      
      
    }
    
    
    else{
      
      
      this.serve.fetchData({'filter':this.search,'active_tab':this.active_tab=='Payment'?'R':'P'},"Tally_invoice_credit/invoice_payment_listing_excel")
      .subscribe((result=>{
        console.log(result);
        this.download_payment_excel_data = result['list'];
        
        for(let i=0;i<this.download_payment_excel_data.length;i++){
          
          let keys_value : any = [];
          keys_value = Object.keys(this.download_payment_excel_data[i])
          
          let excel_object: any = {}
          
          for(let secondary_index=0;secondary_index<keys_value.length;secondary_index++){
            excel_object[keys_value[secondary_index]]=this.download_payment_excel_data[i][keys_value[secondary_index]]        
          }
          
          this.excel_data.push(excel_object)
          
        }
        
        console.log(this.excel_data);
        this.serve.exportAsExcelFile(this.excel_data, this.active_tab+' EXCEL');
        
        setTimeout (() => {
          this.loader=false;
        }, 700);
      }))
      
      
    }
    
  }
  go_to_add_document(id){
    const dialogRef = this.dialog_box.open(BillingdocumentComponent, {
      width: '500px',
      data: {
          id
      }
  });
  dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');

  });
  }

  convert_integer(val){
    return parseInt(val);
  }
  
  public onBetweenDate(event , date_type) :void{
    console.log("date type" + date_type);
      if(date_type == 'date_from'){
        this.search.date_from = moment(event.value).format('YYYY-MM-DD');
        console.log(this.search.date_from);
      }else if(date_type == 'date_to'){
        this.search.date_to = moment(event.value).format('YYYY-MM-DD');
        console.log(this.search.date_to);

      }

  }

  delete_billing_row(id){
    console.log(id);
     this.dialog.confirm("You Want To Delete This Bill ?").then((res)=>{
      if(res){
        this.serve.fetchData({bill_id:id},'Tally_invoice_credit/delete_bill_no').subscribe((r)=>{
          console.log(r);
            if(r['msg']='Bill no deleted successfully.'){
              this.toast.successToastr("Successfully Deleted");
            }else{
              this.toast.errorToastr("Something Went Wrong");
            }
        })
           
      }
     })

}

getPaymentReturn(action:any=''){
  console.log("get payment return api called");

  if(action=='refresh'){
    this.search={};
    this.paymentReturnArray=[];
  }

  this.loader=true;
    this.serve.fetchData({'start':this.start,'pagelimit':this.page_limit,'filter':this.search},'Tally_invoice_credit/invoice_payment_return_listing').subscribe((resp)=>{
      console.log(resp);
      this.paymentReturnArray=resp['list'];
      console.log(this.paymentReturnArray);
      this.payment_return_object.overall_total_payment_amount=resp['overall_total_payment_amount'];
     console.log( this.payment_return_object.overall_total_payment_amount);
      this.pagination_count=resp['count'];
      this.total_page=Math.ceil(this.pagination_count/this.page_limit);
      console.log(this.total_page);
      
      this.pagenumber=Math.ceil(this.start/this.page_limit)+1;
     if(this.paymentReturnArray.length<1){
      this.data_not_found=true;
     }

      setTimeout(() => {
        this.loader=false;
      }, 1000);
    })
}
con_date_created2(date){
    
  this.search.date_created = moment(date).format('YYYY-MM-DD');
  console.log(this.search.date_created);
 this.getPaymentReturn('');
  
}
con_date2(date){
    
  this.search.date = moment(date).format('YYYY-MM-DD');
  console.log(this.search.date);
 this.getPaymentReturn('');
  
}

}