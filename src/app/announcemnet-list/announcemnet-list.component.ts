import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-announcemnet-list',
  templateUrl: './announcemnet-list.component.html',
  styleUrls: ['./announcemnet-list.component.scss']
})
export class AnnouncemnetListComponent implements OnInit {
  
  skelton : any = new Array(10);
  loader:any=false;
  data_not_found=false;
  
  announcement_list:any=[];
  search:any={};
  
  
  
  constructor(public serve:PearlService, public route: Router) { 
    
    this.get_announcement_list();
    
  }
  
  ngOnInit() {
    this.search = this.serve.announcementListSearch;
  }
  public onDate(event):void{
    console.log("event date change",event);
    this.search.date_created=moment(event.value).format("YYYY-MM-DD");
    this.get_announcement_list();
  }

  get_announcement_list(action:any=''){
    
    console.log("get_announcement_list method calls");
    


    if(action == "refresh"){
      this.search = {};
      this.announcement_list = [];
      
    }
    
    this.loader =true;
    this.serve.fetchData({'search':this.search},"Announcement/announcement_list").subscribe((result=>{
      console.log(result);
      this.announcement_list=result['announcementList'];
      console.log(this.announcement_list);
      this.serve.announcementListSearch ={}
      setTimeout (() => {
        this.loader= false;
        
      }, 700);
      
      if(this.announcement_list.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
      }
      
    }))
  }

  convert_integer(value){

    return parseInt(value)


  }
  announcementDetail(id){
    console.log(`announcement id : ${id}`);
    this.serve.announcementListSearch = this.search;
    this.route.navigate(['/announcement-detail/'+id]);

  }
  
}
