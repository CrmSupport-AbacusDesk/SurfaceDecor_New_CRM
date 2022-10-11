import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { PearlService } from 'src/app/pearl.service';
import {MatDialog} from '@angular/material';
import { UserEmailModalComponent } from 'src/app/user/user-email-modal/user-email-modal.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogService } from 'src/app/dialog.service';
import { ProductQrCodeModelComponent } from '../product-qr-code-model/product-qr-code-model.component';
import { ChangeSchemeStatusModelComponent } from '../change-scheme-status-model/change-scheme-status-model.component';
import * as XLSX from 'xlsx';
import { ExportexcelService } from 'src/app/service/exportexcel.service';
import { StatusModalComponent } from 'src/app/order/status-modal/status-modal.component';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  animations: [slideToTop()]

})
export class ProductDetailComponent implements OnInit {

  productDetail:any=[];
  product_id;
  selectedFile=[];
  formData=new FormData();
  brandList:any=[];
  colorList:any=[];
  extraDetailList:any=[];
  checkBrand:any=[];
  checkcolor:any=[];
  checkDetail:any=[];
  product_state_price:any=[];
  scheme_tab_active = 'coupons';
  data:any={}

  coupon_data:any=[];
  qrCode_data:any=[];
  total_page:any='';
  count:any;
  page_limit:any=50;
  pagenumber:any='';
  start:any=0;

  active:any = {};

  loader:any;
  category="product";
  urls=new Array<string>();

  product_images:any=[];
  login_user : any;
  login_id : any;


  @ViewChild('table') table: ElementRef;

  constructor(public alert:DialogComponent, public serve:PearlService,public editdialog:DialogService,public dialog: MatDialog,public route:ActivatedRoute,public rout:Router,public toast:ToastrManager, public excelservice : ExportexcelService, public dialog1:DialogComponent) {
    this.route.params.subscribe( params => {
      console.log(params);
      this.product_id = params.id;
      console.log(this.product_id);
    });
    this.detailProduct();
  }
  ngOnInit() {

    this.login_user = JSON.parse(sessionStorage.getItem('login'));
    this.login_id = parseInt(this.login_user['data']['id']);
  }

  toggleterritory(key,action)
  {
    console.log(action);
    console.log(key);

    if(action == 'open')
    { this.active[key] = true; }
    if(action == 'close')
    { this.active[key] = false;}

    console.log(this.active);
  }

  detailProduct()
  {
    this.loader=1;
    let value={"id":this.product_id};
    console.log(this.product_id);
    this.serve.fetchData(value,"Product/product_detail").subscribe((result=>{
      console.log(result);
      this.productDetail=result['product_detail'][0];
      this.checkBrand=result['product_detail']['brand'];
      this.checkcolor=result['product_detail']['color'];
      this.checkDetail=result['product_detail']['extra_field'];
      this.product_state_price=result['product_detail']['region'];
      console.log(this.product_state_price);
      console.log(this.checkBrand,this.checkDetail,this.checkcolor);
      this.get_product_images();

      setTimeout (() => {
        this.loader='';

      }, 700);
    }))

  }

  get_product_images()
  {
    console.log("get_product_images method calls");

    for(let index = 0;index < this.productDetail.image_array.length ; index++){

      this.serve.fetchData({'product_image_id' : this.productDetail.image_array[index]['id']},"Product/product_detail_image").subscribe((result=>{
        console.log(result);
        this.product_images.push(result['product_image'])

        setTimeout (() => {
          this.loader='';

        }, 700);
      }))

    }


  }


  MobileNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  update_product_value(index,state_name:any,price){
    console.log(index);
    console.log(state_name);
    console.log(price);
    console.log(this.product_id);
    this.serve.fetchData({'state_name':state_name,'price':price,'product_id':this.product_id},"Product/update_region_price").subscribe((result)=>{
      console.log(result);
      if(result['msg']=='success'){
        this.toast.successToastr("sucess");

        this.data={};
      }else{
        this.toast.errorToastr("Something Went Wrong");
      }
    })
  }


  update_region_value(region_name,region_price){
    console.log(region_name);
    console.log(region_price);
    console.log(this.product_id);


    this.serve.fetchData({'region_price':region_price,'region_name':region_name,'product_id':this.product_id},"Product/update_region_value").subscribe((result=>{
      console.log(result);
      if(result['msg']=='success'){
        this.detailProduct();
        this.toast.successToastr("Region Price Updated !!");
      }else{
        this.toast.errorToastr("Something Went Wrong");
      }
    }))
  }


  openEditDialog(value,type){

    console.log("openEditDialog method calls");

    const dialogRef = this.dialog.open(UserEmailModalComponent, {
      width: '300px',
      data:{
        value,
        type,
        product_id : this.productDetail['id'],
        category:this.category
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
      this.detailProduct();
    });
  }
  insertImage(event){
    console.log(event);
    this.selectedFile = [];
    this.urls = [];
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
          for (var i = 0; i < this.urls.length; i++) {
            this.selectedFile.push(this.urls[i]);
          }
          console.log(this.selectedFile);
          this.Insert_Image();

        }
        reader.readAsDataURL(file);
      }

    }
    console.log(this.urls);
    console.log(this.selectedFile);


  }


  Insert_Image(){
    console.log(this.product_id);
    console.log(this.selectedFile);
    this.serve.upload_image({'image' : this.selectedFile , 'id' : this.product_id , 'created_by' : this.login_id },"CategoryProductMaster/update_product_image").subscribe((resp)=>{
      console.log(resp);
      if(resp)
      {
        this.alert.success("Product","Inserted");
        this.product_images = [];
        this.detailProduct();

      }
    });
  }

  deleteImage(id,index){


    console.log("id = "+id);
    console.log("index = "+index);


    this.alert.delete("Image").then((result)=>{
      if(result)
      {
        console.log("hello");
        console.log(id);
        let value={'id':id}
        this.serve.fetchData(value,"Product/delete_image").subscribe((result=>{

          console.log(result);
          this.product_images.splice(index,1);
            this.detailProduct();
          this.dialog1.success("Product","Inserted");

        }))
      }
    })


  }

  editCategoryDialog(type): void
  {
    const dialogRef = this.dialog.open(UserEmailModalComponent, {
      width: '450px',
      data:{
        type,
        data:this.productDetail
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
      this.detailProduct();

    });
  }


  go_to(where : any = ''){
    console.log("go_to method calls");
    if(where == 'generate_secondary_coupon_code'){
      this.rout.navigate(['/generate-secondary-packing-coupon/'],{ queryParams: { 'this.product_id' : this.product_id } });
    }
    else{
      console.log("In Else");
      console.log("where = "+where);
    }

  }

  openImage(image): void
    {
        const dialogRef=this.dialog.open(StatusModalComponent,{
            // width:'400px',
            data:{
              image: image,
              from:'product_image'
            }
        })
    }

}
