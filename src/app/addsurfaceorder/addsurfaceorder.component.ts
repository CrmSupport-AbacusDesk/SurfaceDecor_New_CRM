import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute,  Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogComponent } from '../dialog.component';
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-addsurfaceorder',
  templateUrl: './addsurfaceorder.component.html',
  styleUrls: ['./addsurfaceorder.component.scss']
})
export class AddsurfaceorderComponent implements OnInit {
product:any={}
data:any={}
sub_total:any=0;
dis_amt:any=0;
    gst_amount:any=0;
    net_total:any=0;
    spcl_dis_amt:any=0
    grand_total:any=0;
    special_discount:any=0;
    type:any='';
cart_array:any=[]
dealer:any=[]
dr_lead_list:any=[];
category_list:any=[];
categorylist:any=[];
PRODUCTlist:any=[];
PRODUCTlist2:any=[];
// product:any={}
image:any={};
show_price:any = false;
totalQty:any=0;
dr_list:any=[];
credit_data:any=[];
login:any
tmpsearch: string;
tmpsearch1: string;
tmpsearch2: string;
order_detail:any=[]
order_item:any=[]
search: any = {};
item:any={};
order_lock:any = false;
assignedBrandExist:any='';
loader:boolean=false;
  constructor(public dialog: MatDialog,public dialog1:DialogComponent , public route: ActivatedRoute,public serve: PearlService,public rout:Router,public toast:ToastrManager) { 
    console.log(this.route);
    console.log(this.route.queryParams['_value']);
    this.orderDetail(this.route.queryParams['_value'].id)

    this.dr_data('')
    this.login= JSON.parse(sessionStorage.getItem('login'));
    console.log(this.login.data.id);
    this.data.created_by=this.login.data.id
  }

  ngOnInit() {
  }
  dr_data(company_name){
    console.log("in filter function");


   
    this.serve.fetchData({'type':1,'dr_name':company_name}, 'Order/getDealerList')
    .subscribe((result => {

      console.log(result);
      this.dr_list = (result['dealerList']);
      this.dr_lead_list = (result['dealerList']);
        }));
   
  }
  orderDetail(id) {
    const id1 = {'order_id': id};

    this.serve.fetchData(id1, 'Order/order_detail').subscribe((result => {
        console.log(result);
      
        
        this.order_detail = result['order_detail'];
        this.data.dealer= this.order_detail.dr_id 
        this.data.order_remark= this.order_detail.order_remark 

        console.log('====================================');
        console.log(this.data.dealer);
        this.getcreditdetail(this.data.dealer)
        console.log('====================================');
        this.search.dr_type= this.order_detail.type
        this.order_item = result['order_detail']['order_item'];
        this.cart_array=this.order_item
        for (let index = 0; index < this.cart_array.length; index++) {
          this.totalQty += parseInt(this.cart_array[index].qty);
         
          this.cart_array[index].subtotal_discounted =(this.cart_array[index].sub_total);
          }
      this.sub_total= this.order_detail.sub_total
      this.dis_amt= this.order_detail.order_discount
      this.net_total= this.order_detail.order_total
      this.grand_total= this.order_detail.order_grand_total
      console.log(this.grand_total,'====================================');
      console.log(this.sub_total,'====================================');
      console.log(this.totalQty,'====================================');



        }));
}


