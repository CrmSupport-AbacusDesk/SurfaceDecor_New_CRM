import { Component, OnInit } from '@angular/core';

import { PearlService } from 'src/app/pearl.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import * as moment from 'moment';
import { LocalStorage } from 'src/app/localstorage.service';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss']
})
export class DealerComponent implements OnInit {
  public static id: any;
  id:any;
  
  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  
  
  
  
  
  constructor(public serve: PearlService, public route: Router, public routes: ActivatedRoute, public dialog: DialogComponent,public session:LocalStorage) {
    
    
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'distribution dealer');
    console.log(index);
    
    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
    
    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
    
    
    
    
    
    
    
    
    
    
    
  }
  data_not_found = false;
  skelton: any = {};
  value: any = {};
  distributor_list: any = [];
  start: any = 0;
  count: any= 0;
  total_page: any;
  pagenumber: any;
  page_limit: any = 50;
  exp_loader: any;
  loader: any;
  data: any = [];
  state_values: any = [];
  dr_list_temp: any = [];
  search_val: any = {};
  type: any = 3;
  dr_count: any;
  tmpsearch1: any = {};
  exp_data: any = [];
  excel_data: any = [];
  dealer_channel_partner: any=  {};
  distributor_list1: any =[];
  state_values1: any =[];
  pagination_count: any = 0;
  
  
  
  ngOnInit() {
    this.search_val = this.serve.dealerListSearch;
    
    
    this.distributorList();
    this.skelton = new Array(10);
  }
  public onDate(event): void {
    this.search_val.date_created = moment(event.value).format('YYYY-MM-DD');
    this.distributorList();
  }
  distributorList(action: any= '') {
    
    this.distributor_list = [];
    
    
    if (action == 'refresh') {
      this.search_val = {};
      
      this.distributor_list = [];
      
      
      
    }
    
    console.log(this.data.search);
    
    if ( Object.getOwnPropertyNames(this.search_val).length != 0) {
      
      
      
      
      
      
    }
    if ( (this.dr_count == this.distributor_list.length)) {
      return false;
    }
    
    this.loader = true;
    
    this.serve.fetchData({ 'dealer id:-': this.search_val.id, 'start': this.start, 'pagelimit': this.page_limit, 'search': this.search_val,  'dealer id': this.dealer_channel_partner, 'type': this.type}, 'Distributors/distributor')
    .subscribe((result => {
      
      
      console.log(result);
      console.log(this.distributor_list.id);
      this.count = result['distributor']['count'];
      this.state_values = result['distributor']['states'];
      
      this.pagination_count=(result['distributor']['distributor_pagination_count']);
      this.total_page = Math.ceil(this.pagination_count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
      
      this.distributor_list=(result['distributor']['distributor']);
      
      this.dr_list_temp = result['distributor']['distributor'];
      this.dr_count = result['distributor']['count'];      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      setTimeout (() => {
        this.loader = false;
        
      }, 4000);
      
      if (this.distributor_list.length == 0) {
        this.data_not_found = true;
      } else {
        this.data_not_found = false;
        
      }
    }));
  }
  
  deleteUser(id) {
    this.dialog.delete('Distributor Data !').then((result) => {
      if (result) {
        
        this.serve.fetchData({'id': id}, 'Distributors/distributors_delete').subscribe((result => {
          console.log(result);
          this.distributorList();
          
        }));
      }});
      
    }
    refresh() {
      this.distributor_list = this.distributorList();
      this.distributor_list = this.distributor_list.filter((el, i, a) => i === a.indexOf(el));
    }
    userDetail(id) {
      this.serve.dealerListSearch = this.search_val;
      console.log(id);
      this.route.navigate(['/distribution-detail/' + id]);
      
    }
    getItemsList(search) {
      console.log(search);
      this.distributor_list = [];
      
      
      
      for (let i = 0; i < this.dr_list_temp.length; i++) {
        search = search.toLowerCase();
        this.tmpsearch1 = this.dr_list_temp[i]['created_name']['name'].toLowerCase();
        if (this.tmpsearch1.includes(search)) {
          
          console.log(search);
          
          
          this.distributor_list.push(this.dr_list_temp[i]);
        }
        
        
      }
      
      
      
      
      console.log(this.distributor_list);
      
    }
    getItemsList1() {
      console.log(this.value.search);
      console.log(this.dr_list_temp);
      
      this.distributor_list = [];
      for (let i = 0; i < this.dr_list_temp.length; i++) {
        this.value.search = this.value.search.toLowerCase();
        
        this.tmpsearch1 = this.dr_list_temp[i]['company_name'].toLowerCase();
        if (this.tmpsearch1.includes(this.value.search)) {
          this.distributor_list.push(this.dr_list_temp[i]);
        }
      }
    }
    exportAsXLSX(): void {
      this.exp_loader = true;
      
      this.serve.FileData({'search': this.search_val, 'dealer id: -': this.search_val.id,'type': this.type, 'channel partner': this.dealer_channel_partner},  'Distributors/distributor')
      .subscribe(resp => {
        console.log(resp);
        this.exp_data = resp['distributor']['distributor'];
        console.log(this.exp_data);
        for (let i = 0; i < this.exp_data.length; i++) {
          
          
          let channelPartnerStr = '';
          for (let index = 0; index < this.exp_data[i].dealer_channel_partner.length; index++) {
            channelPartnerStr +=  this.exp_data[i].dealer_channel_partner[index].chnlprtnr;
            
          }
          this.excel_data.push({ 'channel partner': channelPartnerStr, 'Company Name': this.exp_data[i].company_name,  'Contact Person': this.exp_data[i].name, Mobile: this.exp_data[i].mobile, 'WhatsApp No.': this.exp_data[i].whatsapp_no, Email: this.exp_data[i].email, 'Address ': this.exp_data[i].address, 'State ': this.exp_data[i].state, 'District ': this.exp_data[i].district, 'City ': this.exp_data[i].city, 'Pincode ': this.exp_data[i].pincode, 'Assigned Sales User': this.exp_data[i].assign_user});
        }
        this.serve.exportAsExcelFile(this.excel_data, 'Retail Partner SHEET');
        this.excel_data = [];
        this.exp_data = [];
      });
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
      
      this.serve.fetchData({'dr_id':id,'status':status},"Distributors/distributor_status_update").subscribe(resp=>{
        console.log(resp);
        if(resp['distributor_status_update']['msg']=="success")
        {
          console.log(resp['distributor_status_update']['msg']);
          
          console.log("res=success");
          
          if(status== 0)
          {
            this.dialog.success("Dealer Status ", "Deactivated");
            setTimeout (() => {
              
            }, 500);
          }
          else{
            this.dialog.success("Dealer Status ", "Activated");
            setTimeout (() => {
              
            }, 500);
          }
          
        }
        else{
          this.dialog.success("Something Went ", "Wrong");
        }
      })
      
    }
    
    
    
    
  }
  