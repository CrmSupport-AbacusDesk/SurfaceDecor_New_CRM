import { Component, OnInit } from '@angular/core';
import { PearlService } from 'src/app/pearl.service';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { MatDialog } from '@angular/material';
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
import * as moment from 'moment';
import { LocalStorage } from '../localstorage.service';




@Component({
  selector: 'app-pop-n-gift-master',
  templateUrl: './pop-n-gift-master.component.html',
  styleUrls: ['./pop-n-gift-master.component.scss']
})
export class PopNGiftMasterComponent implements OnInit {
  
  
  search_val:any = {};
  gift_List:any;
  data_not_found=false;
  skelton:any={}
  loader:any;
  
  
  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  
  constructor(public serve:PearlService,public route:Router,public dialog:DialogComponent,public dialogs: MatDialog,public session:LocalStorage) { 
    console.log("pop-n-gift-master call");
    this.skelton = new Array(10);
    
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'pop master');
    console.log(index);
    
    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
    
    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
    
    this.giftList();
    
  }
  
  ngOnInit() {
    this.search_val = this.serve.popngiftmasterListSearch;
  }
  
  giftList(type:any='')
  {


    if(type == 'refresh'){
      this.search_val = {};
      this.gift_List = [];
    }

    this.loader=true;
    this.search_val;
    
    this.serve.fetchData({'search':this.search_val},"Product/pop_master_list")
    .subscribe((result=>{
      console.log(result);
      this.gift_List= result;
      console.log(this.gift_List);
      this.serve.popngiftmasterListSearch ={};
      setTimeout (() => {
        this.loader=false;
        
      }, 700);
      if(this.gift_List.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
        
      }
    }))
  }
  
  viewDetails(id){
    this.serve.popngiftmasterListSearch = this.search_val;
    this.route.navigate(["/add-pop-n-gift/"+id])
    
  }
  
  deleteGift(id){
    
    this.dialog.delete('POP GIFT Data !').then((result) => {
      if(result){
        this.serve.fetchData({ "id": id }, "Product/pop_master_delete").subscribe((result) => {
          console.log(result);
          if(result == 'Success')
          {
            this.dialog.success("POP Gift", "Delete");
            this.giftList();
          }
          else{
            this.dialog.error("Something Went Wrong");
          }
          
        })
      }
    });
  }
  
  
  
  imageModel(image){
    const dialogRef = this.dialogs.open( StatusModalComponent, {
      data:{
        image,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
      
    });
    
  }
  
  
  public onDate(event): void
  {
    this.search_val.date_created=moment(event.value).format('YYYY-MM-DD'); 
    this.giftList();
  }
  
  
  goTo_scheme_master(){
    this.route.navigate(["/scheme-master-list/"])
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
    
    this.serve.fetchData({'pop_id':id,'status':status},"Product/pop_master_status_update").subscribe(resp=>{
      console.log(resp);
      this.giftList();
      
    })
    
  }
  
  
}
