import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../localstorage.service';
import { PearlService } from '../pearl.service';
import { Location } from '@angular/common'
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-enquiry-from-app-detail',
  templateUrl: './enquiry-from-app-detail.component.html',
  styleUrls: ['./enquiry-from-app-detail.component.scss']
})
export class EnquiryFromAppDetailComponent implements OnInit {

  enquiry_id: any = '';
  loader: any;
  enquiry_detail: any = {};
  enquiry_images:any=[];
  enquiry_items:any=[];

  constructor(public route: ActivatedRoute,public dialog: MatDialog, public location: Location , public serve: PearlService,public session:LocalStorage) {

    this.route.params.subscribe( params => {
      console.log(params);
      this.enquiry_id = params.id;
      console.log(this.enquiry_id);
      this.get_enquiry_data();

    });

  }

  ngOnInit() {
  }

  get_enquiry_data(){

    this.loader = 1;
    this.serve.fetchData({'id': this.enquiry_id}, 'Enquiry/enquiry_detail').subscribe((result => {
      console.log(result);
      this.enquiry_detail = result['enquiry_detail'];
      this.enquiry_images = result['enquiry_detail']['doc'];
      this.enquiry_items = result['enquiry_detail']['enquiry_items'];

      console.log("Enquiry Detail : ",this.enquiry_detail);

      console.log("Enquiry Images : ",this.enquiry_images);

      setTimeout (() => {
        this.loader = '';

      }, 700);
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



  back(): void {
    console.log("location back method calls");
    console.log(this.location);
    this.location.back()
  }
  downloadEnquiryNote(type:any){
    //  this.loader = 1;
    console.log(type);
    console.log(this.enquiry_id);

    this.serve.fetchData({'enquiry_id':this.enquiry_id,'pdf_type':type},'Cron/enquiry_pdf').subscribe((e)=>{
      console.log(e);
      if(e == 'success'){
        var url = this.serve.myurl+'api/uploads/'+this.enquiry_id+'.pdf';
        window.open(url);
        
      }
    })
  }

}
