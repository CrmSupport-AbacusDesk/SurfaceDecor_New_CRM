import { Component, OnInit,Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatProgressBarModule} from '@angular/material'

import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog.component';
import { PearlService } from '../pearl.service';

@Component({
  selector: 'app-upload-file-model',
  templateUrl: './upload-file-model.component.html',
  styleUrls: ['./upload-file-model.component.scss']
})
export class UploadFileModelComponent implements OnInit {
  excel_name: any ='';
  file : any={};
  formData = new FormData();
  loader:any;
  come_from : any =''
  payment_flag = '';
  excel_data:any=[];
  download_sample_area_excel_data: any;
  excel_loader:any=false;
  
  sample_billing_excel_data:any = [
    {
      "Bill Date": "2021-04-05",
      "Bill Number": "1",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "3",
      "Total Bill Amount": "1000",
      "Material Code": "ABC123",
      "Material Description": "White Board",
      "Sale Qty": "4",
      "UOM": "pcs",
      "Item Amount": "400"
    },
    {
      "Bill Date": "2021-04-05",
      "Bill Number": "1",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "3",
      "Total Bill Amount": "1000",
      "Material Code": "ABC124",
      "Material Description": "Bat",
      "Sale Qty": "3",
      "UOM": "pcs",
      "Item Amount": "300"
    },
    {
      "Bill Date": "2021-04-05",
      "Bill Number": "1",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "3",
      "Total Bill Amount": "1000",
      "Material Code": "ABC125",
      "Material Description": "Ball",
      "Sale Qty": "3",
      "UOM": "pcs",
      "Item Amount": "300"
    },
    {
      "Bill Date": "2021-04-15",
      "Bill Number": "2",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "2",
      "Total Bill Amount": "1500",
      "Material Code": "ABC123",
      "Material Description": "White Board",
      "Sale Qty": "10",
      "UOM": "pcs",
      "Item Amount": "1000"
    },
    {
      "Bill Date": "2021-04-15",
      "Bill Number": "2",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "2",
      "Total Bill Amount": "1500",
      "Material Code": "ABC124",
      "Material Description": "Bat",
      "Sale Qty": "5",
      "UOM": "pcs",
      "Item Amount": "500"
    },
    {
      "Bill Date": "2021-05-01",
      "Bill Number": "3",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "3",
      "Total Bill Amount": "3000",
      "Material Code": "ABC125",
      "Material Description": "Ball",
      "Sale Qty": "10",
      "UOM": "pcs",
      "Item Amount": "1000"
    },
    {
      "Bill Date": "2021-05-01",
      "Bill Number": "3",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "3",
      "Total Bill Amount": "3000",
      "Material Code": "ABC123",
      "Material Description": "White Board",
      "Sale Qty": "10",
      "UOM": "pcs",
      "Item Amount": "1000"
    },
    {
      "Bill Date": "2021-05-01",
      "Bill Number": "3",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "3",
      "Total Bill Amount": "3000",
      "Material Code": "ABC124",
      "Material Description": "Bat",
      "Sale Qty": "10",
      "UOM": "pcs",
      "Item Amount": "1000"
    },
    {
      "Bill Date": "2021-05-25",
      "Bill Number": "4",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "5",
      "Total Bill Amount": "10000",
      "Material Code": "ABC125",
      "Material Description": "Ball",
      "Sale Qty": "10",
      "UOM": "pcs",
      "Item Amount": "1000"
    },
    {
      "Bill Date": "2021-05-25",
      "Bill Number": "4",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "5",
      "Total Bill Amount": "10000",
      "Material Code": "ABC123",
      "Material Description": "White Board",
      "Sale Qty": "20",
      "UOM": "pcs",
      "Item Amount": "2000"
    },
    {
      "Bill Date": "2021-05-25",
      "Bill Number": "4",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "5",
      "Total Bill Amount": "10000",
      "Material Code": "ABC124",
      "Material Description": "Bat",
      "Sale Qty": "10",
      "UOM": "pcs",
      "Item Amount": "1000"
    },
    {
      "Bill Date": "2021-05-25",
      "Bill Number": "4",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "5",
      "Total Bill Amount": "10000",
      "Material Code": "ABC126",
      "Material Description": "Bag",
      "Sale Qty": "15",
      "UOM": "pcs",
      "Item Amount": "3000"
    },
    {
      "Bill Date": "2021-05-25",
      "Bill Number": "4",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "5",
      "Total Bill Amount": "10000",
      "Material Code": "ABC127",
      "Material Description": "Torch",
      "Sale Qty": "15",
      "UOM": "pcs",
      "Item Amount": "3000"
    },
    {
      "Bill Date": "2021-06-01",
      "Bill Number": "5",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "2",
      "Total Bill Amount": "2600",
      "Material Code": "ABC124",
      "Material Description": "Bat",
      "Sale Qty": "12",
      "UOM": "pcs",
      "Item Amount": "1200"
    },
    {
      "Bill Date": "2021-06-01",
      "Bill Number": "5",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "2",
      "Total Bill Amount": "2600",
      "Material Code": "ABC125",
      "Material Description": "Ball",
      "Sale Qty": "14",
      "UOM": "pcs",
      "Item Amount": "1400"
    }
  ];
  
