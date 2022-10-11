import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog.component';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent implements OnInit {
  loader:any;
  data:any={};
  selectedFile: any = [];
  urls: any = [];
  login_user : any;
  login_id : any;
  announcementData:any ={}
  dr_states:any=[]
  dr_sales_group:any=[];

  constructor(public serve:PearlService,public dialog:DialogComponent,public rout: Router,public route: ActivatedRoute) 
  { 
    this.get_state();
  }

  ngOnInit() 
  {

  }

  get_state(){
    console.log("get_state method calls");

    this.serve.fetchData({'type':'distributor'}, "Announcement/dr_state_list").subscribe((result => {
      console.log(result);
      this.dr_states = result['dr_state_list']
      this.dr_sales_group = result['sales_group_list']
      console.log(this.dr_sales_group);


    }))


  }


  delete_img(index:any)
  {
    console.log(index);
    this.urls.splice(index,1)
  }

  insertImage(event) {

    let files = event.target.files;
    console.log(files)
    if (files) {
      for (let file of files) {
        console.log("in for");
        let reader = new FileReader();
        console.log(this.selectedFile);

        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.selectedFile = (this.urls);
        }
        reader.readAsDataURL(file);
      }
    }
  }

}
