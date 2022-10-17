import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { DialogComponent } from '../dialog.component';
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-subdealer-list',
  templateUrl: './subdealer-list.component.html',
  styleUrls: ['./subdealer-list.component.scss']
})
export class SubdealerListComponent implements OnInit {

  dr_count: any;
  total_page: any = 0;
  pagenumber: any = 0;
  page_limit: any = 50;
  start: any = 0;
  count: any;
  search_val: any = {};
  exp_loader: any = false;
  exp_data: any = [];
  excel_data: any = [];
  state_values: any = [];
  skelton: any = new Array(10);
  loader: boolean = false;
  data_not_found: boolean = false;
  distributor_list: any = [];
  pagination_count: any = 0;

  constructor(public serve: PearlService, public dialog: MatDialog) {
    this.dealerList();
  }

  ngOnInit() {
  }

  dealerList(action: any = '') {
    if (action == "refresh") {
      this.search_val = {};
      this.distributor_list = [];
      this.start = 0;

    }
    this.loader = true
    this.serve.fetchData({ 'start': this.start, 'pagelimit': this.page_limit, 'search': this.search_val }, 'Distributors/subDealerData').subscribe((res) => {
      console.log(res);
      this.distributor_list = res['subdealerdata'];
      this.pagination_count = (res['count']);
      this.total_page = Math.ceil(this.pagination_count / this.page_limit);
      this.pagenumber = Math.ceil(this.start / this.page_limit) + 1;

      this.dr_count = res['count'];

      if (this.distributor_list.length == 0) {
        this.data_not_found = true;
      } else {
        this.data_not_found = false;

      }
      setTimeout(() => {
        this.loader = false;
      }, 1000);
    }, err => {
      this.loader = false;

    })

  }
  openDialog2(image) {
    const dialogRef = this.dialog.open(StatusModalComponent, {
      // width: '500px',
      panelClass: 'image-modal',
      data: {
        image,
        from: "user target modal"
      }
    }
    )
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      console.log("this dialog box is closed");
    })
  }
  public onDate(event): void {
    this.search_val.date_created = moment(event.value).format('YYYY-MM-DD');
    this.dealerList();
  }

  exportAsXLSX(): void {
    this.exp_loader = true;
    this.loader = true;
    this.serve.FileData({ 'search': this.search_val, 'start': this.start, 'pagelimit': this.page_limit, }, "Distributors/subDealerData")
      .subscribe(resp => {
        console.log(resp);
        this.exp_data = resp['subdealerdata'];
        console.log(this.exp_data);
        for (let i = 0; i < this.exp_data.length; i++) {                      
          this.excel_data.push({
            'Created date': this.exp_data[i].date_created,
            'Company Name': this.exp_data[i].company_name,
            'Contact Person': this.exp_data[i].contact_person,
            'Mobile': this.exp_data[i].contact_1,

          });
        }
        this.exp_loader = false;
        this.loader = false;
        // this.serve.exportAsExcelFile(this.excel_data, 'CHANNEL PARTNER SHEET');
        this.serve.exportAsExcelFile(this.excel_data, 'Sub Dealer SHEET');
        this.excel_data = [];
        this.exp_data = [];

      })


  }
}
