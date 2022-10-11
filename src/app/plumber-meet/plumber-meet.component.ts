import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment/moment';
import { LocalStorage } from '../localstorage.service';
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
import { PearlService } from '../pearl.service';


@Component({
  selector: 'app-plumber-meet',
  templateUrl: './plumber-meet.component.html',
  styleUrls: ['./plumber-meet.component.scss']
})
export class PlumberMeetComponent implements OnInit {
  search:any={};
  active_tab:any = 'All';
  plumber_meet_List:any = [];
  skelton: any = new Array(10);
  loader: any ;
  data_not_found: any = false;
  plumber_data_count:any ={}

  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;




  constructor(public serve: PearlService,public session:LocalStorage,public dialog: MatDialog,public route : Router) {

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'plumber meet');
    console.log(index);

    if(index != -1){
      this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
      this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
      this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
      console.log(this.view_add);
      console.log(this.view_edit);
      console.log(this.view_delete);

    }


    this.get_plumber_meet_List();
  }

  ngOnInit() {
    this.search = this.serve.plumberListSearch;
  }


  con_date(date,type){
    this.search[type] = moment(date).format('YYYY-MM-DD');
    this.get_plumber_meet_List();
  }

  get_plumber_meet_List(action : any = ''){
    console.log("get_plumber_meet_List method caLLs");
    console.log(this.active_tab);

    if(action == "refresh"){
      this.search = {};
      this.plumber_meet_List = [];
    }

    this.loader=true;
    this.serve.fetchData({'search':this.search,'status':this.active_tab},"PlumberMeet/plumber_meet_listing_for_web")
    .subscribe((result=>{
      console.log(result);
      this.plumber_meet_List = result['plumber_meet_list']
      this.plumber_data_count = result['count_data']
      this.serve.plumberListSearch ={};
      setTimeout (() => {
        this.loader=false;
      }, 700);
      if(this.plumber_meet_List.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
      }
    }))

  }

  change_plumber_meet_status(plumber_meet_id,plumber_meet_status){
    console.log("change_plumber_meet_status method calls");
    const dialogRef = this.dialog.open(StatusModalComponent, {
      width: '400px', data: {
        'plumber_meet_id' : plumber_meet_id,
        'plumber_meet_status' : plumber_meet_status,
        'from' : 'plumber-meet-list-page'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.get_plumber_meet_List();
    });

  }
  plumberDetail(id){
    console.log(`plumber id :${id}`);
    this.serve.plumberListSearch =this.search;
    this.route.navigate(['/plumber-meet-detail/'+id]);
  }

}
