import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { PearlService } from 'src/app/pearl.service';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { LocalStorage } from 'src/app/localstorage.service';
import * as moment from 'moment';


@Component({
  selector: 'app-distribution-list',
  templateUrl: './distribution-list.component.html',
  animations: [slideToTop()]
  
})
export class DistributionListComponent implements OnInit {
  value:any={};
  dr_list_temp:any=[];
  distributor_list:any=[];
  start:any=0;
  count:any;
  total_page:any = 0; 
  pagenumber:any = 0;
  page_limit:any=50
  exp_loader:any=false;
  loader:any=false;
  data:any=[];
  data_not_found=false;
  type:any=1;
  brand_master:any=[];
  state_values:any=[];
  search_val:any={};
  login_data:any=[];
  login_dr_id:any;
  skelton : any = new Array(10);
  
  mobile_values: any=[];
  dr_id:any;
  
  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  pagination_count: any = 0;
  
  
  constructor(public serve:PearlService,public route:Router,public dialog:DialogComponent,public session:LocalStorage,public alert:DialogComponent) { 
    
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'distribution channel partner');
    console.log(index);
    
    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
    
    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
    
    
    this.serve.distributor_detail_primary_selected_tab = '';
    this.serve.distributor_detail_secondary_selected_tab = '';


    
    
    
  }
  
  ngOnInit() {
    this.search_val = this.serve.distributorListSearch
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value.data;
    
    if(this.login_data.access_level !='1')
    {
      this.login_dr_id = this.login_data.id;
    }
    // this.search_val={};
    this.distributorList();
    this.filter_price_group();
    this.filter_collection_days();
  }
  
  dr_count:any;
  public onDate(event): void 
  {
    this.search_val.date_created=moment(event.value).format('YYYY-MM-DD');    
    this.distributorList();
  }
  distributorList(action:any=''){
    
    this.loader=true;
    console.log(this.search_val);
    
    if(action == "refresh")
    {
      this.search_val = {};
      this.distributor_list = [];
      this.start = 0;
      
    }
    
    
    this.serve.fetchData({'start':this.start,'pagelimit':this.page_limit,'search':this.search_val , 'type':this.type,'login_user':this.login_dr_id},"Distributors/distributor")
    .subscribe((result=>{
      console.log(result);
      this.dr_list_temp=result['distributor']['distributor'];
      this.brand_master = result['distributor']['brand'];
      this.state_values = result['distributor']['states'];
      console.log(this.dr_list_temp);
      this.pagination_count=(result['distributor']['distributor_pagination_count']);
      this.total_page = Math.ceil(this.pagination_count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
      
      this.dr_count = result['distributor']['distributor_pagination_count'];
      
      
      this.distributor_list=(result['distributor']['distributor']);
      this.serve.distributorListSearch = {};

      
      setTimeout (() => {
        this.loader=false;
        
      }, 500);
      console.log(this.distributorList.length);
      
      
      if(this.distributor_list.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
        
      }
    }))
  }
  
  onScrollDown()
  {
    console.log("scrolled down");
    
  }
  
  // aamir changes 24 feb 2022
  price_group_array:any=[];
  filter_price_group(){

    this.serve.fetchData(0,'Distributors/distinct_price_group_listing').subscribe(r=>{
      // console.log("price group", r);
      this.price_group_array=r;
      console.log("price group", this.price_group_array);

    })
  }
  collection_days_array:any=[];
  filter_collection_days(){
    this.serve.fetchData(0,'Distributors/distinct_collection_days_listing').subscribe(r=>{
      console.log("price group", r);
      this.collection_days_array=r;
      console.log("price group", this.price_group_array);
    }) 
    
  }
  
  // aamir changes here 24 feb 2022
  
  
  
  deleteUser(id)
  {
    this.dialog.delete('Distributor Data !').then((result) => {
      if(result){
        this.serve.fetchData({"id":id},"Distributors/distributors_delete").subscribe((result=>{
          console.log(result);
          this.distributorList();
          
        }))
      }})
      
    }
    refresh()
    {
      this.distributorList();
    }
    userDetail(id)
    {
      console.log(id);
      this.serve.distributorListSearch =this.search_val;
      
      this.route.navigate(['/distribution-detail/'+id]);
      
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    tmpsearch1:any={};
    excel_data:any=[];
    exp_data:any=[];
    exportAsXLSX():void {
      this.exp_loader = true;
      this.serve.FileData({'search':this.search_val,'type':this.type},"Distributors/distributor")
      .subscribe(resp=>{
        console.log(resp);
        this.exp_data = resp['distributor'].distributor;
        console.log(this.exp_data);
        for(let i=0;i<this.exp_data.length;i++)
        {                       // Distributor ID
          this.excel_data.push({'Dealer Id':this.exp_data[i].id,'Company Name':this.exp_data[i].company_name,'GST':this.exp_data[i].gst,'Contact Person':this.exp_data[i].name,Mobile:this.exp_data[i].mobile,'WhatsApp No.':this.exp_data[i].whatsapp_no,Email:this.exp_data[i].email,'Address ':this.exp_data[i].address,'State ':this.exp_data[i].state,'District ':this.exp_data[i].district,'City ':this.exp_data[i].city,'Pincode ':this.exp_data[i].pincode,'Assigned Sales User ':this.exp_data[i].assign_user,'Date of Birth':this.exp_data[i].date_of_birth,'Date of Anniversary':this.exp_data[i].date_of_anniversary});
        }
        this.exp_loader = false;
        
        // this.serve.exportAsExcelFile(this.excel_data, 'CHANNEL PARTNER SHEET');
        this.serve.exportAsExcelFile(this.excel_data, 'Dealer SHEET');
        this.excel_data = [];
        this.exp_data = [];
        
      })
      
      
    }
    
    update_status(id,status)
    {
      console.log(id);
      console.log(status);
      
      if(status == 1){
        status = 0;
      }
      else{
        status = 1
      }
      
      console.log(status);
      
      this.alert.confirm("You Want To Change Status Of This Dealer").then((res)=>{
        if(res){
          this.serve.fetchData({'dr_id':id,'status':status},"Distributors/distributor_status_update").subscribe(resp=>{
            console.log(resp);
            if(resp['distributor_status_update']['msg']=="success")
            {
              console.log(resp['distributor_status_update']['msg']);
              
              console.log("res=success");
              
              if(status== 0)
              {
                this.dialog.success("Distributor Status ", "Deactivated");
                setTimeout (() => {
                  
                }, 500);
              }
              else{
                this.dialog.success("Distributor Status ", "Activated");
                setTimeout (() => {
                  
                }, 500);
              }
              
            }
            else{
              this.dialog.success("Something Went ", "Wrong");
            }
          })
        }
      })
     
      
    }
    
  }
  