import { Component, OnInit, ViewChild } from '@angular/core';
import { PearlService } from 'src/app/pearl.service';
import { DialogComponent } from 'src/app/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material';



@Component({
  selector: 'app-followup-add',
  templateUrl: './followup-add.component.html',
  styleUrls: ['./followup-add.component.scss']
})
export class FollowupAddComponent implements OnInit {

  formData=new FormData();
  data:any={};
  selectedFile: any = [];
  urls: any = [];
  loader:any;
  login_user : any;
  login_id : any;
  pop_id: any;
  all_brands_list:any=[];
  item:any={};
  selected_multiple_brands : any = [];
  today_date = new Date().toISOString().slice(0,10);
  lists: any;
 

  constructor(public serve:PearlService,public dialog:DialogComponent,public rout: Router,public route: ActivatedRoute) {
    console.log("add pop n gift calls");

    this.route.params.subscribe(params => {
      console.log(params);
      this.pop_id = params.id;
      console.log(this.pop_id);
      if(this.pop_id != '0'){
        console.log("in params if");
        this.edit_detail();
      }
      else{
        console.log("in params else");
      }
    });

    this.login_user = JSON.parse(sessionStorage.getItem('login'));

    this.login_id = parseInt(this.login_user['data']['id']);
    this.login_user = this.login_user['data']['name'];
    console.log(this.login_user);

    console.log(this.login_id);

    this.lists = new FormControl();

  }

  ngOnInit() {
    this.get_brand_list();
  }

  back() {
    window.history.go(-1);
  }

  // insertImage(event) {
  //   console.log(event);

  //   let files = event.target.files;
  //   console.log(files)
  //   if (files) {
  //     console.log("in if");
  //     for (let file of files) {
  //       console.log("in for");
  //       let reader = new FileReader();

  //       reader.onload = (e: any) => {
  //         console.log(e);

  //         this.urls.push(e.target.result);
  //         console.log(this.urls);
  //         console.log(e);

  //         // this.selectedFile.push(e.target.files)
  //         // for (var i = 0; i < this.urls.length; i++) {
  //         //   this.selectedFile = (this.urls[i]);
  //         // }
  //         // console.log(this.selectedFile);

  //       }
  //       reader.readAsDataURL(file);
  //     }
  //   }
  //   console.log(this.urls);

  //   for (var i = 0; i < event.target.files.length; i++) {
  //     this.selectedFile.push(event.target.files[i]);
  //   }
  //   console.log(this.selectedFile);

  // }

