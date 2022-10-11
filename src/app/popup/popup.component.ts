import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PearlService} from '../pearl.service';
import {DatabaseService} from '../../_services/DatabaseService';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';
import {LeadDetailComponent} from '../lead/lead-detail/lead-detail.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LocalStorage } from '../localstorage.service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  lead_detail: any = {};
  lead_detail1: any = {};
  distributor_list: any = [];
  all_distributor: any = [];
  private alert: any;
  sales_id: any;
  lead: any = {};
  
  lead_id: any;
  company_name: any;
  id: any;
  
  
  all_distributors: any;
  
  assignUserList: any = [];
  leaddata: any;
  row1: any;
  login_data: any = [];
  
  constructor(public route: ActivatedRoute , public session: LocalStorage,public serve: PearlService, public router: Router, public db: DatabaseService, @Inject(MAT_DIALOG_DATA) public data,
  private dialogRef: MatDialogRef<PopupComponent>, public toast:ToastrManager) {
    console.log(data);
    this.lead_detail1 = data;
    
    this.lead_detail.lead_id = data.lead_id , data.company_name;
    this.lead_detail1.company_name = data.company_name;
    
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value.data;
    console.log(this.login_data.id);
    
  }
  
  ngOnInit() {
    
    console.log(this.data);
    
    
    this.lead_detail = this.data;
    console.log(this.lead_detail);
    this.sales_id = this.route.snapshot.params.id;
    
    this.route.params.subscribe(params => {
      console.log(params);
      
    });
    
  }
  
  
  
  
  onSubmit() {
    alert('success');
  }
  
  
  
  submit_sales_invoice1() {
    
    console.log(this.lead_detail);
    
    
    
    if(this.lead_detail.lead_convert == 3) {
      
      const companyIndex = this.lead_detail.leaddata.findIndex(row => row.id == this.lead_detail.dr_id);
      this.lead_detail.company_name = this.lead_detail.leaddata[companyIndex].company_name;
      
    } else {
      
      this.lead_detail.company_name = '';
    }
    
    this.lead_detail.lead_converted_by = this.login_data.id;
    this.serve.fetchData(this.lead_detail , 'Distributors/confirm_lead').subscribe((result => {
      console.log(result);
      
      this.toast.successToastr("Lead Converted Successfully");
      
      this.dialogRef.close();
      
      
      if (this.lead_detail.lead_convert == 1) {
        this.router.navigate(['distribution-list']);
        
      } else if (this.lead_detail.lead_convert == 7) {
        this.router.navigate(['direct-dealer']);
        
        
      } else if (this.lead_detail.lead_convert == 3) {
        
        console.log(this.lead_detail1.company_name);
        this.router.navigate(['dealer']);
      }
      
      console.log(this.lead);
      
      
    }));
    
    
  }
  
  
  
  
  
  
  
  
  
}
