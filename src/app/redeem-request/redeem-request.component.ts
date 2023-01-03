import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { retry } from 'rxjs/operators';
import { DialogComponent } from '../dialog.component';
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
import { PearlService } from '../pearl.service';
import { RedeemRequestStatusModalComponent } from '../redeem-request-status-modal/redeem-request-status-modal.component';

@Component({
  selector: 'app-redeem-request',
  templateUrl: './redeem-request.component.html',
  styleUrls: ['./redeem-request.component.scss']
})
export class RedeemRequestComponent implements OnInit {
  userRedeemRequestlist: any = []
  skelton: any = new Array(10);
  loader: any = false;
  data_not_found: any = false;
  search_val: any = {};
  pagelimit: any = 50;
  constructor(public serve: PearlService, public dialog: MatDialog, public Dialog: DialogComponent, public toast: ToastrManager, public rout: Router) { }

  ngOnInit() {
    this.search_val.active_tab = 'All';
    this.getUserRedeemRequestList();
  }

  getUserRedeemRequestList() {
    this.loader = true;
    if (Object.getOwnPropertyNames(this.search_val).length != 0) {
      this.userRedeemRequestlist = [];
      this.data_not_found = false
    }
    this.serve.fetchData({ 'start': this.userRedeemRequestlist.length, 'pagelimit': this.pagelimit, 'search': this.search_val }, 'User/RedeemRequestList').subscribe((res) => {
      this.loader = false;
      this.userRedeemRequestlist = this.userRedeemRequestlist.concat(res['data']);
    }, err => {
      this.loader = false;
    })
  }


  refresh() {
    this.userRedeemRequestlist = [];
    this.search_val = {};
    this.search_val.active_tab = 'All';

    this.getUserRedeemRequestList();
  }

  exportAsXLSX() {

  }


  openDialog2(image) {
    const dialogRef = this.dialog.open(StatusModalComponent, {
      // width: '500px',
      panelClass: 'image-modal',
      data: {
        image,
      }
    }
    )
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      console.log("this dialog box is closed");
    })
  }

  openRedeemRequestStatusModal() {
    const dialogRef = this.dialog.open(RedeemRequestStatusModalComponent, {
      width: '400px',
      data: {
      }
    }
    )
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      console.log("this dialog box is closed");
    })
  }


  editUserGiftList(data) {
    console.log(data);
    this.rout.navigate(['/user-gift-Add', { 'gift_title': data.gift_title, 'id': data.id, 'points': data.points, 'image': data.image, 'gift_specification': data.gift_specification }]);
  }

  deleteUserGift(id) {
    this.Dialog.confirm("You Want To Delete This ?").then((result) => {
      if (result) {
        this.loader = true;
        this.serve.fetchData({ "data": { "id": id } }, 'User/userGiftDelete').pipe(retry(3)).subscribe((res) => {
          this.loader = false;
          if (res['msg'] == 'success') {
            this.toast.successToastr("Successfully Deleted");
            this.userRedeemRequestlist = [];
            this.getUserRedeemRequestList();
          } else {
            this.toast.errorToastr("Something Went Wrong... Please Wait..");
          }
        })
      }
    })
  }

  onDateChange(date_created) {
    this.search_val.date_created = moment(date_created).format("YYYY-MM-DD");
    this.getUserRedeemRequestList();
  }

}