  insertImage(event) {
    console.log(event);

    let files = event.target.files;
    console.log(files);
    if (files) {
      for (let file of files) {
        let reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e);

          this.urls.push(e.target.result);
          console.log(e);

        }
        reader.readAsDataURL(file);
      }
    }
    console.log(this.urls);

    for (var i = 0; i < event.target.files.length; i++) {
      this.selectedFile.push(event.target.files[i]);
    }
    console.log(this.selectedFile);

  }
  delete_img(index: any) {
    this.urls.splice(index, 1)
    this.selectedFile=[];

  }

  submitPopNGift(){

    this.loader=1;
    console.log(this.data);
    console.log(this.selectedFile);
    console.log(this.login_id);
    console.log(this.login_user);


    if(this.pop_id == 0){
      console.log("in Pop Gift Add");
      if (this.selectedFile.length > 0) {
      this.serve.fetchData({'created_by': this.login_id,'created_by_name': this.login_user,'image': this.selectedFile,'gift_description': this.data.gift_description,'gift_name': this.data.gift_name,'gift_points': this.data.gift_points,'u_o_m': this.data.u_o_m,'brand':this.show},"Product/pop_master").subscribe((result=>{
        console.log(result);
        if(result['msg'] == 'Success')
        {
          let id = result['id'];
          for (var i = 0; i < this.selectedFile.length; i++) {
            this.formData.append("image" + i, this.selectedFile[i], this.selectedFile[i].name);
          }

          this.formData.append('id', id);

          if (this.selectedFile && this.selectedFile.length > 0) {
            this.loader = true;
            this.serve.upload_image(this.formData, "Product/insert_image").subscribe((resp) => {
              this.loader = false;
              console.log(resp);
              if (resp) {
                this.dialog.success("POP Gift", "Added");
                window.history.go(-1);
              }
            });
          }
          else {
            this.dialog.success("POP Gift", "Added");
            window.history.go(-1);
          }
          // this.dialog.success("POP Gift", "Added");
          // window.history.go(-1);
        }
        else{
          this.dialog.error("Something Went Wrong");
        }
      }))

      setTimeout (() => {
        this.loader='';
      }, 700);
    }
    else {
      this.dialog.error("Add Image also");
    }

    }

    else if(this.pop_id != 0){
      console.log("in Pop Gift Update");
      this.serve.fetchData({'id': this.pop_id,'created_by': this.login_id,'created_by_name': this.login_user,'image': this.selectedFile,'gift_description': this.data.gift_description,'gift_name': this.data.gift_name,'gift_points': this.data.gift_points,'u_o_m': this.data.u_o_m,'brand':this.data.brand},"Product/pop_master_edit").subscribe((result=>{
        console.log(result);
        if(result == 'Success')
        {
          this.dialog.success("POP Gift", "Update");
          window.history.go(-1);
        }
        else{
          this.dialog.error("Something Went Wrong");
        }
      }))

      setTimeout (() => {
        this.loader='';
      }, 700);
    }

    else{
      this.dialog.error("Something Went Wrong");
    }
  }

  edit_detail() {
    this.serve.fetchData({ "id": this.pop_id }, "Product/pop_master_detail").subscribe((result => {
      console.log(result);
      this.data = result;
      this.urls.push(result['image']);
      console.log(this.urls);
      this.selectedFile = (this.urls[0]);
      console.log(this.selectedFile);



    }))
  }

  get_brand_list() {
    console.log("get_brand_list method calls");
    this.serve.fetchData({}, 'Brand_list/brand_list').subscribe((result) => {
      console.log(result);
      this.all_brands_list = result['brand_list'];

    });

  }


  selected_brand_items_method() {
    console.log(this.lists);
    console.log(this.lists['value']);
    this.selected_multiple_brands = this.lists['value'];

    console.log("Selected Branding Item List ", this.selected_multiple_brands);

    this.data.brand = this.selected_multiple_brands;

  }

  checks:boolean=false;
  show: any=[];
  
  new_method_selected_brand_items_method(lead){
    console.log(lead);
    console.log(this.data.brand);
    console.log(this.checks);
    this.checks= !this.checks;
    console.log(this.checks);
    if(this.checks==true){
      console.log("if conditions 1");

      if(lead.brand_name=='Select All'){
      console.log("if conditions 2");

       for(let i=0;i<this.all_brands_list.length;i++){
        this.all_brands_list[i].checks=true;
          this.show.push(this.all_brands_list[i].id);
       }
       console.log(this.show);
       
      }
      console.log(lead.checks);
      this.show.push(lead.id);
      console.log(this.show);
      
    }else{
      console.log("else conditions 1");

      if(lead.brand_name=='Select All'){
        console.log("else conditions 2");
        
        for(let i=0;i<this.all_brands_list.length;i++){
         this.all_brands_list[i].checks=false;
          this.show=[];
          console.log(this.show);

        }
        console.log(this.show);
        
       }
       for(let j=this.show.length-1;j>=0;j--){
        
        if(lead.id==this.show[j]){
        console.log("else conditions 3");
        console.log("works properly",this.show.length - 1)
        this.show.splice(j, 1);
        }
       }
       console.log(this.show);
       
    }
    
  }
 

  selectAllorDeselectAll(event,lead){
    console.log(event.checked);
    console.log(lead);
      if(event.checked==true){
        if(lead.brand_name=='Select All'){
          console.log("if conditions 2");
    
           for(let i=0;i<this.all_brands_list.length;i++){
            this.all_brands_list[i].checks=true;
              this.show.push(this.all_brands_list[i].id);
           }
           console.log(this.show);
           
          }
          console.log(lead.checks);
          this.show.push(lead.id);
          console.log(this.show);
      }else{
        console.log("else conditions 1");
  
        if(lead.brand_name=='Select All'){
          console.log("else conditions 2");
          
          for(let i=0;i<this.all_brands_list.length;i++){
           this.all_brands_list[i].checks=false;
            this.show=[];
            console.log(this.show);
  
          }
          console.log(this.show);
          
         }
         for(let j=this.show.length-1;j>=0;j--){
          
          if(lead.id==this.show[j]){
          console.log("else conditions 3");
          console.log("works properly",this.show.length - 1)
          this.show.splice(j, 1);
          }
         }
         console.log(this.show);
         
      }

  }

  


}
