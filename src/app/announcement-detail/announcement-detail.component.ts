import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PearlService } from 'src/app/pearl.service';
import { Location } from '@angular/common'
import { MatDialog } from '@angular/material';
import { StatusModalComponent } from 'src/app/order/status-modal/status-modal.component';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.scss']
})
export class AnnouncementDetailComponent implements OnInit {

  announcement_id: any = '0';
  loader: any ;
  announcement_data:any=[];
  announcement_images:any=[];

  constructor(public route: ActivatedRoute,public rout: Router,public serve: PearlService,public location: Location,public dialog: MatDialog) {
    this.route.params.subscribe( params => {
      console.log(params);
      this.announcement_id = params.id;
      console.log(this.announcement_id);
      this.get_announcement_data();

    });
  }

  ngOnInit() {
  }

  get_announcement_data(){
    console.log("get_announcement_data method calls");

    this.loader = true;

    this.serve.fetchData({'announcement_id': this.announcement_id}, 'Announcement/announcement_detail').subscribe((result => {
      console.log(result);
      this.announcement_data = result['announcemenDetail'];
      setTimeout (() => {
        this.loader = false;
        this.get_announcement_images();

      }, 700);
    }));


  }


  get_announcement_images(){
    console.log("get_announcement_images method calls");

    for(let index = 0;index < this.announcement_data.image_array.length ; index++){

      this.serve.fetchData({'images_id' : this.announcement_data.image_array[index]['images_id']},"Announcement/announcement_detail_images").subscribe((result=>{
        console.log(result);
        this.announcement_images.push(result['image']);
        setTimeout (() => {
          this.loader='';

        }, 700);
      }))

    }


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

  return_loading_image_length(){
    console.log("return_loading_image_length method calls");
    return this.announcement_data.image_array.length - this.announcement_images.length
  }


}
