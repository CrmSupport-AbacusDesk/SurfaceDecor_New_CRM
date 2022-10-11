import { Injectable, OnInit, Renderer2 } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PearlService } from './pearl.service';
import { DialogComponent } from './dialog.component';
import { SessionStorage } from 'src/_services/SessionService';


@Injectable({ providedIn: 'root' })
export class LocalStorage implements OnInit {
    loading = false;   
    alert:any;
    st_user: any = {};
    nexturl:any;
    constructor(private route: ActivatedRoute, private router: Router, public db: PearlService,public dialog:DialogComponent) {  
        
    }
    
    ngOnInit() {
        
        this.st_user.st_log = false;
        console.log(this.st_user);
    }
    
    getSession():  Observable<any> {
        
        this.st_user = JSON.parse(sessionStorage.getItem('st_user')) || [];
        return of(this.st_user);
    }
    
    
    LogOutSession()
    {  
        this.st_user = {};
        this.st_user.st_log = false;
        this.db.can_active = '';
        sessionStorage.removeItem('st_user');  
   
    }

    
    
        
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                
                
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
            
    
    
    
    
}
