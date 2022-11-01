import { Component, OnInit, Renderer2 } from '@angular/core';
import { PearlService } from '../pearl.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../dialog.component';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';


import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { LocalStorage } from '../localstorage.service';
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
import { UserTargetComponent } from '../user/user-target/user-target.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  count:any=[];
  orderdata:any=[];
  today_date:any;
  month:any=["January","February","March","April","May","June","July","August","September","October","November","December"];
  monthName:any;
  year:any;
  primary_today_count={};
  primary_today_sum={};
  primary_yesterday_count={};
  primary_yesterday_sum={};
  primary_daybeforeyesterday_sum={};
  primary_daybeforeyesterday_count={};
  secondry_today_count={};
  secondry_today_sum={};
  secondry_yesterday_count={};
  secondry_yesterday_sum={};
  secondry_daybeforeyesterday_sum={};
  secondry_daybeforeyesterday_count={};
  public barChartLabels: Label = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  login_data:any={};
  public barChartData: ChartDataSets[] = [];
  overall_target_vs_achievemnt_data: any;
  assign_area_detail_data: any;
  total_area_detail_data: any;
  user_attendence_summary:any=[]
  company_target:any=[]
  company_sales_target:any=[]
  loader:boolean=false;
  attendence_type:any='All';
  filter_days_type:any='Today';
  total_today_achievement_amount:any=0;
  total_today_achivement:any=0;
  today_remaining_achievement:any=0;
  total_month_sal_amt:any=0;
  total_month_qty:any=0;
  total_today_target:any=0;

  total_month_target:any=0;
  today_total_sales_amt:any=0;
  total_sales_today_target:any=0;
  total_month_achievement_amount:any=0;
  total_month_achivement:any=0;
  total_month_remaining_achievement:any=0;

  filter_wise_dashboard_order_data:any={};


  constructor(public route:ActivatedRoute,public serve:PearlService,public dialog2: MatDialog,public dialog: MatDialog ,private renderer: Renderer2,public session:LocalStorage) {
    this.count_data();
    this.order_dashboard();
    this.target_vs_achievemnt_data();
    this.absent_executive_data();
    this.order_data_method();
    this.companytarget_data()
    this.companysalestarget_data()
    this.today_date = moment(new Date()).format("MMMM Do YYYY");
    console.log(this.today_date);
    this.monthName=this.month[new Date().getMonth()];
    this.year=new Date().getFullYear();


  }

  ngOnInit() {
    this.session.getSession()
    .subscribe(resp=>{
      console.log(resp);
      this.login_data = resp.data;
      if(this.login_data.type == '1' && this.login_data.lead_type == 'Dr' )
      {
        this.renderer.addClass(document.body, 'chanel-patner');
      }
      else
      {
        this.renderer.removeClass(document.body, 'chanel-patner');
      }
    })

  }



  status:boolean = false;
  toggleDropdown() {
    this.status = !this.status;

    if(this.status) {
      this.renderer.addClass(event.target, 'active');
      this.renderer.removeClass(document.body, 'active');
    }
    else {
      this.renderer.removeClass(event.target, 'active');

    }
  }

  toggleHeader() {
    console.log(this.status);
    this.status = !this.status;
    if(!this.status) {
      this.renderer.addClass(document.body, 'nav-active');
    }
    else {
      this.renderer.removeClass(document.body, 'nav-active');
    }
  }
  targetmodal(id){
        
      console.log("targetModal method calls");
      
      const dialogRef = this.dialog2.open(UserTargetComponent, {
        width: '2000px',
        data: {
          id,'company_target':'company_target',
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
      
  }
  targetsalemodal(id){
        
      console.log("targetModal method calls");
      
      const dialogRef = this.dialog2.open(UserTargetComponent, {
        width: '1024px',
        data: {
          id,'company_target':'company_sale_target',
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
      
  }
  status1:boolean = false;
  toggleNav() {
    this.status1 = !this.status1;
    if(this.status1) {
      this.renderer.addClass(document.body, 'active');
    }
    else {
      this.renderer.removeClass(document.body, 'active');
    }
  }
  count_data(){
    console.log('test');
    this.loader = true;
    this.serve.fetchData({},"Distributors/count_data").subscribe((result=>{
      console.log(result);
      this.count=result;
      console.log(this.count);
      setTimeout(() => {
        this.loader=false;
      }, 1000);


      // this.primary_today_count=this.count['pri_today_count'];
      // this.primary_today_sum=this.count['pri_today_sum'];
      // this.primary_yesterday_count=this.count['pri_yesterday_count'];
      // this.primary_yesterday_sum=this.count['pri_yesterday_sum'];
      // this.primary_daybeforeyesterday_sum=this.count['pri_day_before_yesterday_sum'];
      // this.primary_daybeforeyesterday_count=this.count['pri_day_before_yesterday_count'];

      // this.secondry_today_count=this.count['sec_today_count'];
      // this.secondry_today_sum=this.count['sec_today_sum'];
      // this.secondry_yesterday_count=this.count['sec_yesterday_count'];
      // this.secondry_yesterday_sum=this.count['sec_yesterday_sum'];
      // this.secondry_daybeforeyesterday_sum=this.count['sec_day_before_yesterday_sum'];
      // this.secondry_daybeforeyesterday_count=this.count['sec_day_before_yesterday_count'];
    }))
  }
  tmp:any=[];
  user_list:any=[];
  user_filter(){
    console.log(this.count);
    for(let i=0;i<this.count['user_data'].length;i++){
      this.tmp=this.count.user_data[i]['user_type'];

      if(this.tmp.includes('MARKET') || this.tmp.includes('Market'))
      {
        this.user_list.push(this.count.user_data[i]);
      }
    }
  }
  order_data:any=[];
  order_dashboard(){
    this.loader=true;
    console.log('test');
    this.serve.fetchData({},"Order/dashboard_order").subscribe((result=>{
      console.log(result);
      this.orderdata=result;

      this.order_data.cat=this.orderdata.cat.slice(1,2,3,4,5,6,7,8,9);
      this.order_data.amount=this.orderdata.amount.slice(1,2,3,4,5,6,7,8,9);
      console.log(this.order_data);

      this.barChartLabels = this.orderdata.cat;
      this.barChartType = 'bar';
      this.barChartLegend = true;


      this.barChartData = [
        { data: this.orderdata.amount, label: 'Order Value' },

      ];
      setTimeout(() => {
          this.loader=false;
      }, 1000);
    }))
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  public barChartOptions: ChartOptions = {
    responsive: true,

    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };




  public randomize(): void {

    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40
    ];


    this.barChartData[0].data = data;
  }

  formatTime(time){
    var parts = time.split(':');
    var time_ = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
    return new Date(time_ || 'h:mm a');
  }


  target_vs_achievemnt_data(){
    console.log('target_vs_achievemnt_data method calls');
    this.loader = true;
    this.serve.fetchData({},"User/area_target_dashboard_data").subscribe((result=>{
      console.log(result);
      setTimeout(() => {
        this.loader=false;
      }, 1000);
      this.overall_target_vs_achievemnt_data = result['assign_all_dr_target_detail']
      this.assign_area_detail_data = result['assign_area_detail']
      this.total_area_detail_data = result['total_area_detail']

    }))
  }


  open_targt_vs_achievement_model(type : any = ''){
    console.log("open_targt_vs_achievement_model method calls");
    console.log(type);
    const dialogRef = this.dialog.open(StatusModalComponent, {
      width: '1050', data:{
        'data_type' : type,
        'from' : 'dashboard'
      },
      panelClass: "mat-dialog-height-transition"

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.target_vs_achievemnt_data();
    });


  }

  absent_executive_data(){
    console.log('absent_executive_data method calls');
    this.serve.fetchData({'attendence_type' : this.attendence_type},"Attendance/today_absent_user").subscribe((result=>{
      console.log(result);
      this.user_attendence_summary = result['user_attendence_summary']


    }))
  }
  companytarget_data(){
    console.log('absent_executive_data method calls');
    // 'type' : this.filter_days_type
    this.loader = true;
    this.serve.fetchData({},"User/dashboardCompanyTargetSumarry").subscribe((result=>{
      console.log(result);

      this.company_target=result['companyList'];
      this.today_remaining_achievement=result['today_remaining_achievement'];
      this.total_today_achievement_amount=result['total_today_achievement_amount'];
      this.total_today_achivement=result['total_today_achivement'];
      this.total_today_target=result['total_today_target'];

      this.total_month_target=result['total_month_target'];
      this.total_month_achievement_amount=result['total_month_achievement_amount'];
      this.total_month_achivement=result['total_month_achivement'];
      this.total_month_remaining_achievement=result['total_month_remaining_achievement'];
 setTimeout(() => {
        this.loader=false;
      }, 1000);

    }))
  }
  companysalestarget_data(){
    console.log('absent_executive_data method calls');
    // 'type' : this.filter_days_type
    this.loader = true;
    this.serve.fetchData({},"User/dashboardCompanySalesSumarry").subscribe((result=>{
      console.log(result);
      this.company_sales_target=result['companyList'];
      this.today_total_sales_amt=result['today_total_sal_amt'];
      this.total_sales_today_target=result['today_total_sal_qty'];
      this.total_month_qty=result['total_month_qty'];
      this.total_month_sal_amt=result['total_month_sal_amt'];

      setTimeout(() => {
        this.loader=false;
      }, 1000);
    }))
  }

  order_data_method(){
    this.loader = true;
    console.log('order_data_method method calls');
    this.serve.fetchData({'type' : this.filter_days_type},"Order/filter_wise_order_data_for_dashboard").subscribe((result=>{
      console.log(result);
      setTimeout(() => {
        this.loader=false;
      }, 1000);
      this.filter_wise_dashboard_order_data = result['dashboard_order_data']


    }))
  }

  openDialog(){
    const dialogRef = this.dialog.open(StatusModalComponent ,{
      width:'700px',
      data:{
        'from':'dashboard_outstanding_tab'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });

    }
    openDialog2(){
      const dialogRef = this.dialog.open(StatusModalComponent ,{
        width:'700px',
        data:{
          'from':'dashboard_dispatch_value_tab'
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
       
      });
  
    }
    
    openDialog3(){
      const dialogRef = this.dialog.open(StatusModalComponent ,{
        width:'700px',
        data:{
          'from':'dashboard_dispatch_quantity_tab'
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
       
      });
  
    }

    openDialog4(){
      const dialogRef = this.dialog.open(StatusModalComponent ,{
        width:'700px',
        data:{
          'from':'dashboard_overdue_tab'
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
       
      });
  
    }


}
