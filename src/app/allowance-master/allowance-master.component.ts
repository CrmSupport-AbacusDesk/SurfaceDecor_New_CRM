import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { DialogComponent } from '../dialog.component';
import { LocalStorage } from '../localstorage.service';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-allowance-master',
  templateUrl: './allowance-master.component.html',
  styleUrls: ['./allowance-master.component.scss']
})
export class AllowanceMasterComponent implements OnInit {
  sales_user_list: any;
  loader:any
  allowanceData: any = [];
  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  
  constructor(public serve:PearlService,public dialog: DialogComponent,public session:LocalStorage) { 
    

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'allowance master');
    console.log(index);
    
    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
     
    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);

    this.get_sales_user();
    
  }
  
  ngOnInit() {
  }
  
  get_sales_user()
  {
    this.loader = 1;
    console.log("get_sales_user method calls");
    this.serve.fetchData(0,"Allowance/sales_type").subscribe((result=>{
      console.log(result);
      this.sales_user_list=result['sales'];
      console.log(this.sales_user_list);
    }))
    
    this.get_allowance_data();
  }
  
  get_allowance_data(){
    console.log("get_allowance_data method calls");
    this.serve.fetchData({},"Allowance/getAllowanceData").subscribe((result=>{
      console.log(result);
      console.log(result);
      this.allowanceData = result['allowance'];
      console.log(this.allowanceData);  
      this.loader = '';
      
      for(var i=0; i<this.sales_user_list.length; i++)
      {
        const index = this.allowanceData.findIndex(row => ((row.user_id).toString()) == this.sales_user_list[i].user_id);
        if(index != -1){
          console.log(this.sales_user_list[i]['user_id'] , this.allowanceData[index]['user_id']);
          this.sales_user_list[i]['id'] = this.allowanceData[index]['id'];
          this.sales_user_list[i]['flight'] = this.allowanceData[index]['flight'];
          this.sales_user_list[i]['trainSleeperClass'] = this.allowanceData[index]['trainSC'];
          this.sales_user_list[i]['train3Tier'] = this.allowanceData[index]['train3Tier'];
          this.sales_user_list[i]['train2Tier'] = this.allowanceData[index]['train2Tier'];
          this.sales_user_list[i]['busAC'] = this.allowanceData[index]['busAC'];
          this.sales_user_list[i]['busNonAC'] = this.allowanceData[index]['busNonAC'];
          this.sales_user_list[i]['auto'] = this.allowanceData[index]['auto'];
          this.sales_user_list[i]['taxi'] = this.allowanceData[index]['taxi'];
          this.sales_user_list[i]['car'] = this.allowanceData[index]['car'];
          this.sales_user_list[i]['bike'] = this.allowanceData[index]['bike'];
          this.sales_user_list[i]['hotel'] = this.allowanceData[index]['hotel'];
          this.sales_user_list[i]['food'] = this.allowanceData[index]['food'];
        }
        else{
          console.log("in else");
          console.log(index);
        }
        
      }
      
      console.log(this.sales_user_list);
      
    }))
  }
  
  updateAllowance(){
    console.log("updateAllowance method calls");
    console.log(this.sales_user_list);
    
    this.serve.fetchData({'data':this.sales_user_list},"Allowance/update_allowance").subscribe((result=>{
      console.log(result);
      if(result ['allowance'] == 'success'){
        this.dialog.success("Allowance", "Update");
      }
      else{
        this.dialog.error("Something Went Wrong");
      }
      
    }))
    
  }
  
}