  sample_payment_excel_data:any = [
    {
      "Payment Date": "2021-04-11",
      "Customer Code": "3294",
      "Payment Id": "VOICE-123",
      "Bill Number": "",
      "Amount": "5000",
      
    },
    {
      "Payment Date": "2021-04-15",
      "Customer Code": "3294",
      "Payment Id": "VOICE-123",
      "Bill Number": "1",
      "Amount": "1000",
      
    },
    {
      "Payment Date": "2021-04-30",
      "Customer Code": "3294",
      "Payment Id": "VOICE-124",
      "Bill Number": "2",
      "Amount": "500",
      
    },
    {
      "Payment Date": "2021-05-01",
      "Customer Code": "3294",
      "Payment Id": "VOICE-125",
      "Bill Number": "2",
      "Amount": "1000",
      
    },
    {
      "Payment Date": "2021-05-20",
      "Customer Code": "3294",
      "Payment Id": "VOICE-126",
      "Bill Number": "3",
      "Amount": "1000",
      
    },
    {
      "Payment Date": "2021-05-25",
      "Customer Code": "3294",
      "Payment Id": "VOICE-127",
      "Bill Number": "3",
      "Amount": "1500",
      
    },
    {
      "Payment Date": "2021-06-01",
      "Customer Code": "3294",
      "Payment Id": "VOICE-129",
      "Bill Number": "4",
      "Amount": "3000",
      
    },
    {
      "Payment Date": "2021-06-04",
      "Customer Code": "3294",
      "Payment Id": "VOICE-130",
      "Bill Number": "4",
      "Amount": "5000",
      
    },
    {
      "Payment Date": "2021-06-15",
      "Customer Code": "3294",
      "Payment Id": "VOICE-131",
      "Bill Number": "4",
      "Amount": "2000",
      
    },
    {
      "Payment Date": "2021-06-25",
      "Customer Code": "3294",
      "Payment Id": "VOICE-132",
      "Bill Number": "5",
      "Amount": "1000",
      
    },
    {
      "Payment Date": "2021-06-28",
      "Customer Code": "3294",
      "Payment Id": "VOICE-133",
      "Bill Number": "5",
      "Amount": "1600",
      
    },
    {
      "Payment Date": "2021-07-01",
      "Customer Code": "3294",
      "Payment Id": "VOICE-134",
      "Bill Number": "6",
      "Amount": "1000",
      
    }
  ];
  
  
  constructor( @Inject(MAT_DIALOG_DATA)public data,public db:PearlService,public dialog: DialogComponent,public dialogRef: MatDialogRef<UploadFileModelComponent>) {
    
    console.log(data);
    this.come_from = data['from']
    
    
  }
  ngOnInit() {
  }
  onUploadChange(evt) 
  {
    this.file = evt.target.files[0];
    console.log(this.file);
    console.log(this.file.length);
    console.log(this.file['name']);
    this.excel_name = this.file['name'];
    console.log(this.excel_name);
    
  }
  upload_area_data_excel()
  {
    console.log(this.file);
    this.dialogRef.disableClose = true;
    
    this.formData.append('category', this.file, this.file.name);
    console.log(this.formData);
    console.log(this.file);
    console.log(this.file.name);
    
    this.loader=1;
    this.db.FileData(this.formData, 'Excel_import_data/import_excel')
    .subscribe(d => {  
      
      this.dialogRef.disableClose = false;
      this.formData = new FormData();
      if(d['msg'] == 'Data Imported successfully'){
        this.dialog.success("Excel Uploaded", " Successfully");
        this.dialogRef.close();
        setTimeout (() => {
          this.loader='';
        }, 700);
        return;
      } 
      else{
        setTimeout (() => {
          this.loader='';
        }, 700);
        this.dialog.error(d['msg']);
        return;
      }
      
    },err => {console.log(err);  this.formData = new FormData(); });
  }
  
  
  upload_billing_data_excel()
  {
    console.log('upload_billing_data_excel method calls');
    console.log(this.file);
    this.dialogRef.disableClose = true;
    
    this.formData.append('category', this.file, this.file.name);
    console.log(this.formData);
    console.log(this.file);
    console.log(this.file.name);
    
    this.loader=1;
    this.db.FileData(this.formData, 'Excel_import_data/import_tally_bill_data_by_excel')
    .subscribe(d => {  
      
      this.dialogRef.disableClose = false;
      this.formData = new FormData();
      if(d['msg'] == 'Data Imported successfully'){
        this.dialog.success("Excel Uploaded", " Successfully");
        this.dialogRef.close();
        setTimeout (() => {
          this.loader='';
        }, 700);
        
        
        return;
      } 
      else{
        this.dialog.error(d['msg']);
        setTimeout (() => {
          this.loader='';
        }, 700);
        return;
        
      }
      
    },err => {console.log(err);  this.formData = new FormData(); });
  }
  
