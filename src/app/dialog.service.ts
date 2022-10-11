import { Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditAddressComponent } from './edit-address/edit-address.component';




@Injectable({
  providedIn: 'root'
})
export class DialogService {
  
  constructor(public dialog:MatDialog) { }
  
  openConfermDialog(){
    return this.dialog.open(ConfirmDialogComponent,{
      width:'390px',
      panelClass: 'confirm-dialog-container',
      disableClose:true
      
    })
  }
  editAddress()
  {
    this.dialog.open(EditAddressComponent,{
      
      panelClass: 'edit-address',
      disableClose:true
    })
  }
  
  
}

















































































