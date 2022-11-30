import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incentive-master-list',
  templateUrl: './incentive-master-list.component.html',
  styleUrls: ['./incentive-master-list.component.scss']
})
export class IncentiveMasterListComponent implements OnInit {
  IncentiveMasterList:any=[];
  skelton:any=new Array(10);
  loader:boolean=false;
  constructor(public router:Router) { }

  ngOnInit() {
  }

  get_Incentive_Master_list(action:any=''){

  }

  addIncentiveMaster(){
    this.router.navigate(['IncentiveMasterAdd'])
  }

}
