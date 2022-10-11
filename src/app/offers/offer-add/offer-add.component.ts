import { Component, OnInit } from '@angular/core';
import { PearlService } from 'src/app/pearl.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.scss']
})
export class OfferAddComponent implements OnInit {
  state_list:any=[];
  district_list:any=[];
  data:any={};
  loader:any='';
  data_not_found : any=false;
  constructor(public serve:PearlService,public rout:Router,public route:ActivatedRoute) { 
    this.getStateList();
    
  }
  district_name : any='';
  ngOnInit() {
  }
  getStateList()
  {
    console.log("addUser");
    this.serve.fetchData(0,"User/state_user_list").subscribe((response=>{
      console.log(response);  
      this.state_list=response['query']['state_name'];
      console.log(this.state_list);
    }));
    
  }
  all_district:any=[];
  
  
  
  
  
  
  
  
  
  
  
  
  
  districts(state){
    console.log(state);
    
  }
  offer_add(){
    console.log(this.data);
    console.log("offer_add**********");
    this.serve.fetchData(this.data,"Offer/offer_add").subscribe((response=>{
      
      
      
    }));
  }
}
