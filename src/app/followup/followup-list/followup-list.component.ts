import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { PearlService } from 'src/app/pearl.service';
import * as moment from 'moment/moment';


@Component({
  selector: 'app-followup-list',
  templateUrl: './followup-list.component.html',

  animations: [slideToTop()]

})
export class FollowupListComponent implements OnInit {

  followup_list:any=[];
  value:any=[];
  search:any={};
  tmp_follow_list:any=[];
  skelton: any = {};
  loader: any ;
  data_not_found: any = false;
  active_tab:any = 'pending';
  followup_count:any={};
  pagenumber:any = 0;
  total_page:any = 0; 
  start:any=0;
  page_limit:any=50
  pagination_count: any = 0;

  
  constructor(public serve:PearlService){
    this.skelton = new Array(10);

    this.followUpList('pending');
  }

  ngOnInit() {
  }

  followUpList(action:any='')
  {

    let status = ''
    if(action == "refresh")
    {
      this.search = {};
      this.followup_list = [];
      this.active_tab = 'pending';
      this.start=0;
      status = 'Pending';

    }
    else if(action == "pending"){
      status = 'Pending';
    }
    else if(action == "upcoming"){
      status = 'Upcoming';
    }
    else if(action == "done"){
      status = 'Done';
    }

    if(this.search.date_created){
      this.search.date_created=moment(this.search.date_created).format('YYYY-MM-DD');
    }

    this.loader =true;
    this.serve.fetchData({'search':this.search,'status':status,'start':this.start,'pagelimit':this.page_limit},"Distributors/follow_up_list").subscribe((result=>{
      console.log(result);
      this.followup_list=result['followup_list'];
      this.followup_count = result['followup_count'];
      this.pagination_count=result['total_count'];
      this.total_page=Math.ceil(this.pagination_count/this.page_limit);
      this.pagenumber=Math.ceil(this.start/this.page_limit)+1;

      console.log(this.followup_list);
      console.log(this.followup_count);
      setTimeout (() => {
        this.loader= false;

      }, 700);

      if(this.followup_list.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;

      }

    }))
  }

  con_date(date){
    this.search.followup_date = moment(date).format('YYYY-MM-DD');
    console.log(this.search.followup_date);
    this.followUpList(this.active_tab);

  }

}
