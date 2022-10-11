import { Component, OnInit } from '@angular/core';
import { PearlService } from 'src/app/pearl.service';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import * as moment from 'moment';
import { LocalStorage } from 'src/app/localstorage.service';

@Component({
  selector: 'app-direct-dealer',
  templateUrl: './direct-dealer.component.html',
  styleUrls: ['./direct-dealer.component.scss']
})
export class DirectDealerComponent implements OnInit {
  data_not_found=false;
  skelton:any={};

  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  constructor(public serve:PearlService,public route:Router,public dialog:DialogComponent,public session:LocalStorage) {

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'distribution direct dealer');
    console.log(index);
    
    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
     
    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
    


  }

  ngOnInit() {
    this.search_val = this.serve.directDealerListSearch
    this. distributorList();
    this.skelton = new Array(10);
  }
  value:any={};
  dr_list_temp:any=[];

  distributor_list:any=[];
  start:any=0;
  count:any;
  total_page:any; 
  pagenumber:any;
  page_limit:any=50
  pagination_count: any = 0;

  state_values:any=[];
  exp_loader:any;
  loader:any;
  data:any=[];
  type:any=7
  search_val:any={}
  dr_count:any;
  status:boolean=true;
  public onDate(event): void
  {
    this.search_val.date_created=moment(event.value).format('YYYY-MM-DD');
    this.distributorList();
  }

  distributorList(action:any='')
  {

    if(action == "refresh")
    {
      this.search_val = {};
      this.distributor_list = [];

    }

    console.log(this.data.search);

    if( Object.getOwnPropertyNames(this.search_val).length != 0)
    {
      this.page_limit = 0;
      this.distributor_list = [];
    }

    if((this.dr_count != 0) && (this.dr_count == this.distributor_list.length))
    {
      return false;
    }

    this.loader=true;
    this.serve.fetchData({'start':this.start,'pagelimit':this.page_limit,'search':this.search_val,'type':this.type},"Distributors/distributor")
    .subscribe((result=>{
      console.log(result);
      this.dr_list_temp=result['distributor']['distributor'];
      this.state_values = result['distributor']['states'];

      this.dr_count = result['distributor']['count'];

      
      this.distributor_list=(result['distributor']['distributor']);

      this.pagination_count=(result['distributor']['distributor_pagination_count']);
      this.total_page = Math.ceil(this.pagination_count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;

      setTimeout (() => {
        this.loader=false;

      }, 1000);
      if(this.distributor_list.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;

      }
    }))
  }

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
    this.serve.directDealerListSearch = this.search_val

      console.log(id);
      this.route.navigate(['/distribution-detail/'+id]);

    }
    getItemsList(index,search)
    {
      console.log(search);
      this.distributor_list=[];

      if(index=='created_by'){
        for(var i=0;i<this.dr_list_temp.length; i++)
        {
          search=search.toLowerCase();
          this.tmpsearch1=this.dr_list_temp[i]['created_name']['name'].toLowerCase();
          if(this.tmpsearch1.includes(search))
          {
            console.log(search);
            this.distributor_list.push(this.dr_list_temp[i]);
          }
        }
      }
      if(index!='created_by'){
        for(var i=0;i<this.dr_list_temp.length; i++)
        {
          search=search.toLowerCase();
          this.tmpsearch1=this.dr_list_temp[i][index].toLowerCase();
          if(this.tmpsearch1.includes(search))
          {
            console.log(search);
            this.distributor_list.push(this.dr_list_temp[i]);
          }
        }
      }
      console.log(this.distributor_list);
    }


    tmpsearch1:any={};
    excel_data:any=[];
    exp_data:any=[];
    exportAsXLSX():void
    {
      this.exp_loader = true;
      this.serve.FileData({'search':this.search_val,'type':this.type},"Distributors/distributor")
      .subscribe(resp=>{
        console.log(resp);
        this.exp_data = resp['distributor']['distributor'];
        console.log(this.exp_data);

        for(let i=0;i<this.exp_data.length;i++){
          this.excel_data.push({'Direct Dealer Id':this.exp_data[i].id,'Company Name':this.exp_data[i].company_name,'GST':this.exp_data[i].gst,'Contact Person':this.exp_data[i].name,Mobile:this.exp_data[i].mobile,'WhatsApp No.':this.exp_data[i].whatsapp_no,Email:this.exp_data[i].email,'Address ':this.exp_data[i].address,'State ':this.exp_data[i].state,'District ':this.exp_data[i].district,'City ':this.exp_data[i].city,'Pincode ':this.exp_data[i].pincode, 'City': this.exp_data[i].city, 'Assigned Sales User':this.exp_data[i].assign_user,'Date of Birth':this.exp_data[i].date_of_birth,'Date of Anniversary':this.exp_data[i].date_of_anniversary});
        }
        this.exp_loader = false;

        this.serve.exportAsExcelFile(this.excel_data, 'DIRECT DEALER SHEET');
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
      
      this.serve.fetchData({'dr_id':id,'status':status},"Distributors/distributor_status_update").subscribe(resp=>{
        console.log(resp);
        if(resp['distributor_status_update']['msg']=="success")
        {
          console.log(resp['distributor_status_update']['msg']);
          
          console.log("res=success");
          
          if(status== 0)
          {
            this.dialog.success("Direct Dealer Status ", "Deactivated");
             setTimeout (() => {
              
            }, 500);
          }
          else{
            this.dialog.success("Direct Dealer Status ", "Activated");
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
