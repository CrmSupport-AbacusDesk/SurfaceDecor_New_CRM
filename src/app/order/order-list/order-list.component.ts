import {Component, Inject, OnInit} from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { PearlService } from 'src/app/pearl.service';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { LocalStorage } from 'src/app/localstorage.service';
import * as moment from 'moment';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  animations: [slideToTop()]

})
export class OrderListComponent implements OnInit {
  view_tab: any = 'Pending';
  value: any ={};

  order_status: any= [];
  total_order_val={};
  total_count={};
  approved_count={};
  reject_count={};
  dispatch_count={};
  PDispatch_count={};
  total_pending_sum={};
  total_pending_count={};
  order_accepted_sum={};
  pdispatch_sum={};
  complete_dispatch_sum={};
  referred_back_sum={};
  pre_close_sum={};
  orderlist:any=[];
  start:any=0;
  count:any;
  total_page:any;
  pagenumber:any;
  cnt: any=0;
  page_limit: any = 50;
  loader: any ;
  tmp_list: any = [];
  tmp_orderlist: any = [];
  data: any = [];
  search_val: any = {};
  data_not_found: any = false;
  login_data: any = [];
  login_dr_id: any;
  skelton: any = {};
  type:any=[];
  today_date: any;
  plus2date: void;

  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  list_count: any = 0;
  tmpsearch:any={};
  tmpsearch1:any={};
  check_cnt =0
  check_tal=0;
  sum=0;

