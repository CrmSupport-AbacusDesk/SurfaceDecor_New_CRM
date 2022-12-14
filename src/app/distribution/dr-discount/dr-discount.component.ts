import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PearlService } from 'src/app/pearl.service';

@Component({
  selector: 'app-dr-discount',
  templateUrl: './dr-discount.component.html',
  styleUrls: ['./dr-discount.component.scss']
})
export class DrDiscountComponent implements OnInit {
  loader:any
  login:any={};


  constructor(@Inject(MAT_DIALOG_DATA)public data,public serve:PearlService) { 
  console.log(data);
  this.getDealerDiscounts()
  }

  ngOnInit() {
    this.login= JSON.parse(sessionStorage.getItem('login'));
    console.log(this.login.data.id);          
  }
  discountArray:any=[]
  getDealerDiscounts()
  {
    
    this.loader = true;
    console.log(this.data.dealerId);
    
    this.serve.fetchData({id:this.data.dealerId},"Distributors/getDealerDiscount")
    .subscribe((result)=>
    {
       console.log(result);
      this.discountArray = result['discount']
       this.loader = false;


    },err=>
    {
        this.loader = false;

    });
  }
  active:any={};

  edit_discount(i)
  {
      console.log(i);
      this.active[i] = Object.assign({'editDiscount':'1'});
      console.log(this.active[i]);
      
  }
  MobileNumber(event: any) 
  {
      console.log(event);
      
      const pattern = /[0-9\+\-\.\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if ( !pattern.test(inputChar)) 
      {event.preventDefault(); }
  }
  list:any={};
  update_discount(category,id,discount){
      console.log(category,id,discount)
      this.serve.fetchData({'id':this.data.dealerId,'category':category,'dis':discount,'updated_by':this.login.data.id},"Distributors/update_discount")
      .subscribe((response=>{
          console.log(response);
          this.active={};
          
          
      }));
  }
}
