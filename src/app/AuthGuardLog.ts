import { Injectable } from '@angular/core';
import { Router,RouterModule,Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorage }  from './localstorage.service';
import { PearlService } from './pearl.service';


@Injectable()
export class AuthGuardLog implements CanActivate {
  
   users:any = [];
   constructor(private router: Router,public ses: LocalStorage, public db: PearlService) { }

 

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            
            
            
            
            
            
            

            


      
      
      
      
      
      

      
      
      

      
      
            return true;
      
      
}

}

