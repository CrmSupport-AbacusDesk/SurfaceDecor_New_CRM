import { Component, OnInit } from '@angular/core';
import { PearlService } from 'src/app/pearl.service';
import * as moment from 'moment';
import { LocalStorage } from 'src/app/localstorage.service';


@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit {
  travel_list:any=[];
  loader:any=false;
  page_limit:any=50
  search:any={};
  skelton:any={}
  data_not_found=false;
  pagenumber:any=0;
  total_page:any=0;
  start:any=0;

  pagination_count:any=0
  
  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;

  active_tab:any = 'Pending';
  travel_list_count: any = {};

  
  constructor(public serve:PearlService,public session:LocalStorage) 
  { 
    this.skelton = new Array(10);


    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'travel plan');
    console.log(index);
    
    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
     
    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);


    
  }
  
  ngOnInit()
  {
    this.getTravelList();
  }
  
  getTravelList(action:any='')
  {
    if(action == "refresh")
    {
      this.search = {};  
      this.data_not_found = false;
      this.start=0;
    }

    this.loader=true;
    
    this.serve.fetchData({'start':this.travel_list.length,'pagelimit':this.page_limit,'start_travel_count':this.start,'search':this.search,'status':this.active_tab},"Travel/travel_list").subscribe((result=>
      {
        console.log(result);
        this.loader= false;
        this.travel_list = result['travel_list'];
        this.travel_list_count = result['travel_plan_status_wise_count_data'];
        this.pagination_count =result['count'];
        this.total_page =Math.ceil(this.pagination_count/this.page_limit);
        this.pagenumber=Math.ceil(this.start/this.page_limit)+1;
        
        if(this.travel_list.length == 0)
        {
          this.data_not_found = true;
        }
        else
        {
          this.data_not_found = false;
        }

        console.log( this.data_not_found);
        

      }))
    }
    
    public onDate(event): void 
    {
      this.search.travel_date=moment(event.value).format('YYYY-MM-DD');    
      console.log(this.search.travel_date);
      
      this.getTravelList();
    }

    public onDateBetween(event , date_type): void 
    {
      console.log("date type ",date_type);
      if(date_type == 'date_from'){
        this.search.date_from = moment(event.value).format('YYYY-MM-DD');  
        console.log("Date From " , this.search.date_from);
      }else if(date_type == 'date_to'){
        this.search.date_to = moment(event.value).format('YYYY-MM-DD');    
        console.log("Date To " , this.search.date_to);
      }
      
      // this.getTravelList();
    }

    
    
  }
  