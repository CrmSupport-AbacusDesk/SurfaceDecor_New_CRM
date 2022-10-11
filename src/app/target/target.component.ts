import { Component, OnInit, ViewChildren } from '@angular/core';
import { MatDialog, MatSelect } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogComponent } from '../dialog.component';
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
import { PearlService } from '../pearl.service';
import { TargetaddComponent } from '../targetadd/targetadd.component';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {

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
  all_company_list:any=[];

  search:any={};

  target_list:any=[];
  login: any = {};

  enable_edit:any=0;
  complaint_count:any={};
  all_brands_list:any=[]
  constructor(public serve:PearlService,public popup_dialog: MatDialog,public popup_dialog1: DialogComponent,public toast:ToastrManager,public route:Router) {
    this.get_target_list();
    this.get_brand_list()
    this.get_company_list()
  }

  ngOnInit() {
    this.search=this.serve.complainListSearch;
    this.login= JSON.parse(sessionStorage.getItem('login'));
    console.log(this.login.data.id);
  }

  public onDate(event):void{
    this.search.date=moment(event.value).format("YYYY-MM-DD");
    this.get_target_list();
  }
  deleteTarget(id){
    this.popup_dialog1.confirm("You Want To Delete This Company Target ?").then((res)=>{
      console.log(id);
      this.serve.fetchData({'id':parseInt(id),'updated_by':this.login.data.id},"User/delete_Companytarget").subscribe((result)=>{
        console.log(result);
        this.get_target_list();
      });
    })
   
  }
  get_company_list() {
    console.log("get_brand_list method calls");
    this.serve.fetchData({}, 'User/companyList').subscribe((result) => {
      console.log(result);
      this.all_company_list = result['companyList'];
      
    });
    
  }
  get_target_list(action:any=''){

    console.log("get_complain_list method calls");



    if(action == "refresh"){
      this.search = {};
      this.complaint_list = [];
      this.start=0;
    }

    this.loader =true;
    
    this.serve.fetchData({'filter':this.search,'start':this.start,'pagelimit':this.page_limit},"User/companyTarget_list").subscribe((result)=>{
      console.log(result);
      this.target_list=result['target_list'];
      setTimeout(() => {
        this.loader=false;
      }, 1000);
    });
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
    this.get_target_list();
        
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
    this.get_target_list();

      },err => {

      });


    }



  }


  get_brand_list() {
    console.log("get_brand_list method calls");
    this.serve.fetchData({}, 'Brand_list/brand_list').subscribe((result) => {
      console.log(result);
      this.all_brands_list = result['brand_list'];
      
    });
    
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
  targetModal() {
        
    console.log("targetModal method calls");
    
    const dialogRef = this.popup_dialog.open(TargetaddComponent, {
      width: '1024px',
     
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get_target_list();
      
    });
    
  }
}

