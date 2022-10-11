import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { PearlService } from '../pearl.service';
import { MatDialog, MatSelect } from '@angular/material';
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
import * as moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';



@Component({
  selector: 'app-complain-list',
  templateUrl: './complain-list.component.html',
  styleUrls: ['./complain-list.component.scss']
})
export class ComplainListComponent implements OnInit {

  @ViewChildren(MatSelect) mySelector: MatSelect;

  openSelector(select_id,complain_id) {
    console.log(complain_id);
    this.enable_edit = complain_id
    console.log(this.mySelector);


    // this.mySelector.open();
    // this.mySelector['result']['id'].open();
    // console.log(this.mySelector['_results'][0]['id']);

    setTimeout(()=>{
      let index = this.mySelector['_results'].findIndex(row => row.id == select_id)
      this.mySelector['_results'][index].open();

    },10)

    return true

  }

  skelton : any = new Array(10);
  loader:any=false;
  data_not_found=false;
  active_tab:any = 'All';
  pagenumber:any=0;
  total_page:any=0;
  start:any=0;
  page_limit:any=50;
  pagination_count:any=0
  complaint_list:any=[];
  search:any={};

  sales_user_list:any=[];
  login: any = {};

  enable_edit:any=0;
  complaint_count:any={};

  constructor(public serve:PearlService,public popup_dialog: MatDialog,public toast:ToastrManager,public route:Router) {
    this.get_complain_list();
    this.get_sales_user_list();

  }

  ngOnInit() {
    this.search=this.serve.complainListSearch;
    this.login= JSON.parse(sessionStorage.getItem('login'));
    console.log(this.login.data.id);
  }

  public onDate(event):void{
    this.search.date=moment(event.value).format("YYYY-MM-DD");
    this.get_complain_list();
  }
  get_complain_list(action:any=''){

    console.log("get_complain_list method calls");



    if(action == "refresh"){
      this.search = {};
      this.complaint_list = [];
      this.start=0;
    }

    this.loader =true;
    this.serve.fetchData({'filter':this.search,'status':this.active_tab,'start':this.start,'pagelimit':this.page_limit},"Complaint_Controller/complaint_list").subscribe((result=>{
      console.log(result);
      this.complaint_list=result['complaint_list'];
      this.complaint_count=result['complaint_count'];
      this.pagination_count =result['count'];
      this.total_page =Math.ceil(this.pagination_count/this.page_limit);
      this.pagenumber=Math.ceil(this.start/this.page_limit)+1;
      console.log(this.complaint_list);
      this.serve.complainListSearch ={}
      this.loader= false;
      // setTimeout (() => {

      // }, );

      if(this.complaint_list.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
      }

    }))
  }

  openDialog(complain_id,complain_status,where_to): void {

    console.log('openDialog method calls');
    console.log('complain_id = '+complain_id);
    console.log('complain_status = '+complain_status);
    console.log('where_to = '+where_to);

    if(where_to == 'for_status_change'){

      const dialogRef = this.popup_dialog.open(StatusModalComponent, {
        width: '400px', data: {
          'from' : 'complain_list',
          'complain_status' : complain_status,
          'complain_id' : complain_id,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.get_complain_list();
      },err => {

      });
    }

    else if(where_to == 'for_view_images'){

      const dialogRef = this.popup_dialog.open(StatusModalComponent, {
        width: '600px', data: {
          'from' : 'complain_list',
          'complain_id' : complain_id,
          'where_to':where_to
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.get_complain_list();
      },err => {

      });


    }



  }


  get_sales_user_list(){

    console.log("get_sales_user_list method calls");
    this.loader =true;
    this.serve.fetchData({},"Complaint_Controller/assign_complain_user_list").subscribe((result=>{
      console.log(result);
      this.sales_user_list = result['assign_complain_user_list']
      console.log("this sales user list", this.sales_user_list);
      this.loader= false;

    }))
  }


  assign_sales_user(selected_sales_user,complain_id){
    console.log("assign_sales_user method calls");
    console.log(selected_sales_user);
    this.serve.fetchData({'user_id':selected_sales_user,'assign_by':this.login.data.id,'id':complain_id},"Complaint_Controller/assign_complaint_to_sales_user").subscribe((result=>{
      if(result['msg']=='Assigned Successfully'){
        this.toast.successToastr("sucess");
        this.loader= false;
        console.log(result);
        this.enable_edit = 0;
        this.get_complain_list();

      }else{
        this.toast.successToastr("Something Went Wrong");
      }

    }))

  }


  imageModel(image){
    const dialogRef = this.popup_dialog.open( StatusModalComponent, {
      width: '500px',data:{
        image,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');

    });

  }
  complainDetail(id){
    this.serve.complainListSearch =this.search;
    this.route.navigate(['/complain-detail/'+id])

  }

}
