import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
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
  pagelimit: any = 50;
  constructor(public serve: PearlService, public dialog: MatDialog, public Dialog: DialogComponent, public toast: ToastrManager, public rout: Router) { }

  ngOnInit() {
    this.getUserGiftList();
  }

  getUserGiftList() {
    this.loader = true;
    this.serve.fetchData({ 'start': this.userGiftlist.length, 'pagelimit': this.pagelimit }, 'User/userGiftList').subscribe((res) => {
      this.loader = false;
      this.userGiftlist = res['data'];
    }, err => {
      this.loader = false;
    })
  }


  refresh() {
    this.userGiftlist = [];
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
    this.rout.navigate(['/user-gift-Add',{   'gift_title':data.gift_title,'id':data.id,'points':data.points,'image':data.image,'gift_specification':data.gift_specification}]);
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

}
