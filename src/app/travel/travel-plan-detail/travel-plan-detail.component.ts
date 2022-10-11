import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PearlService } from 'src/app/pearl.service';
import { Location } from '@angular/common'
import { MatDialog } from '@angular/material';
import { StatusModalComponent } from 'src/app/order/status-modal/status-modal.component';


@Component({
  selector: 'app-travel-plan-detail',
  templateUrl: './travel-plan-detail.component.html',
  styleUrls: ['./travel-plan-detail.component.scss']
})
export class TravelPlanDetailComponent implements OnInit {
  travel_id: any = '0';
  loader: any = '';
  travel_plan_data: any = {
    reason : '',
  };
  
  constructor(public route: ActivatedRoute,public rout: Router,public serve: PearlService,public location: Location,public dialog: MatDialog) {
    
    this.route.params.subscribe( params => {
      console.log(params);
      this.travel_id = params.id;
      console.log(this.travel_id);
      this.get_travel_plan_data();
      
    });
    
  }
  
  ngOnInit() {
  }
  
  get_travel_plan_data(){
    console.log("get_travel_plan_data method calls");
    this.loader = 1;
    
    this.serve.fetchData({'travel_id': this.travel_id}, 'Travel/travel_detail').subscribe((result => {
      console.log(result);
      this.travel_plan_data = result['travel_detail'];
      setTimeout (() => {
        this.loader = '';
        
      }, 700);
    }));
    
  }
  
  back(): void {
    console.log("location back method calls");
    console.log(this.location);
    this.location.back()
  }
  
  change_travel_plan_status(){
    const dialogRef = this.dialog.open(StatusModalComponent, {
      width: '400px', data: {
        'travel_id' : this.travel_id,
        'from' : 'travel_plan_detail_page'
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.get_travel_plan_data();
    });
  }

  goTo(where,date,company_name,executive_name){

    console.log(where);
    console.log(date);
    console.log(company_name);
    console.log(executive_name);


    if(where == 'checkin_list'){
      this.rout.navigate(['/checkin', { 'selectedUser': executive_name,'selectedDate': date,'selected_company_name': company_name }]);
    }

  }
  
  
}
