import { Component, OnInit, Renderer2 } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { PearlService } from '../../pearl.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../../dialog.component';
import { ThrowStmt } from '@angular/compiler';
import { StatusModalComponent } from 'src/app/order/status-modal/status-modal.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  animations: [slideToTop()]
})
export class AddProductComponent implements OnInit {
  brand_list:any=[];
  category_list:any=[];
  subCategory_list:any=[];
  data:any={};
  cat_list:any=[];
  feature:any={};
  image:any=[];
  feature_cart=[];
  product_img:any={};
  image_cart:File[]=[];
  type;
  value:any=[];
  tmp_category:any=[];
  product_brand=[];
  selectedFile:any = [];
  Isvalid:any;
  color_list:any=[];
  brand:any=[];
  color:any=[];
  extra_field:any=[];
  extra_field_list:any=[];
  loader:any;
  login_user : any;
  login_id : any;
  formData=new FormData();
  active:any = {};
  status:boolean = false;
  category:any;
  feature_list:any=[];
  imageSrc: any={};
  urls=new Array<string>();
  i:any=0; 
  new_array=[];
  login:any={};
  
  
  
  selected_category_name :any=''
  
  
  
  constructor(private renderer: Renderer2,public serve:PearlService,public rout:Router,public dialog:DialogComponent,public secondary_dialog: MatDialog) {
    this.getCategoryList();
    this.selectedFile = [];
    this.urls = [];

    this.login_user = JSON.parse(sessionStorage.getItem('login'));
    this.login_id = parseInt(this.login_user['data']['id']);
  }
  
  
  ngOnInit() {
    this.login= JSON.parse(sessionStorage.getItem('login'));
    console.log(this.login.data.id);
  }
  
  getCategoryList()
  {
    this.serve.fetchData(0,"Product/product_category_list").subscribe((result)=>{
      console.log(result);
      this.category_list=result['category'];
      this.tmp_category=this.category_list;
    });
  }
  
  getSubCategoryList(){
    
    console.log(this.data);
    
    if(this.data.category == 'add_new_category'){
      
      console.log("if selected value is == add_new_category")
      this.go_to('add_new_category')
      
    }
    else{
      
      this.category=this.data.category;
      let value={"category":this.category};
      console.log(value);
      
      this.serve.fetchData(value,"Product/product_sub_category_list").subscribe((result)=>{
        console.log(result);
        this.subCategory_list=result['sub_category'];
      });
      
    }
    
    
  }
  
  insertImage(event) {
    
    console.log(event);
    this.selectedFile = []
    this.urls = []

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
          
        }
        reader.readAsDataURL(file);
      }
    }
    console.log(this.urls);
    
    
    
  }
  
  
  Insert_product(){
    console.log(this.data);
    this.data.created_by = this.login.data.id;
    this.loader = true;
    console.log(this.selectedFile);
    this.data.image_array = [];
    this.data.image_array = (this.selectedFile)
    
    this.serve.fetchData(this.data,"Product/add_product").subscribe((result)=>{
      // this.serve.fetchData(this.data,"api").subscribe((result)=>{
      
      this.loader = false;
      
      console.log(result);
      this.dialog.success("Product","Inserted");
      this.rout.navigate(['/product-list']);
      
      
      
    })
    
  }
  
  
  delete_img(index:any)
  {
    console.log(index);
    this.urls.splice(index,1)
  }
  
  check_product_code()
  {
    console.log(this.data);
    
    this.serve.fetchData({"cat_no":this.data.product_code},"Product/check_product_code").subscribe((result=>{
      
      console.log(result);
      
      this.loader = false;
      
      if(result['check_product_code']!='Valid')
      {
        this.dialog.error(result['check_product_code']);
      } else {
        
        this.Insert_product();
      }
      
    }))
  }
  
  back() {
    window.history.go(-1);
  }
  
  go_to(where : any = ''){
    
    console.log("go_to method calls");
    console.log("where = "+ where);
    console.log("selected_category_name = "+ this.selected_category_name);
    
    
    
    if(where == 'add_new_category'){
      
      const dialogRef = this.secondary_dialog.open(StatusModalComponent, {
        width: '600px', data: {
          'category' : this.data.category,
          'from' : 'add_product_page'
        }
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.data.category = null;
        this.getCategoryList();
      });
      
    }
    
    else if(where == 'add_new_subcategory'){
      
      const dialogRef = this.secondary_dialog.open(StatusModalComponent, {
        width: '600px', data: {
          'category_id' : this.data.category,
          'category' : this.selected_category_name,
          'sub_category' : this.data.sub_category,
          'from' : 'add_product_page'
        }
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.data.sub_category = null;
        this.getSubCategoryList();
      });
      
    }
    
  }
  
  
  
  
  
  
  
  
}
