import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { retry } from 'rxjs/operators';
import { DialogComponent } from '../dialog.component';
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-user-gift-list',
  templateUrl: './user-gift-list.component.html',
  styleUrls: ['./user-gift-list.component.scss']
})
export class UserGiftListComponent implements OnInit {
  userGiftlist: any = []
  skelton: any = new Array(10);
  loader: any = false;
  data_not_found: any = false;
  search_val: any = {};
  pagelimit: any = 50;
  datauser: any = {};

  constructor(public serve: PearlService, public dialog: MatDialog, public Dialog: DialogComponent, public toast: ToastrManager, public rout: Router) { }

  ngOnInit() {
    this.datauser = JSON.parse(sessionStorage.getItem('st_user'));

    this.getUserGiftList();
  }

  getUserGiftList() {
    this.loader = true;
    if (Object.getOwnPropertyNames(this.search_val).length != 0) {
      this.userGiftlist = [];
      this.data_not_found = false
    }

    this.serve.fetchData({ 'start': this.userGiftlist.length, 'pagelimit': this.pagelimit, 'search': this.search_val }, 'User/userGiftList').subscribe((res) => {
      this.loader = false;
      this.userGiftlist = this.userGiftlist.concat(res['data']);
    }, err => {
      this.loader = false;
    })
  }


  refresh() {
    this.userGiftlist = [];
    this.search_val = {};
    this.getUserGiftList();
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
            this.userGiftlist = [];
            this.getUserGiftList();
          } else {
            this.toast.errorToastr("Something Went Wrong... Please Wait..");
          }
        })
      }
    })
  }

  onDateChange(date_created) {
    this.search_val.date_created = moment(date_created).format("YYYY-MM-DD");
    this.getUserGiftList();
  }

  userGiftStatus(index, id) {


    console.log(id);
    console.log(index);

    console.log(this.userGiftlist[index].status);
    if (this.userGiftlist[index].status == 'true') {
      // this.userlist[index].status=0;
      this.userGiftlist[index].status = 'false';
      console.log(this.userGiftlist[index].status);
    }
    else {
      // this.userlist[index].status=1;
      this.userGiftlist[index].status = 'true';
      console.log(this.userGiftlist[index].status);
    }

    let value = { "status": this.userGiftlist[index].status }
    this.Dialog.confirm('You Want To Change Status Of This User').then((res) => {
      if (res) {
        this.loader = true;
        this.serve.fetchData({ 'gift_id': id, 'data': value, 'last_updated_by': this.datauser['data']['id'], 'last_updated_by_name': this.datauser['data']['name'] }, "User/update_user_gift_status")
          .subscribe(resp => {
            console.log(resp);
            this.loader = false;
            if (resp['msg'] = 'success') {
              this.toast.successToastr('Status Updated Successfully');
              this.userGiftlist = [];
              this.getUserGiftList();
            }
            else {
              this.toast.errorToastr("Something Went Wrong")
            }
          },err=>{
            this.loader = false;

          })
      }
    })

  }

}
