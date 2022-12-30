import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-gift-list',
  templateUrl: './user-gift-list.component.html',
  styleUrls: ['./user-gift-list.component.scss']
})
export class UserGiftListComponent implements OnInit {
  userGiftlist:any=[]
  skelton:any=new Array(10);
  loader:any=false;
  data_not_found:any=false
  constructor() { }

  ngOnInit() {
  }

  refresh(){

  }

  exportAsXLSX(){

  }


  addUserGiftMaster(){
    
  }

}
