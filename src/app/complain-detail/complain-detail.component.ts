import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PearlService } from '../pearl.service';
import { MatDialog } from '@angular/material';
import { StatusModalComponent } from '../order/status-modal/status-modal.component';
@Component({
  selector: 'app-complain-detail',
  templateUrl: './complain-detail.component.html',
  styleUrls: ['./complain-detail.component.scss']
})
export class ComplainDetailComponent implements OnInit {
  loader:any;
  complain_id:any='';
  complain_detail:any=[];
  complain_notresolve_images:any =[];
  complain_resolve_images:any=[];
  complain_detail_video:any=[];
  active_tab:any = 'Image';
  active_tab_resolve:any = 'Image';

  currentPlayingVideo:HTMLVideoElement
  constructor(public location:Location,public route:ActivatedRoute, public serve: PearlService,public Dialog:MatDialog) {
    this.route.params.subscribe((params)=>{
      console.log(params);
      this.complain_id =params.id;
      console.log(this.complain_id);
      this.get_complain_detail_data();
    })
   }

  ngOnInit() {
  }
  get_complain_detail_data(){
    this.loader = 1;
    this.serve.fetchData({'id':this.complain_id},'Complaint_Controller/complaint_detail').subscribe((result)=>{
      console.log(result);
      this.complain_detail=result;
      console.log(this.complain_detail);
      this.complain_notresolve_images =result['not_resolved_image'];
      this.complain_resolve_images =result['doc'].image;
      this.complain_detail_video =result['doc'].video;
      console.log(this.complain_notresolve_images)

      setTimeout(() => {
        this.loader ='';
      }, 1000);
    })

  }
back(){
console.log("location method back call");
console.log(this.location);
this.location.back();
}
imageModel(image){
const dialogRef = this.Dialog.open(StatusModalComponent,{
  // width: '500px',
  panelClass:'image-modal',
    data:{
      image,
      from:"complain detail modal"
    }
  }
  )
  dialogRef.afterClosed().subscribe((result)=>{
    console.log(result);
    console.log("this dialog box is closed");
  })
}
  onPlayingVideo(event){
    console.log(event)
  event.preventDefault();
    if(this.currentPlayingVideo === undefined){
      this.currentPlayingVideo = event.target;
      this.currentPlayingVideo.play()
    }
    else if(event.target != this.currentPlayingVideo){
      this.currentPlayingVideo.pause();
      this.currentPlayingVideo = event.target;
      this.currentPlayingVideo.play();
    }
  }
}
