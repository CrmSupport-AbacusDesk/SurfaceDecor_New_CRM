import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-report-incentive-list',
  templateUrl: './report-incentive-list.component.html',
  styleUrls: ['./report-incentive-list.component.scss']
})
export class ReportIncentiveListComponent implements OnInit {
  ReportIncentiveList:any=[];
  skelton:any=new Array(10);
  loader:boolean=false;
  search_val:any={};
  constructor() { }

  ngOnInit() {
  }

  refresh(){

  }

  getReportIncentive(){

  }

  onBetweenDate(event,tab){
    console.log(event);
    console.log(tab);
    if(tab=='date_from'){
      this.search_val.date_from=moment(event.value).format('YYYY-MM-DD');
    }
    if(tab=='date_to'){
      this.search_val.date_to=moment(event.value).format('YYYY-MM-DD');

    }
  }

}
