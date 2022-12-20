import { Component, OnInit } from '@angular/core';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { retry } from 'rxjs/operators';
import { DialogComponent } from '../dialog.component';
import { PearlService } from '../pearl.service';
import { PointMasterAddComponent } from '../point-master-add/point-master-add.component';

@Component({
  selector: 'app-point-master',
  templateUrl: './point-master.component.html',
  styleUrls: ['./point-master.component.scss']
})
export class PointMasterComponent implements OnInit {
  loader: boolean = false;
  data: any = {};
  all_brands_list: any = [];
  item: any = {};
  all_brands_list2: any = [];
  tempSearch: any = '';
  search: any = {};
  login_user: any;
  login_id: any;
  pointMasterList: any = [];
  skelton: any = new Array(10);
  data_not_found: boolean = false;

  constructor(public serve: PearlService, public popup_dialog: MatDialog, public dialog: DialogComponent, public toastr: ToastrManager) {
    this.search.active_tab = 'Brand_Wise'
    this.get_pointMaster_list();
  }

  ngOnInit() {
    this.login_user = JSON.parse(sessionStorage.getItem('login'));

    this.login_id = parseInt(this.login_user['data']['id']);
  }

  back() {
    window.history.back();
  }



  get_pointMaster_list(action: any = '') {
    console.log("get_brand_list method calls");
    if (action == 'refresh') {
      this.search = {};
      this.search.active_tab = 'Brand_Wise'

    }

    this.serve.fetchData({ 'search': this.search }, 'Announcement/brand_points_list').subscribe((result) => {
      console.log(result);
      this.pointMasterList = result['data'];


    });

  }

  selectAll(action) {
    if (action == 'allCategory_id') {
      console.log(this.data.allCategory_id)
      if (this.data.allCategory_id == true) {
        const brandData = [];
        for (let i = 0; i < this.all_brands_list.length; i++) {
          console.log(this.all_brands_list[i].id);
          brandData.push(this.all_brands_list[i].id);
        }
        this.data.category_id = brandData
      } else {
        this.data.category_id = [];
      }
      console.log(this.data.category_id);
    }
  }



  addPointMaster() {
    const dialogRef = this.popup_dialog.open(PointMasterAddComponent, {
      panelClass: 'rightmodal',
      data: {
        from: 'addPointMaster'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
      this.get_pointMaster_list();
    });

  }

  editView(value) {
    console.log(value);
    const dialogRef = this.popup_dialog.open(PointMasterAddComponent, {
      panelClass: 'rightmodal',
      data: {
        value,
        from: 'editPointMaster'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
      this.get_pointMaster_list();
    });
  }

  deleteBrand(id) {
    this.loader = true;
    this.data.points_id = id;
    this.data.login_id = this.login_id;
    this.dialog.confirm('You Want To Delete This ?').then((result) => {
      if (result) {
        this.serve.fetchData({ 'data': this.data }, 'Announcement/delete_brands_point').subscribe((res) => {
          console.log(res);
          this.loader = false;
          if (res['msg'] == 'Success') {
            this.get_pointMaster_list();
            this.toastr.successToastr("Successfully Deleted");
          } else {
            this.toastr.errorToastr("Something Wnet Wrong...");

          }
        }, err => {
          this.loader = false;
        })

      }
    })


  }


}
