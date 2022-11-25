import { Component, OnInit } from '@angular/core';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { retry } from 'rxjs/operators';
import { PearlService } from '../pearl.service';
import { PointMasterAddComponent } from '../point-master-add/point-master-add.component';

@Component({
  selector: 'app-point-master',
  templateUrl: './point-master.component.html',
  styleUrls: ['./point-master.component.scss']
})
export class PointMasterComponent implements OnInit {
  loader:boolean=false;
  data:any={};
  all_brands_list:any=[];
  item:any={};
  all_brands_list2:any=[];
  tempSearch:any='';
  search:any={};
  pointMasterList:any=[];
  skelton:any=new Array(10);
  data_not_found:boolean=false;
  constructor(public serve:PearlService,public popup_dialog: MatDialog) {
    this.get_pointMaster_list();
   }

  ngOnInit() {
  }

  back(){
    window.history.back();
  }

  

  get_pointMaster_list() {
    console.log("get_brand_list method calls");
    this.serve.fetchData({}, 'Brand_list/brand_list').subscribe((result) => {
      console.log(result);
      this.all_brands_list = result['brand_list'];
      this.all_brands_list2 = result['brand_list'];

    });

  }

  selectAll(action){
    if(action=='allCategory_id'){
      console.log(this.data.allCategory_id)
      if(this.data.allCategory_id==true){
        const brandData=[];
        for(let i=0;i<this.all_brands_list.length;i++){
          console.log(this.all_brands_list[i].id);
          brandData.push(this.all_brands_list[i].id);
        }
        this.data.category_id=brandData
      }else{
        this.data.category_id=[];
      }
      console.log(this.data.category_id);
    }
  }

 

addPointMaster(){
    const dialogRef=this.popup_dialog.open(PointMasterAddComponent,{
      panelClass:'rightmodal',
      data:{

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
      this.get_pointMaster_list();
  });

}


get_Point_Master_list(action:any=''){

  if(action=='refresh'){

  }

}

}
