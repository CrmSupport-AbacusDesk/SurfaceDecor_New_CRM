import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { retry } from 'rxjs/operators';
import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from '../dialog.component';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-incentive-master-add',
  templateUrl: './incentive-master-add.component.html',
  styleUrls: ['./incentive-master-add.component.scss']
})
export class IncentiveMasterAddComponent implements OnInit {
  loader:boolean=false;
  data:any={};
  login_user:any;
  login_id:any;
  constructor(public toastr:ToastrManager, public dialog:DialogComponent,public serve:PearlService) { 
    //BRANDWISE POINT ALLOCATION FOR MARKETING & WAREHOUSE			

    this.data.sales_point=70;
    this.data.warehouse_points=30;
    this.data.showroom_points=0;
    // MARKET SALES POINTS ALLOCATION					

    this.data.ho1_point=29;
    this.data.salesman_point=57;
    this.data.collection_points=14;
    
    // WAREHOUSE POINTS ALLOCATION						

    this.data.telephone_op_point=66;
    this.data.warehouse_keep_point=17;
    this.data.dispatch_point=8.5;
    this.data.labour_points=8.5;

    this.getIncentiveMasterData();
  }

  ngOnInit() {
    this.login_user = JSON.parse(sessionStorage.getItem('login'));

    this.login_id = parseInt(this.login_user['data']['id']);

  }

  addIncentiveMaster(){
    this.loader=true;
    this.data.login_id=this.login_id
    this.serve.fetchData({'data':this.data},'Discount/incentiveMasterAdd').pipe(
      retry(3)
    ).subscribe((res)=>{
      this.loader=false;
      if(res=='Success'){
        this.toastr.successToastr("Successfully Upated");
        this.getIncentiveMasterData();
      }else{
        this.toastr.errorToastr("Not Updated !");

      }
    },err=>{
      this.loader=false;

    })
    
  }

  getIncentiveMasterData(){
    this.loader=true;
    this.serve.fetchData({},'Discount/incentiveMasterList').subscribe((result)=>{
      this.loader=false;
      console.log(result);
      this.data=result;
    },err=>{
      this.loader=false;
    })

  }


  back(){
    window.history.go(-1);
  }

  calculatePointAllocation(){

    console.log(this.data.sales_point)
    console.log(this.data.warehouse_points);

    const cal1=Number(this.data.sales_point)+ Number(this.data.warehouse_points);
    console.log(cal1);

    if(cal1>100){
      this.data.sales_point=70;
      this.data.warehouse_points=30;
      this.dialog.error("Point Allocation for Sales And Warehouse Should Not be Greater Than 100%");
    }


  }

  calculateMarketSalesPointAllocation(){
    console.log(this.data.ho1_point)
    console.log(this.data.salesman_point);
    console.log(this.data.collection_points);
    console.log(this.data.collection_points);

    const cal2=Number(this.data.ho1_point)+ Number(this.data.salesman_point)+ Number(this.data.collection_points);
    console.log(cal2);

    if(cal2>100){
      this.data.ho1_point=29;
      this.data.salesman_point=57;
      this.data.collection_points=14;
      this.dialog.error("Point Allocation for MARKET SALES Should Not be Greater Than 100%");
    }

  }

  calculateWarehousePointAllocation(){
    console.log(this.data.telephone_op_point)
    console.log(this.data.warehouse_keep_point);
    console.log(this.data.dispatch_point);
    console.log(this.data.labour_points);

    const cal3=Number(this.data.telephone_op_point)+Number(this.data.warehouse_keep_point)+Number(this.data.dispatch_point)+Number(this.data.labour_points);
    console.log(cal3);

    if(cal3>100){
      this.data.telephone_op_point=66;
      this.data.warehouse_keep_point=17;
      this.data.dispatch_point=8.5;
      this.data.labour_points=8.5;
      this.dialog.error("Point Allocation for WAREHOUSE POINTS Should Not be Greater Than 100%");
    }
  }

}
