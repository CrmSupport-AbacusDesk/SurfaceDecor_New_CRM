import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { PearlService } from 'src/app/pearl.service';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { UserEmailModalComponent } from '../user-email-modal/user-email-modal.component';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { UpdateAdminModelComponent } from '../update-admin-model/update-admin-model.component';
import { LocalStorage } from 'src/app/localstorage.service';
import { UserTargetComponent } from '../user-target/user-target.component';
import { StatusModalComponent } from 'src/app/order/status-modal/status-modal.component';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-sale-user-list',
  templateUrl: './sale-user-list.component.html',
  animations: [slideToTop()]
  
})
export class SaleUserListComponent implements OnInit {
  excel_data:any=[];
  tmp:any=[];
  date : any;
  userlist:any=[];
  start:any=0;
  value:any={}
  total_page:any;
  pagenumber:any;
  count:any;
  tmp_UserList:any=[];
  page_limit:any=10
  loader:any;
  Status:boolean=true;
  data_not_found=false;
  dialog: any;
  skelton:any={};
  datauser: any = {};
  data: any;
  
  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  active_tab:any='Office'
  
  
  constructor(public alert:DialogComponent,public serve:PearlService,public rout:Router,public dialog2: MatDialog,public session:LocalStorage,public toast:ToastrManager) {
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'executive master');
    console.log(index);
    
    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
    
    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
    
    
    
    
    this.datauser = JSON.parse(sessionStorage.getItem('st_user'));
    this.getUserList(0,10);
    this.salesUserLIst();
    this.skelton = new Array(10);
    
    
  }
  
  ngOnInit() {
    this.value = this.serve.saleListSearch;
  }
  public onDate(event): void 
  {
    
    this.userlist[1]['updated_at']=moment(this.userlist[1]['updated_at']).format('YYYY-MM-DD');
    console.log(this.userlist[1]['updated_at']);
    
    
  }
  getUserList(start,end){
    if(this.userlist.updated_at)
    {
      
      this.userlist[1]['updated_at']=moment(this.userlist[1]['updated_at']).format('YYYY-MM-DD');
      console.log(this.userlist[1]['updated_at']);
      
    }
    
    this.loader=1;
    this.start=start;
    this.page_limit=end;
    this.serve.fetchData({"start":this.start,"pagelimit":this.page_limit,"search":this.value,'active_tab':this.active_tab},"User/sales_user_list").subscribe((result)=>{
      this.userlist=result['sales_user_list'];
      
      this.tmp_UserList=result['sales_user_list'];
      
      
      
      this.count=this.userlist.length;
      this.total_page = Math.ceil(this.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
      this.serve.saleListSearch ={};
      setTimeout (() => {
        this.loader='';
      }, 700);
      if(this.userlist.length ==0){
        this.data_not_found=true;
      }
    })
    
    
    
    
  }
  
  
  refresh()
  {
    this.getUserList(0,10);
  }
  deleteUser(id)
  {
    this.alert.delete('User Data !').then((result) => {
      if(result){
        this.serve.fetchData({"user_id":id,'last_updated_by':this.datauser['data']['id'],'last_updated_by_name':this.datauser['data']['name']},"User/delete_user").subscribe((result)=>{
          if(result)
          {
            this.getUserList(0,10);
          }
        })
      }
    });
  }
  
  userDetail(id)
  {
    let value={"id":id}
    this.serve.fetchData(value,"User/user_detail").subscribe((result)=>{
      this.rout.navigate(['/sale-user-detail/'+id]);
    })
  }
  getItemsList(index,search){
    this.userlist=[];
    for(var i=0;i<this.tmp_UserList.length; i++)
    {
      search=search.toLowerCase();
      
      search=search.toLowerCase();
      if(this.tmp_UserList[i][index]!=null){
        this.tmp=this.tmp_UserList[i][index].toLowerCase();
        
      }
      if(this.tmp_UserList[i][index]==null){
        this.tmp='';
        
      }
      
      
      if(this.tmp.includes(search))
      {
        this.userlist.push(this.tmp_UserList[i]);
      }     
    }    
  }
  
  asmList:any=[];
  salesUserLIst()
  {
    this.serve.fetchData({'state':0,'active_tab':this.active_tab},"User/sales_user_list").subscribe((result=>{
      console.log(result);
      this.asmList=result['sales_user_list'];
      
      
      console.log(this.asmList);
    }))
    
  }
  
  userStatus(index,id)
  {
    
    
    console.log(id);
    console.log(index);
    
    console.log(this.userlist[index].status);
    if(this.userlist[index].status=='true')
    { 
      // this.userlist[index].status=0;
      this.userlist[index].status='false';
      console.log(this.userlist[index].status);
    }
    else
    { 
      // this.userlist[index].status=1;
      this.userlist[index].status='true';
      console.log(this.userlist[index].status);
    }
    
    let value={"status":this.userlist[index].status}
    this.alert.confirm('You Want To Change Status Of This User').then((res)=>{
      if(res){
        this.serve.fetchData({'user_id':id,'data':value,'last_updated_by':this.datauser['data']['id'],'last_updated_by_name':this.datauser['data']['name'] },"User/update_user")
        .subscribe(resp=>{
          console.log(resp);
          if(resp['query']['msg']='success'){
            this.toast.successToastr('Status Updated Successfully')
            this.getUserList(0,10);
          }
          else{
            this.toast.errorToastr("Something Went Wrong")
          }
        })
      }
    })
   
  }
  xLXSArray:any=[]   
  exceldata(){
    for(let i=0;i<this.userlist.length;i++){
      this.excel_data[i].name = this.userlist[i].name
      this.excel_data[i].user_type = this.userlist[i].user_type
      this.excel_data[i].role_name = this.userlist[i].role_name
      this.excel_data[i].mobile = this.userlist[i].contact_01
      this.excel_data[i].reporting_manager = this.userlist[i].reporting_manager
    }
  }
  
  
  
  
  exportAsXLSX():void {
    for(let i=0;i<this.userlist.length;i++){
      this.excel_data.push({'Employee Code':this.userlist[i].employee_id,Name:this.userlist[i].name,Type:this.userlist[i].user_type,Mobile:this.userlist[i].contact_01,Designation:this.userlist[i].role_name,ReportingManager:this.userlist[i].assign_user,'Address ':this.userlist[i].street,'State ':this.userlist[i].state_name,'District ':this.userlist[i].district_name,'City ':this.userlist[i].city,'Pincode ':this.userlist[i].pincode,});
    }
    this.serve.exportAsExcelFile(this.excel_data, 'USER SHEET');
  }
  
  deleteOrder(id)
  {
    this.dialog.delete('User Data !').then((result) => {
      if(result){
        console.log("order deleted");
        
        this.serve.fetchData({'order_id':id},"Order/order_delete").subscribe((result=>{
          console.log(result);
          if(result)
          {
            this.getUserList(0,10);
          }
        }))
      }});
    }
    
    openModal()
    {
      console.log('test');
      
      const dialogRef = this.dialog2.open(UpdateAdminModelComponent, {
        width: '500px',
        data:{
          
        }});
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          console.log('The dialog was closed');
          
        });
        
      }
      
      
      
      targetModal(user_id) {
        
        console.log("targetModal method calls");
        
        const dialogRef = this.dialog2.open(UserTargetComponent, {
          width: '1024px',
          data: {
            user_id
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          
        });
        
      }
      
      
      openDialog(id,user_status): void {
        const dialogRef = this.dialog2.open(StatusModalComponent, {
          width: '400px', data: {
            'from' : 'Change Status from user list',
            'user_verification_status' : user_status,
            'user_id' : id,
          }
        });
        this.loader = 1;
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.loader = '';
          this.getUserList(0,10);
          this.salesUserLIst();  
          
        },err => {
          this.loader = '';
        });
      }
      saleuserDetail(id){
        console.log( `sale id : ${id}`);
         this.serve.saleListSearch = this.value;
         this.rout.navigate(['/sale-user-detail/'+id]);
      }
      
      
    }
    