  upload_payment_data_excel()
  {
    console.log('upload_payment_data_excel method calls');
    
    console.log(this.file);
    this.dialogRef.disableClose = true;
    
    this.formData.append('category', this.file, this.file.name);
    console.log(this.formData);
    console.log(this.file);
    console.log(this.file.name);
    
    this.loader=1;
    this.db.FileData(this.formData, 'Excel_import_data/tally_payment_receipt_by_excel')
    
    .subscribe(d => {  
      
      this.dialogRef.disableClose = false;
      this.formData = new FormData();
      if(d['msg'] == 'Data Imported successfully'){
        this.dialog.success("Excel Uploaded", " Successfully");
        this.dialogRef.close();
        setTimeout (() => {
          this.loader='';
        }, 700);
        
        
        return;
      } 
      else{
        this.dialog.error(d['msg']);
        setTimeout (() => {
          this.loader='';
        }, 700);
        return;
        
      }
      
    },err => {console.log(err);  this.formData = new FormData(); });
  }
  
  download_sample_excel(type):void {
    
    console.log("download_sample_excel method calls");
    console.log("type = "+ type);
    
    this.excel_data = [];
    if(type == 'Billing'){
      for(let i=0;i<this.sample_billing_excel_data.length;i++){
        
        
        
        let keys_value : any = [];
        keys_value = Object.keys(this.sample_billing_excel_data[i])
        
        let excel_object: any = {}
        
        for(let secondary_index=0;secondary_index<keys_value.length;secondary_index++){
          excel_object[keys_value[secondary_index]]=this.sample_billing_excel_data[i][keys_value[secondary_index]]        
        }
        
        this.excel_data.push(excel_object)
        
      }
    }
    
    else if(type == 'Payment'){
      for(let i=0;i<this.sample_payment_excel_data.length;i++){
        
        
        
        let keys_value : any = [];
        keys_value = Object.keys(this.sample_payment_excel_data[i])
        
        let excel_object: any = {}
        
        for(let secondary_index=0;secondary_index<keys_value.length;secondary_index++){
          excel_object[keys_value[secondary_index]]=this.sample_payment_excel_data[i][keys_value[secondary_index]]        
        }
        
        this.excel_data.push(excel_object)
        
      }
    }
    
    else if(type == 'Area Target'){
      
      this.excel_loader = true;
      this.db.fetchData({},"User/dr_area_target_download_sample_excel").subscribe((result=>{
        console.log(result);
        this.download_sample_area_excel_data = result;
        
        for(let i=0;i<this.download_sample_area_excel_data.length;i++){
          
          let keys_value : any = [];
          keys_value = Object.keys(this.download_sample_area_excel_data[i])
          
          let excel_object: any = {}
          
          for(let secondary_index=0;secondary_index<keys_value.length;secondary_index++){
            excel_object[keys_value[secondary_index]]=this.download_sample_area_excel_data[i][keys_value[secondary_index]]        
          }
          this.excel_data.push(excel_object)
        }
        
        console.log(this.excel_data);
        this.db.exportAsExcelFile(this.excel_data, 'SAMPLE '+type+' EXCEL');
        
        setTimeout (() => {
          this.excel_loader = false;        
        }, 700);
      }))
      
    }
    
    else{
      console.log("in else");
    }
    
    if(type != 'Area Target'){
      console.log(this.excel_data);
      this.db.exportAsExcelFile(this.excel_data, 'SAMPLE '+type+' EXCEL');
    }
  }
  
}
