import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LocalStorage } from 'src/app/localstorage.service';
import { PearlService } from 'src/app/pearl.service';

@Component({
  selector: 'app- ',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  skelton: any = new Array(10);
  loader: any ;
  data_not_found: any = false;
  active_tab:any = 'Pending';
  search:any={};
  expense_list: any = [];
  expense_sum_data: any = [];

  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;

  count_data:any={};

  constructor(public serve: PearlService,public session:LocalStorage,public route: Router) {

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'expense');
    console.log(index);

    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;

    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
    this.get_expense_list()
  }

  ngOnInit() {
  this.search = this.serve.expenseListSearch;
  }

  get_expense_list(action:any=''){
    console.log("get_expense_list method calls");

    if(action == "refresh"){
      this.search = {};
      this.expense_list = [];
    }

    this.loader=true;
    this.serve.fetchData({'search':this.search,'status':this.active_tab},"Expense/expense_list")
    .subscribe((result=>{
      console.log(result);
      this.expense_list = result['expense_list']
      this.expense_sum_data = result['expense_sum_data'];
      this.count_data = result['count_data'];
        this.serve.expenseListSearch ={};
      setTimeout (() => {
        this.loader=false;

      }, 700);
      if(this.expense_list.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
      }
    }))

  }

  con_date(date){

    this.search.expense_date = moment(date).format('YYYY-MM-DD');
    console.log(this.search.followup_date);
    this.get_expense_list(this.active_tab);

  }
  expenseDetail(id){
    console.log(` expense id : ${id}`);
    this.serve.expenseListSearch = this.search;
    this.route.navigate(['/expense-detail/'+id]);
  }

}
