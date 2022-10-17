import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from '../dialog.component';
import { LocalStorage } from '../localstorage.service';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-add-sub-dealer-modal',
  templateUrl: './add-sub-dealer-modal.component.html',
  styleUrls: ['./add-sub-dealer-modal.component.scss']
})
export class AddSubDealerModalComponent implements OnInit {
  loader:boolean=false;
  items:any={};
  selectedFile=[];
  selectedFile2=[];
  urls=new Array<string>();
  urls2=new Array<string>();
  login_user : any;
  login_id : any;
  dr_id:any='';
  constructor(@Inject(MAT_DIALOG_DATA)public data,public dialog:MatDialog,public serve:PearlService,public session: LocalStorage,public alert:DialogComponent,public toastCtrl:ToastrManager) {
  console.log(data);
    this.dr_id=data.dr_id;
  this.login_user = JSON.parse(sessionStorage.getItem('login'));

  this.login_id = parseInt(this.login_user['data']['id']);
  this.login_user = this.login_user['data']['name'];
  console.log(this.login_user);

  console.log(this.login_id);

   }

  ngOnInit() {
  }


  addSubDealers(){
      this.loader=true;
      this.serve.fetchData({'item':this.items,'image':this.selectedFile,'profile_image':this.selectedFile2, 'login_id':this.login_id,'dr_id':this.dr_id},'Distributors/sub_dealers').subscribe((res)=>{
        console.log(res);
          if(res['msg']=='Added Successfully'){
            this.toastCtrl.successToastr('Added Successfully');
            this.dialog.closeAll();
          }else{
            this.toastCtrl.errorToastr(res['msg']);

          }

        setTimeout(() => {
          this.loader=false;
        }, 2000);
      },err=>{
        this.loader=false;
      })

  }


  fileChange(event:any) {
      
    console.log(event.target.files);
    for (var i = 0; i < event.target.files.length; i++) {
      this.selectedFile.push(event.target.files[i]);
      
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
        console.log(this.urls);
        
        for (let index = 0; index < this.selectedFile.length; index++) {
          
          for (let urlIndex = 0; urlIndex < this.urls.length; urlIndex++) {
            
            if(index == urlIndex) {
              this.selectedFile[index]['path'] = this.urls[urlIndex];
            }
          }
        }
        
        console.log(this.selectedFile);
        
      }
      
      reader.readAsDataURL(event.target.files[i]);
      
    }
  }

  fileChange2(event:any) {
      
    console.log(event.target.files);
    for (var i = 0; i < event.target.files.length; i++) {
      this.selectedFile2.push(event.target.files[i]);
      
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls2.push(e.target.result);
        console.log(this.urls2);
        
        for (let index = 0; index < this.selectedFile2.length; index++) {
          
          for (let urlIndex = 0; urlIndex < this.urls2.length; urlIndex++) {
            
            if(index == urlIndex) {
              this.selectedFile2[index]['path'] = this.urls2[urlIndex];
            }
          }
        }
        
        console.log(this.selectedFile2);
        
      }
      
      reader.readAsDataURL(event.target.files[i]);
      
    }
  }

  remove_image(i:any)
  {
    console.log(i);
    this.urls.splice(i,1);
    this.selectedFile.splice(i,1);
  }

  remove_image2(i:any)
  {
    console.log(i);
    this.urls2.splice(i,1);
    this.selectedFile2.splice(i,1);
  }
}
