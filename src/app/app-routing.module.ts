import { NgModule } from '@angular/core';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { SaleUserListComponent } from './user/sale-user-list/sale-user-list.component';
import { SaleUserDetailComponent } from './user/sale-user-detail/sale-user-detail.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardLog } from './AuthGuardLog';





@NgModule({


  imports: [
  ],
})
export class AppRoutingModule { }