  constructor(   @Inject(DOCUMENT) private _document: Document ,public serve: PearlService, public route: Router, public dialog: DialogComponent, public session: LocalStorage)
  {

    
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'order to gravity');
    console.log(index);

    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;

    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);

    this.today_date = new Date();
    this.today_date = moment(this.today_date).format('YYYY-MM-DD')
    console.log(this.today_date);
    this.plus2date = this.incDate(this.today_date)
    console.log(this.plus2date);
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value.data;
    this.skelton = new Array(10);


    if (this.login_data.access_level != '1') {
      this.login_dr_id = this.login_data.id;
    }
  }

  ngOnInit() {
    console.log(this.serve.orderListSearch.view_tab);
    if(this.serve.orderListSearch.view_tab){
    this.view_tab = this.serve.orderListSearch.view_tab;
    }else{
      this.view_tab='Pending';
    }

    this.search_val = this.serve.orderListSearch;
    // this.search_val = this.serve.orderFilterPrimary;
    this.orderList();
    this.order_counter();

  }

     // aamir change 3 march 2022
     order_count:any={};
     order_counter(){
       console.log("order counter gets call");

       this.order_count = {};

       this.serve.fetchData({},'Order/order_count').subscribe(  res=>{
         console.log("res",res);
         this.order_count = res;
         console.log("order count",this.order_count);
       })
     }
   // aamir chnages end here 3 march  2022
  orderList(type : any = '')
  {

    if(type == 'refresh'){
      this.search_val = {}
    }
    this.loader=1;

    console.log(this.data.search);
    if ( Object.getOwnPropertyNames(this.search_val).length != 0)
    {
      this.page_limit = 50;
      this.orderlist = [];
      this.tmp_orderlist=[];
    }

    this.serve.fetchData({'start': this.start, 'search': this.search_val, 'pagelimit': this.page_limit,'order_status': this.view_tab, 'login_user': this.login_dr_id}, 'Order/order_list2')
    .subscribe((result => {



      this.tmp_orderlist=[];
      console.log(result);

      this.list_count=result['order_list']['list_count'];
      this.total_page = Math.ceil(this.list_count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;

      this.count = result['order_list']['data'];
      console.log(this.count);

      this.total_order_val=result['order_list']['data']['sum'];
      console.log(this.total_order_val);
      this.total_count=result['order_list']['data']['count'];
      console.log("total count",this.total_count);
      this.approved_count=result['order_list']['data']['approved_count'];
      this.PDispatch_count=result['order_list']['data']['PDispatch_count'];
      this.dispatch_count=result['order_list']['data']['dispatch_count'];
      this.reject_count=result['order_list']['data']['reject_count'];
      this.total_pending_count=result['order_list']['data']['pending_count'];


      this.total_pending_sum=result['order_list']['data']['pending_sum'];
      this.order_accepted_sum=result['order_list']['data']['approve_sum'];
      this.pdispatch_sum=result['order_list']['data']['PDispatch_sum'];
      this.complete_dispatch_sum=result['order_list']['data']['dispatch_sum'];
      this.referred_back_sum=result['order_list']['data']['rej_sum'];
      this.pre_close_sum=result['order_list']['data']['preclose_sum'];
      this.orderlist = result['order_list']['result'];

      console.log(this.tmp_orderlist);
      this.tmp_orderlist = this.tmp_orderlist.filter((el, i, a) => i === a.indexOf(el));
      this.orderlist = this.orderlist.filter((el, i, a) => i === a.indexOf(el));
      this.serve.orderListSearch ={};
      setTimeout (() => {
        this.loader='';

      }, 700);

      if(this.orderlist.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;

      }
    }))
  }

  refresh()
  {
    this.orderlist();

  }

  detailOrder(id)
  {
    this.serve.orderFilterPrimary = this.search_val ;
    this.route.navigate(['/order-detail/'+id]);
  }

  deleteOrder(id)
  {
    this.dialog.delete('Order Data !').then((result) => {
      if(result){
        console.log("order deleted");

        this.serve.fetchData({'order_id':id},"Order/order_delete").subscribe((result=>{
          console.log(result);
          if(result)
          {
            const orderIndex = this.orderlist.findIndex(row => row.id == id);
            this.orderlist.splice(orderIndex, 1);

            const tmpOrderIndex = this.tmp_orderlist.findIndex(row => row.id == id);
            this.tmp_orderlist.splice(tmpOrderIndex, 1);
          }
        }))
      }});
    }
   
    filter_order_data(status){
      console.log("in filter function");

      this.loader = 1;

      console.log(status);
      this.view_tab=status;
      console.log(this.view_tab);

      this.start = 0;
      this.orderlist =[];
      this.tmp_orderlist=[];
      this.serve.fetchData({'start': this.start, 'pagelimit':  this.page_limit, 'order_status': this.view_tab,  'login_user': this.login_dr_id}, 'Order/order_list2')
      .subscribe((result => {

        console.log(result);
        this.count = result['order_list']['data'];


        this.list_count=result['order_list']['list_count'];
        this.total_page = Math.ceil(this.list_count/this.page_limit);
        this.pagenumber = Math.ceil(this.start/this.page_limit)+1;

        this.total_count=result['order_list']['data']['count'];
        this.approved_count=result['order_list']['data']['approved_count'];
        this.PDispatch_count=result['order_list']['data']['PDispatch_count'];
        this.dispatch_count=result['order_list']['data']['dispatch_count'];
        this.reject_count=result['order_list']['data']['reject_count'];
      this.total_pending_count=result['order_list']['data']['pending_count'];




        this.tmp_orderlist = (result['order_list']['result']);
        this.orderlist = (result['order_list']['result']);

        console.log(this.tmp_orderlist);
        console.log(this.orderlist);



        setTimeout (() => {
          this.loader= '';

        }, 700);

        if(this.orderlist.length ==0){
          this.data_not_found=true;
        }else{
          this.data_not_found=false;

        }
      }));
      if(status!='all'){

        for(var i=0;i<this.tmp_orderlist.length; i++)
        {

          this.tmpsearch=this.tmp_orderlist[i]['order_status'];
          if(this.tmpsearch.includes(status))
          {


            this.orderlist.push(this.tmp_orderlist[i]);
          }
        }
        console.log(this.orderlist);
      }else if(status=='all'){
        this.orderlist=this.tmp_orderlist;
      }
    }

    getItemsList(index,search)
    {
      console.log(search);
      this.orderlist=[];
      for(var i=0;i<this.tmp_orderlist.length; i++)
      {
        search=search.toLowerCase();
        this.tmpsearch1=this.tmp_orderlist[i][index].toLowerCase();
        if(this.tmpsearch1.includes(search))
        {


          this.orderlist.push(this.tmp_orderlist[i]);
        }
      }
      console.log(this.orderlist);

    }

    allCount:any;
    selected_order:any ='';

    allOrderdata(){
      this.allCount = 0;

      if( !this.search_val.allStates ){
        for (let i = 0; i < this.orderlist.length; i++) {
          if(this.orderlist[i].selected_order = false)
          {
            this.allCount++;
          }
          console.log(this.allCount);
        }

      }else{
        for (let i = 0; i < this.orderlist.length; i++) {
          if(this.orderlist[i].selected_order = true)
          {
            this.allCount++;
          }
          console.log(this.allCount);
        }
      }
    }

    countSelected(){
      this.allCount = 0;
      for (let i = 0; i < this.orderlist.length; i++) {
        if( this.orderlist[i].selected_order )
        {
          this.allCount++;
        }
      }
    }



    deletecheckavailable() {
      this.dialog.delete('').then((result) => {
        if(result) {
          this.serve.fetchData({ 'check' : this.orderlist } , 'Order/primary_delete')
          .subscribe(result => {
            if(result)
            {
              this.orderList();
            }
          });
        }
      });
    }


    exp_loader:any=false;
    exp_data:any=[];
    excel_data:any=[];
    p: string | number;
    last: any;
    new_excel_data:any=[];
    newexp_loader:any=false;
    pending_val : any=[];
    name : string;
    itemvalue : any=[];
    pending_quantity : any=[];
    exportAsXLSX():void
    {
      this.exp_loader = true;

      this.serve.FileData({'search':this.search_val,'order_status': this.view_tab},"Order/primary_order_excel")
      .subscribe(resp=>{
        console.log(resp);
        this.exp_data = resp['primary_order_excel'].result;
        console.log(this.exp_data);

        for(let i=0;i<this.exp_data.length;i++)
        {

          let orderStatus = '';

          if (this.exp_data[i].order_status == 'Pending') {

            orderStatus = 'Pending';

          } else if (this.exp_data[i].order_status == 'Approved') {

            orderStatus = 'Order Accepted';


          } else if (this.exp_data[i].order_status == 'readyToDispatch') {

            orderStatus = 'Ready To Dispatch';

          }

          else if (this.exp_data[i].order_status == 'PDispatch') {

            orderStatus = 'Partially Dispatched';

          }

          else if (this.exp_data[i].order_status == 'Dispatch') {

            orderStatus = 'Dispatched';

          }
          else if (this.exp_data[i].order_status == 'Reject' || this.exp_data[i].order_status == 'Rejected') {

            orderStatus = 'Reffered Back';


          }
          else if (this.exp_data[i].order_status == 'Pre Close') {

            orderStatus = 'Pre Closed';

          }
          else{
            orderStatus = this.exp_data[i].order_status;
          }


          this.excel_data.push({
            'Date':this.exp_data[i].date_created,
            'Created By':this.exp_data[i].created_by_type == 'channel partner' ? this.exp_data[i].ord_created_by : this.exp_data[i].ord_user_created_by,
            'Order Id':this.exp_data[i].order_no,
            // 'Type': (this.exp_data[i].type == 7 ? 'Direct Dealer' : (this.exp_data[i].type == 1 ? 'Distributor' : '')),
            'Company Name':this.exp_data[i].company_name,
            'Total Item':this.exp_data[i].order_item,
            'Order Total Qty':this.exp_data[i].sum_item_order_qty,
            'Dispatch Qty':this.exp_data[i].sum_item_order_qty_dispatch ? this.exp_data[i].sum_item_order_qty_dispatch : 0,
            'Order Value':this.exp_data[i].order_grand_total,
            'Status': orderStatus,
            'Action By':orderStatus =='Hold'?this.exp_data[i].hold_by_name:this.exp_data[i].approved_by_name,
          });
        }


        this.exp_loader = false;
        this.serve.exportAsExcelFile(this.excel_data, 'Order');

        this.excel_data = [];
        this.exp_data = [];
      });
    }

    public onDate(event): void
    {

      this.search_val.date_created=moment(event.value).format('YYYY-MM-DD');


      this.orderList();
    }




    Order(refresh: string) {


      this.allOrderdata();
      this.search_val = {};
      this.tmp_orderlist = {};

      this.orderList();

    }

    conDate(date){
      return date = (moment(date).format('YYYY-MM-DD'))
    }

    incDate(date){
      date = (moment(date).local().toDate());
      date.setDate(date.getDate() + 3);
      date = (moment(date).format('YYYY-MM-DD'));
      return date;

    }
    public onDateBetween(event , date_type): void 
  {
      console.log("date type ",date_type);
      if(date_type == 'date_from'){
        this.search_val.date_from = moment(event.value).format('YYYY-MM-DD');  
        console.log("Date From " , this.search_val.date_from);
      }else if(date_type == 'date_to'){
        this.search_val.date_to = moment(event.value).format('YYYY-MM-DD');    
        console.log("Date To " , this.search_val.date_to);
      }
      
  }
  orderDetail(id){
    console.log(`order: ${id}`);
    this.serve.orderListSearch =this.search_val;
    this.serve.orderListSearch.view_tab =this.view_tab;
    this.route.navigate(['/order-detail/'+id]);
  }

  handleKEY(event){
    
  }

  }
