import { Component, OnInit } from '@angular/core';
import { PearlService } from 'src/app/pearl.service';
import { DialogComponent } from 'src/app/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormControl } from '@angular/forms';


@Component({
  selector: 'app-announcemne-add',
  templateUrl: './announcemne-add.component.html',
  styleUrls: ['./announcemne-add.component.scss']
})
export class AnnouncemneAddComponent implements OnInit {

  loader:any;
  data:any={};
  selectedFile: any = [];
  urls: any = [];
  login_user : any;
  login_id : any;
  formData=new FormData();
  tmp_selected_executive_list: any = new FormControl([]);
  selected_state_data: any = new FormControl();
  selected_sales_group: any = new FormControl();

  final_selected_executive_list:any=[];
  user_data:any=[]
  filter_user_data:any=''
  dr_states:any=[]
  dr_sales_group:any=[];
  select_all : boolean = false;

  // arr:any=[1,2,3,4,5];


  // ---------------------------------------


  constructor(public serve:PearlService,public dialog:DialogComponent,public rout: Router,public route: ActivatedRoute) {

    // let sum=0;

    // for(let i = 0 ;i<this.arr.length; i++){

    //   sum = sum+this.arr[i]

    // }


    // sum = this.arr.reduce((total,amount) => total+amount)

    // console.log('sum = '+sum);




  }

  ngOnInit() {

    this.login_user = JSON.parse(sessionStorage.getItem('login'));
    this.login_id = parseInt(this.login_user['data']['id']);

  }

  back() {
    window.history.go(-1);
  }

  get_users_data(filter_data:any=''){
    console.log("get_users_data method caLLS");
    console.log("filter_user_data = "+this.filter_user_data);
    console.log("filter_data = "+filter_data);
    console.log(this.selected_state_data);

    if(filter_data=='change')
    {
      console.log(filter_data);

      this.final_selected_executive_list=[];
      this.tmp_selected_executive_list.setValue([]);
      this.select_all = false;
    }

    this.serve.fetchData({'type':this.data.type,'filter':this.filter_user_data,'dr_state':this.selected_state_data['value'],'sales_group':this.selected_sales_group['value']}, "Announcement/user_and_dr_list").subscribe((result => {
      console.log(result);
      let array =[{'name':'All','id':0}]
      this.user_data = array.concat(result['user_and_dr_list'])
      if(this.final_selected_executive_list.length > 0)
      {
        this.tmp_selected_executive_list.setValue(this.final_selected_executive_list)
      }

    }))
  }

  select_executive_for_announcement(){
    console.log("select_executive_for_announcement method caLLS");
    console.log(this.tmp_selected_executive_list);
    console.log(this.tmp_selected_executive_list['value']);
    let data = this.tmp_selected_executive_list['value'].filter(row=>row.name=='All')
    console.log(data);

    if(data.length>0 || (this.tmp_selected_executive_list['value'].length ==  (this.user_data.length-1)))
    {
      this.temp()
    }
    else
    {
      this.final_selected_executive_list = this.tmp_selected_executive_list['value'];
    }
    console.log(this.final_selected_executive_list);
  }

  // select_executive_for_announcement(selected_data){
  //   console.log("select_executive_for_announcement method caLLS");
  //   console.log("selected_data = ");
  //   console.log(selected_data);

  //   let index:any = -1;

  //   if(this.final_selected_executive_list.length){
  //     console.log("in IF");
  //     index = this.final_selected_executive_list.findIndex(row => row.id == selected_data.id);
  //     console.log(this.final_selected_executive_list.findIndex(row => row.id == selected_data.id));
  //     index == -1 ? this.final_selected_executive_list.push(selected_data) : this.final_selected_executive_list.splice(index,1)
  //   }
  //   else{
  //     this.final_selected_executive_list.push(selected_data);
  //   }
  //   console.log(this.final_selected_executive_list);

  // }


  delete_img(index:any)
  {
    console.log(index);
    this.urls.splice(index,1)
  }

  insertImage(event) {

    console.log(event);
    console.log(this.selectedFile);
    let files = event.target.files;
    console.log(files)
    if (files) {
      console.log("in if");
      console.log(this.selectedFile);

      for (let file of files) {
        console.log("in for");
        let reader = new FileReader();
        console.log(this.selectedFile);

        reader.onload = (e: any) => {
          console.log(e);
          console.log(this.selectedFile);
          this.urls.push(e.target.result);
          console.log(this.urls);
          this.selectedFile = (this.urls);
          // for (var i = 0; i < this.urls.length; i++) {
          //   this.selectedFile.push(this.urls[i]);
          // }
          console.log(this.selectedFile);

        }
        reader.readAsDataURL(file);
      }
    }
    console.log(this.urls);

  }


  submit_announcement(){

    this.loader=1;
    console.log(this.data);
    console.log(this.selectedFile);
    console.log(this.login_id);
    console.log(this.login_user);
    console.log(this.final_selected_executive_list);



    this.serve.fetchData({'created_by': this.login_id,'image': this.selectedFile,'data': this.data,'selected_executive_array': this.final_selected_executive_list,'dr_state':this.selected_state_data['value']},"Announcement/add_announcement").subscribe((result=>{
      console.log(result);
      if(result['msg'] == 'Success')
      {
        this.dialog.success("Announcement", "Successfully Added");
        window.history.go(-1);
      }
      else{
        this.dialog.error(result['msg']);
      }
    }))

    setTimeout (() => {
      this.loader='';
    }, 700);



  }

  check_true_and_false(user_id){

    console.log(user_id);
    let index = -1;
    index = this.final_selected_executive_list.findIndex(row => row.id == user_id)

    return index >= 0 ? true : false


  }


  get_state(){
    console.log("get_state method calls");

    this.serve.fetchData({'type':this.data.type}, "Announcement/dr_state_list").subscribe((result => {
      console.log(result);
      this.dr_states = result['dr_state_list']
      this.dr_sales_group = result['sales_group_list']
      console.log(this.dr_sales_group);


    }))


  }



  //for testing purpose ,  do not delete.
  temp(){
    console.log("temp method calls");

    console.log(this.select_all)
    this.select_all= !this.select_all
    console.log(this.select_all)
    if(this.select_all ==false)
    {
      this.tmp_selected_executive_list.setValue( [] );
      this.final_selected_executive_list = []
    }
    else{

      this.tmp_selected_executive_list.setValue( this.user_data );
    this.final_selected_executive_list = this.tmp_selected_executive_list['value'];
    }

    // this.tmp_selected_executive_list['value'] = this.user_data

    // for(let index = 0 ; index<this.user_data.length; index++ ){

    // this.tmp_selected_executive_list.setValue( this.user_data );
    // this.final_selected_executive_list = this.tmp_selected_executive_list['value'];

    // }
    console.log(this.tmp_selected_executive_list);

  }


}
