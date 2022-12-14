import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from '../dialog.component';
import { LocalStorage } from '../localstorage.service';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-billingdocument',
  templateUrl: './billingdocument.component.html',
  styleUrls: ['./billingdocument.component.scss']
})
export class BillingdocumentComponent implements OnInit {

  urls=new Array<string>();
  selectedFile=[];
  submit = false;
  loader:any;
  formData=new FormData();
  login_data: any = {};
  login_data5: any = {};
  constructor(@Inject(MAT_DIALOG_DATA)public data,public dialog:MatDialog,public serve:PearlService,public session: LocalStorage,public alert:DialogComponent) { 
  console.log(this.data);
  }
  ngOnInit() {
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value;
    this.login_data5 = this.login_data.data;
  }
  remove_image(i:any)
  {
    console.log(i);
    this.urls.splice(i,1);
    this.selectedFile.splice(i,1);
  }
  insertImage(data)
  {
    let files = data.target.files;
    if (files) 
    {
      for (let file of files) 
      {
        let reader = new FileReader();
        reader.onload = (e: any) => 
        {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
    
    for(var i=0; i<data.target.files.length; i++)
    {
      this.selectedFile.push(data.target.files[i]);
      console.log(this.selectedFile);
      
    }
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
  
    submitofficialdocument()
    {
          // let id=this.data.id;
          
          // for(var i=0; i<this.selectedFile.length; i++)
          // {
          //   this.formData.append("image"+i,this.selectedFile[i],this.selectedFile[i].name);
          // }
          

          // this.formData.append('title',this.data.title);
          // this.formData.append('login_id',this.login_data5.id);
          // this.formData.append('Billing_id',this.data);

          //   console.log(this.data);

          
          if(this.selectedFile && this.selectedFile.length > 0)
          {
            this.loader = true;
            this.serve.fetchData({'image' : this.selectedFile , 'id' : this.data.id , 'created_by' : this.login_data5.id,'title':this.data.title},"Tally_invoice_credit/addDeliveryNote").subscribe((resp)=>
            {
              this.loader = false;
              console.log(resp);
              if(resp){
                 this.alert.success("","Inserted");

                  this.dialog.closeAll();
  
              }
             
            });
          } 
         
        
      }  
  
}