  getcreditdetail(id){
    this.getitembrandwise()
    
    this.serve.fetchData({'dr_id':id,'filter':this.item}, 'Order/drCreditOutstandingOverdue')
    .subscribe((result => {

      console.log(result);
      this.credit_data = (result['dr_detail']);
      this.categorylist = (result['brand_list']);
      if(this.categorylist.length > 0){
        this.assignedBrandExist = 'Exist';
    }else{
        this.assignedBrandExist = 'Not Exist';
    }
      this.category_list = (result['brand_list']);

        }));
  }
  getitembrandwise(){
    this.serve.fetchData({'dr_id':this.data.dealer,'category':this.data.category,'search':this.data}, 'Order/productList')
    .subscribe((result => {

      console.log(result);
      this.PRODUCTlist = (result);
      this.PRODUCTlist2 = (result);

        }));
  }
  getitemdetail(){
    console.log('====================================');
    console.log(this.data);
    console.log('====================================');
    this.serve.fetchData({'dr_id':this.data.dealer,'product_id':this.data.cat_no,'panel_code':this.data.panel_code,'category':this.data.category}, 'Order/get_product_data')
    .subscribe((result => {
      this.product = result['prod_price'];
      console.log(this.data,'====================================');
      console.log(this.product['panel_code']);
      
//       console.log('====================================');
      this.data.category= this.product['brand']
      this.data.cat_no= this.product['id']
      this.data.panel_code=this.product['panel_code']
console.log(this.data.panel_code,'====================================');
// console.log('====================================');
      if(result['image']){

        this.image= result['image'].image;
console.log('====================================');
console.log(this.image);
console.log('====================================');


      }
        }));
  }
  imageModel(image){
    const dialogRef = this.dialog.open( StatusModalComponent, {
      // width: '500px',
      panelClass:'image-modal',
      data:{
        image,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');

    });
  }
  CHECKDECIMAL(event: any) {
    console.log('Decimal Restrit');

    const charCode = (event.which) ? event.which : event.keyCode;
    console.log(charCode);

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;

}
calculate_amt(type){

  console.log(type);

  console.log(typeof(this.data.qty));
  if(type == 'cartoon_qty'){
      this.product.qty= (this.product.cartoon_packing*this.product.cartoon_qty  )
      console.log(this.product.qty);
  }
  console.log(this.product);
  this.product.discount_amount = 0;
  this.product.subTotal = 0;
  this.product.discountedAmount = 0;
  console.log(this.product.qty);
 

  if(this.product.qty == null)
  {
      this.product.qty = 0;
  }


  this.product.subTotal = (this.product.price)*(this.product.qty);

  if(this.product.discount)
  {
      this.product.discount_amount = (this.product.price * this.product.discount)/100;
  }

  this.product.discountedAmount = parseFloat(this.product.price) - parseFloat(this.product.discount_amount)

  this.product.subtotal_discount = this.product.discount_amount * this.product.qty;

  this.product.subtotal_discounted = this.product.discountedAmount * this.product.qty;
  console.log(this.product.subtotal_discounted);

  this.product.subtotal_discounted  = this.product.subtotal_discounted.toFixed(2)



}
addToCart(qty){

  // if(this.check_qty() == false){
  // if(true){
  console.log("in add to cart if condition");
  console.log(this.product);
  console.log(this.cart_array);

  if(this.cart_array.length == 0)
  {

      this.cart_array.push(this.product);
  }
  else
  {

    console.log("hlooo",this.cart_array);

    const Index = this.cart_array.findIndex(row => row.id == this.product.id);
    console.log("hlo");


    if(Index!=-1){
    this.cart_array[Index].qty=parseInt(this.product.qty)+parseInt(this.cart_array[Index].qty)
    this.cart_array[Index].subtotal_discounted=parseFloat(this.product.subtotal_discounted)+parseFloat(this.cart_array[Index].subtotal_discounted)

    console.log(this.cart_array[Index].subtotal_discounted,'====================================');
    
    console.log(this.cart_array[Index].qty,'====================================');
    }
    else{
      console.log("hlooo2",this.cart_array);

         this.cart_array.push(this.product);
    }
    
  
   
  }
  console.log(this.data);
  
  this.data.category='';
  this.data.cat_no='';
  this.data.panel_code = '';
  // this.data.panel_code = {};
  this.show_price = false;
  console.log(qty);
  console.log(this.totalQty);


  this.cal_grand_total();

 

  // this.totalQty=(this.totalQty)+parseInt(qty);
  // console.log("total quantity"+ this.totalQty);

  




}

cal_grand_total()
{
  console.log('====================================');
  console.log(this.product);
  console.log(this.sub_total);
  console.log(this.dis_amt);
  console.log('====================================');
  this.totalQty = parseInt(this.totalQty) + parseInt(this.product.qty);
  
    this.sub_total = parseFloat(this.sub_total) + parseFloat(this.product.subTotal);
    this.dis_amt = parseFloat(this.dis_amt) + (parseFloat(this.product.subtotal_discount));
    this.net_total = parseFloat(this.net_total) + parseFloat(this.product.subtotal_discounted);
    console.log(this.special_discount);

    this.spcl_dis_amt = (this.net_total * this.special_discount)/100;
    console.log(this.spcl_dis_amt);

    if(this.type=='Discount')
    {
      
        this.grand_total = Math.round(this.net_total - this.spcl_dis_amt);
    }else
    {
        this.grand_total = Math.round(this.net_total + this.spcl_dis_amt);
    }
    console.log(this.sub_total);
    console.log(this.dis_amt);
    console.log(this.gst_amount);
    console.log(this.grand_total);

    console.log(this.net_total - this.spcl_dis_amt);
 this.product={};

}

  deleteorderitem(index){
    this.dialog1.confirm("You Want To Delete This Order Item ?").then((res)=>{
   this.deleteitemfromcart(index)
     })
  }
  deleteitemfromcart(index){
    this.totalQty = parseFloat(this.totalQty) -  parseFloat(this.cart_array[index].qty) ;
    
    this.sub_total = parseFloat(this.sub_total) -  parseFloat(this.cart_array[index].subTotal) ;

    this.dis_amt = parseFloat(this.dis_amt) -  parseFloat(this.cart_array[index].subtotal_discount) ;

    this.net_total = parseFloat(this.net_total) -  parseFloat(this.cart_array[index].subtotal_discounted) ;

    this.spcl_dis_amt = (this.net_total * this.special_discount)/100;

    if(this.type=='Discount')
    {
        this.grand_total = Math.round(this.net_total - this.spcl_dis_amt);
    }else
    {
        this.grand_total = Math.round(this.net_total + this.spcl_dis_amt);
    }

    this.cart_array.splice(index,1);

  }
  
  filter_item(product_name){
    console.log("filter_dr method calls");
    console.log(product_name);
    this.tmpsearch2='';
    this.categorylist = [];
    for (var i = 0; i < this.category_list.length; i++) {
      product_name = product_name.toLowerCase();
      this.tmpsearch1 = this.category_list[i]['category'].toLowerCase();
      if (this.tmpsearch2.includes(product_name)) {
        this.categorylist.push(this.category_list[i]);
      }
    }
  }
  submitDetail(){
    this.order_lock = true;

    if(this.grand_total < 1)
    {
        this.dialog1.error('Order Value should be greater than Zero');
        return
    }

    let index = this.cart_array.findIndex(row=>row.qty==0)
    if(index != -1)
    {
       this.dialog1.error('Product - '+this.cart_array[index].product_name+' has zero Qty')
        return;
    }
    else
    {
        if(this.grand_total > 20000000)
        {
            this.dialog1.error('Maximum order value is 2 Cr. !');
            return;
        }
      }

    this.loader=true;
    this.dialog1.confirm("You Want To Submit This Order ?").then((res)=>{
   this.data.dr_id=this.data.dealer
    var orderData = {'sub_total':this.sub_total,'dis_amt':this.dis_amt,'grand_total':this.grand_total,'net_total':this.net_total,'special_discount':this.special_discount,special_discount_amount:this.spcl_dis_amt}
    this.serve.fetchData({'cart_data':this.cart_array,'user_data':this.data,'orderData':orderData,}, 'Order/saveOrder')
    .subscribe((result => {
      if(result['msg']=='success'){
      this.toast.successToastr("Order Placed Successfully");
      this.rout.navigate(['/order-list']);
      }
      this.product = result['prod_price'];
      console.log(this.data,'====================================');
      console.log(this.product['panel_code']);

      setTimeout(() => {
        this.loader=false;
      }, 1000);
        }));

      })

			

  }

  filter_panel(panel_name){
    console.log(panel_name);
    this.tmpsearch2='';
    this.PRODUCTlist=[];
    for(let i=0;i<this.PRODUCTlist2.length;i++){
      panel_name=panel_name.toLowerCase();
      this.tmpsearch2=this.PRODUCTlist2[i]['panel_code'].toLowerCase();
      if(this.tmpsearch2.includes(panel_name)){
        this.PRODUCTlist.push(this.PRODUCTlist2[i]);
      }
    }

    
  }

  filter_brand(brand_name){
    console.log(brand_name);
    this.tmpsearch2='';
    this.categorylist=[];
    for(let i=0; i<this.category_list.length;i++){
      brand_name=brand_name.toLowerCase();
      this.tmpsearch2=this.category_list[i].category.toLowerCase();
      if(this.tmpsearch2.includes(brand_name)){
        this.categorylist.push(this.category_list[i]);

      }
    }

  }

}