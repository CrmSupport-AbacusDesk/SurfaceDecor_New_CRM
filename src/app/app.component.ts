import { Component, HostListener, OnDestroy, Renderer2 } from '@angular/core';
import { PearlService } from './pearl.service';
import { AuthGuard } from './auth.guard';
import { LocalStorage } from './localstorage.service';
import { BnNgIdleService } from 'bn-ng-idle';
import{ Router} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'abacusdesk';
  login_data:any={};
  constructor(public serve:PearlService,public session:LocalStorage,public renderer:Renderer2,public route:Router ,private bnIdle: BnNgIdleService){
    
    console.log(this.serve.can_active);
    console.log("can");
    this.session.getSession()
    .subscribe(resp=>{
      console.log(resp);
      this.login_data = resp.data;
    });
  }


  ngOnDestroy(): void {
    
    

  }



  ngOnInit(){
    console.log("in INIT");
    this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {

      if(isTimedOut){
        console.log("session Expire");
        
        
      }

    })

    
    
    
    


    
    
    
    
    
    
    
    

    

   

  }

}
