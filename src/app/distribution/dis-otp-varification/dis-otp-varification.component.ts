import { Component, OnInit, Inject } from '@angular/core';
import { PearlService } from 'src/app/pearl.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog.component';

@Component({
  selector: 'app-dis-otp-varification',
  templateUrl: './dis-otp-varification.component.html',
  styleUrls: ['./dis-otp-varification.component.scss']
})
export class DisOtpVarificationComponent implements OnInit {
  
  constructor(public serve : PearlService, public rout:Router,@Inject(MAT_DIALOG_DATA)public data,public dialog:MatDialog ) { }
  
  ngOnInit() {
  }
  form:any={}
  convert()
  {
    this.form.submitted=true
    
    
    
    setTimeout(() => {
      if(!this.form.otp)
    {
      
      this.form.otpEntered=false
      return;
      
    }
    if(this.form.otp.length!=6)
    {
      

      this.form.maxlength=false
      return;
      
    }
    if(this.data.otp!=this.form.otp)
    {
      

      this.form.otpCheckIsCorrect=false
      return;
    }
    console.log(this.data);
    
    this.serve.fetchData({type:this.data.type,dr_id:this.data.id},"Category_master/dr_type_update").subscribe((result=>{
      console.log(result);
      this.dialog.closeAll();

      if(this.data.type == 1){
        this.rout.navigate(['/distribution-list']);
      }
      if(this.data.type==7){
        this.rout.navigate(['/direct-dealer']);
        
      }
      
    }))
    }, 200);
  }
}
