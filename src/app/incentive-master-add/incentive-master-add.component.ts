import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incentive-master-add',
  templateUrl: './incentive-master-add.component.html',
  styleUrls: ['./incentive-master-add.component.scss']
})
export class IncentiveMasterAddComponent implements OnInit {
  loader:boolean=false;
  data:any={};
  constructor() { }

  ngOnInit() {
  }

  addIncentiveMaster(){

  }

}
