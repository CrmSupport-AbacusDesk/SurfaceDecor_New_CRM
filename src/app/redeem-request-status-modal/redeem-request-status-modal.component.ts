import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { retry } from 'rxjs/operators';
import { SessionStorage } from 'src/_services/SessionService';
import { DialogComponent } from '../dialog.component';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-redeem-request-status-modal',
  templateUrl: './redeem-request-status-modal.component.html',
  styleUrls: ['./redeem-request-status-modal.component.scss']
})
export class RedeemRequestStatusModalComponent implements OnInit {
  login_user: any;
  loader:boolean=false;
  login_id: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public serve: PearlService, public session: SessionStorage, public alert: DialogComponent, public toastCtrl: ToastrManager) {
    this.login_user = JSON.parse(sessionStorage.getItem('login'));

    this.login_id = parseInt(this.login_user['data']['id']);

    // this.get_brand_list();
    console.log(data);
    data.reedem_req_status=data.data1.reedem_req_status;
    data.login_id=this.login_id 
   }

  ngOnInit() {
  }
  updateRedeemRequeststatus(){
      this.loader=true;
      this.serve.fetchData({'data':this.data},'user/updateRedeemRequestStatus').subscribe((res)=>{
        this.loader=false;
        if(res['msg']='success'){
          this.toastCtrl.successToastr("Successfully",'Updated');
          this.dialog.closeAll();
        }
        else{
          this.toastCtrl.errorToastr("Something Went Wrong... Please Wait..");
        }
      },err=>{
        this.loader=false;

      })

  }

}
