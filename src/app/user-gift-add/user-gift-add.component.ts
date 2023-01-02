import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { retry } from 'rxjs/operators';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-user-gift-add',
  templateUrl: './user-gift-add.component.html',
  styleUrls: ['./user-gift-add.component.scss']
})
export class UserGiftAddComponent implements OnInit {
  data: any = {};
  urls: any = [];
  login_user_data: any;
  loader: boolean = false;
  id: any = 0;
  constructor(public serve: PearlService, public toastCtrl:ToastrManager,public rout:Router,public route:ActivatedRoute) {
    
   }

  ngOnInit() {
    console.log(this.route);
    this.route.params.subscribe(data=>{
      console.log(data);
      // this.data=data.data;
      this.id=data.id;
      this.data.gift_specification=data.gift_specification;
      this.data.gift_title=data.gift_title;
      this.data.points=data.points;
      if(data.image){
        this.urls.push(data.image);

      }else{
        this.urls=[];
      }
    })
    this.login_user_data = JSON.parse(sessionStorage.getItem('st_user'))
    console.log(this.login_user_data);

  }


  delete_img(index: any) {
    console.log(index);
    this.urls.splice(index, 1)
  }

  insertImage(event) {

    console.log(event);
    let files = event.target.files;
    console.log(files)
    if (files) {
      console.log("in if");

      for (let file of files) {
        console.log("in for");
        let reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e);
          this.urls.push(e.target.result);
          console.log(this.urls);
          // for (var i = 0; i < this.urls.length; i++) {
          //   this.selectedFile.push(this.urls[i]);
          // }

        }
        reader.readAsDataURL(file);
      }
    }


    console.log(this.urls);

  }


  addNewUserGift() {
    this.data.image = this.urls[0];
    this.data.created_by = this.login_user_data.data.id
    this.data.id = this.id
    console.log(this.data);
    this.loader = true;
    this.serve.fetchData({ "data": this.data }, 'User/userGiftAdd').pipe(
      retry(4)
    ).subscribe((result) => {
      this.loader = false;
      console.log(result);
      if(result['msg']=='success'){
        this.rout.navigate(['/user-gift-list']);
        this.toastCtrl.successToastr("Successfully Addedd");
      }else{
        this.toastCtrl.errorToastr("Something Went Wrong... Please Try Again");
      }

    }, err => {
      this.loader = false;

    })




  }

}
