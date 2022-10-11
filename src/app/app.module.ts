import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { LocalStorage } from './localstorage.service';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MasterTabComponent } from './master-tab/master-tab/master-tab.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { MasterTabListComponent } from './master-tab-list/master-tab-list/master-tab-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { SaleUserListComponent } from './user/sale-user-list/sale-user-list.component';
import { SaleUserDetailComponent } from './user/sale-user-detail/sale-user-detail.component';
import { PearlService } from './pearl.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardLog } from './AuthGuardLog';
import { NgxPaginationModule} from 'ngx-pagination';
import { AuthComponentGuard } from './auth-component.guard';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { UserEmailModalComponent } from './user/user-email-modal/user-email-modal.component';
import { AddDiscountComponent } from './discount/add-discount/add-discount.component';
import { DiscountListComponent } from './discount/discount-list/discount-list.component';
import { SystemUserDetailComponent } from './user/system-user-detail/system-user-detail.component';
import { SystemUserListComponent } from './user/system-user-list/system-user-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import {MatDialogModule, MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS, MatListModule, MatCardModule} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { NgxEditorModule } from 'ngx-editor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DialogComponent } from './dialog.component';
import { MyNetworkComponent } from './user/my-network/my-network.component';
import { AddHolidayComponent } from './leave-and-holiday/add-holiday/add-holiday.component';
import { AddLeaveRulesComponent } from './leave-and-holiday/add-leave-rules/add-leave-rules.component';
import { HolidayListComponent } from './leave-and-holiday/holiday-list/holiday-list.component';
import { LeaveRuleListComponent } from './leave-and-holiday/leave-rule-list/leave-rule-list.component';
import { AddDistributionComponent } from './distribution/add-distribution/add-distribution.component';
import { DistributionDetailComponent } from './distribution/distribution-detail/distribution-detail.component';
import { DistributionListComponent } from './distribution/distribution-list/distribution-list.component';
import { DistributionOrderListComponent } from './distribution/distribution-order-list/distribution-order-list.component';
import { FollowupListComponent } from './followup/followup-list/followup-list.component';
import { AddLeadComponent } from './lead/add-lead/add-lead.component';
import { LeadListComponent } from './lead/lead-list/lead-list.component';
import { LeadDetailComponent } from './lead/lead-detail/lead-detail.component';
import { UserLeadListComponent } from './user/user-lead-list/user-lead-list.component';
import { EditleadComponent } from './editlead/editlead.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AddGiftComponent } from './pop_and_gift/add-gift/add-gift.component';
import { GiftListComponent } from './pop_and_gift/gift-list/gift-list.component';
import { TerritoryAddComponent } from './territory/territory-add/territory-add.component';
import { TerritoryListComponent } from './territory/territory-list/territory-list.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { DealerComponent } from './distribution/dealer/dealer.component';
import { DirectDealerComponent } from './distribution/direct-dealer/direct-dealer.component';
import { DistributionEditComponent } from './distribution/distribution-edit/distribution-edit.component';
import { CheckinComponent } from './checkin/checkin.component';
import { LiveTrackComponent } from './live-track/live-track.component';
import { DealerLeadListComponent } from './lead/dealer-lead-list/dealer-lead-list.component';
import { PlumberLeadListComponent } from './lead/plumber-lead-list/plumber-lead-list.component';
import { ConsumerLeadListComponent } from './lead/consumer-lead-list/consumer-lead-list.component';
import { StatusModalComponent } from './order/status-modal/status-modal.component';
import { SecondaryOrderListComponent } from './order/secondary-order-list/secondary-order-list.component';

import { ChartsModule } from 'ng2-charts';
import { CurrencywordsPipe } from './currencywords.pipe';
import { NumericWordsPipe } from './numeric-words.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PlumberDetailComponent } from './lead/plumber-detail/plumber-detail.component';
import { OfferAddComponent } from './offers/offer-add/offer-add.component';
import { OfferListComponent } from './offers/offer-list/offer-list.component';
import { OfferDetailComponent } from './offers/offer-detail/offer-detail.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DwrComponent } from './dwr/dwr.component';
import { UserTargetComponent } from './user/user-target/user-target.component';
import { LeavesComponent } from './user_leaves/leaves/leaves.component';
import { ChangeStatusComponent } from './user_leaves/change-status/change-status.component';
import { FollowupAddComponent } from './followup-add/followup-add.component';
import { AddPrimaryOrderValueComponent } from './distribution/add-primary-order-value/add-primary-order-value.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { TravelListComponent } from './travel/travel-list/travel-list.component';
import { PrimaryVsSecondaryComponent } from './primary-vs-secondary/primary-vs-secondary.component';
import { DistributionLegderModelComponent } from './distribution/distribution-legder-model/distribution-legder-model.component';
import { DistriutorSalesReportComponent } from './distriutor-sales-report/distriutor-sales-report.component';
import { ProductQrCodeModelComponent } from './product/product-qr-code-model/product-qr-code-model.component';
import { ChangeSchemeStatusModelComponent } from './product/change-scheme-status-model/change-scheme-status-model.component';
import { ExportexcelService } from './service/exportexcel.service';
import { PlumberEditModelComponent } from './lead/plumber-edit-model/plumber-edit-model.component';
import { MonthlyDwrComponent } from './monthly-dwr/monthly-dwr.component';
import { OrderEditModalComponent } from './order/order-edit-modal/order-edit-modal.component';
import { ProductWiseReportComponent } from './product-wise-report/product-wise-report.component';
import { DirectOrderComponent } from './order/direct-order/direct-order.component';
import { SchemeMasterComponent } from './scheme-master/scheme-master.component';
import { MyFilterPipe } from './shared/pipes/my-filter.pipe';
import { OrderDispatchComponent } from './order/order-dispatch/order-dispatch.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { UpdateAdminModelComponent } from './user/update-admin-model/update-admin-model.component';
import { DistributionComponent } from './distribution/distribution.component';
import { DrDiscountComponent } from './distribution/dr-discount/dr-discount.component';
import { DisOtpVarificationComponent } from './distribution/dis-otp-varification/dis-otp-varification.component';
import { DisExecutiveModelComponent } from './distribution/dis-executive-model/dis-executive-model.component';
import { SpecialDiscountComponent } from './special-discount/special-discount.component';
import { PrintpageComponent } from './printpage/printpage.component';
import { PopupComponent } from './popup/popup.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { StorageServiceModule} from 'angular-webstorage-service';
import { TopsellingitemComponent } from './topsellingitem/topsellingitem.component';
import { DistrictnameComponent } from './districtname/districtname.component';
import { SeriesWiseReportComponent } from './series-wise-report/series-wise-report.component';
import { PopNGiftMasterComponent } from './pop-n-gift-master/pop-n-gift-master.component';
import { AddPopNGiftComponent } from './add-pop-n-gift/add-pop-n-gift.component';
import { PopNGiftListComponent } from './order/pop-n-gift-list/pop-n-gift-list.component';
import { PopNGiftDetailComponent } from './order/pop-n-gift-detail/pop-n-gift-detail.component';
import { SchemeMasterListComponent } from './scheme-master-list/scheme-master-list.component';
import { SchemeMasterAddComponent } from './scheme-master-add/scheme-master-add.component';
import { AreaTargetComponent } from './area-target/area-target.component';
import { UploadFileModelComponent } from './upload-file-model/upload-file-model.component';
import { AllowanceMasterComponent } from './allowance-master/allowance-master.component';
import { ExpenseListComponent } from './expense/expense-list/expense-list.component';
import { ExpenseDetailComponent } from './expense/expense-detail/expense-detail.component';
import { TravelPlanDetailComponent } from './travel/travel-plan-detail/travel-plan-detail.component';
import { InvoiceBillingComponent } from './billing/invoice-billing/invoice-billing.component';
import { InvoiceBillingDetailComponent } from './billing/invoice-billing-detail/invoice-billing-detail.component';
import { AreaTargetSurveyComponent } from './area-target-survey/area-target-survey.component';
import { AreaTargetSurveyReportComponent } from './area-target-survey-report/area-target-survey-report.component';
import { PlumberMeetComponent } from './plumber-meet/plumber-meet.component';
import { PlumberMeetDetailComponent } from './plumber-meet-detail/plumber-meet-detail.component';
import { ProductionPlanListComponent } from './production-plan-list/production-plan-list.component';
import { StockDataComponent } from './stock-data/stock-data.component';
import { StockSummaryComponent } from './stock-summary/stock-summary.component';
import { WarehouseToWarehouseSummaryComponent } from './warehouse-to-warehouse-summary/warehouse-to-warehouse-summary.component';
import { WarehouseToWarehouseSummaryDetailComponent } from './warehouse-to-warehouse-summary-detail/warehouse-to-warehouse-summary-detail.component';
import { AreawisesalesreportComponent } from './areawisesalesreport/areawisesalesreport.component';
import { CitynamesComponent } from './citynames/citynames.component';
import { CompanynamesComponent } from './companynames/companynames.component';
import { FooterComponent } from './footer/footer.component';
import { AnnouncemnetListComponent } from './announcemnet-list/announcemnet-list.component';
import { AnnouncemneAddComponent } from './announcemne-add/announcemne-add.component';
import { AnnouncementDetailComponent } from './announcement-detail/announcement-detail.component';
import { ComplainListComponent } from './complain-list/complain-list.component';
import { EnquiryFromAppListingComponent } from './enquiry-from-app-listing/enquiry-from-app-listing.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { EnquiryFromAppDetailComponent } from './enquiry-from-app-detail/enquiry-from-app-detail.component';
import { ComplainDetailComponent } from './complain-detail/complain-detail.component';
import { TargetComponent } from './target/target.component';
import { TargetaddComponent } from './targetadd/targetadd.component';
import { AddsurfaceorderComponent } from './addsurfaceorder/addsurfaceorder.component';
import { BillingdocumentComponent } from './billingdocument/billingdocument.component';
import { ShowroomEnquiryListComponent } from './showroom-enquiry-list/showroom-enquiry-list.component';


const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [AuthGuard]},



  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'addsurfaceorder', component: AddsurfaceorderComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},

  { path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'user-add', component: UserAddComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'followup-add', component: FollowupAddComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'sale-user-list', component: SaleUserListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'target', component: TargetComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},

  { path: 'sale-user-target/:id', component: UserTargetComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'sale-user-detail/:id', component: SaleUserDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'complain-detail/:id', component: ComplainDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'add-discount/:id', component: AddDiscountComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'discount-list', component: DiscountListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  // {path:'admin' , loadChildren:()=>{
  //   import('sadad/dada').then((m)=>{m.AdminModule})
  // }}
  { path: 'system-user-detail/:id', component: SystemUserDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'system-user-list', component: SystemUserListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'add-order', component: AddOrderComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'targetadd', component: TargetaddComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},

  { path: 'order-list', component: OrderListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1', '2']}},

  { path: 'secondary-order-list', component: SecondaryOrderListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'order-detail/:id', component: OrderDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1', '2']}},
  { path: 'my-network/:id', component: MyNetworkComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'add-holiday', component: AddHolidayComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'add-leave-rules', component: AddLeaveRulesComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'holiday-list', component: HolidayListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'leave-rule-list', component: LeaveRuleListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'add-distribution/:type', component: AddDistributionComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},

  { path: 'distribution-detail/:id', component: DistributionDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1', '2']}},
  { path: 'distribution-list', component: DistributionListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'companynames', component: CompanynamesComponent, canActivate: [AuthComponentGuard], data: {expectedRole: ['1']}},

  { path: 'distribution-order-list', component: DistributionOrderListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'followup-list', component: FollowupListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'add-lead', component: AddLeadComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'lead-list', component: LeadListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'lead-detail/:id', component: LeadDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'user-lead-list/:id', component: UserLeadListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'attendance', component: AttendenceComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'dealer', component: DealerComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'direct-dealer', component: DirectDealerComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'checkin', component: CheckinComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'live_track', component: LiveTrackComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},

  { path: 'dealer-lead-list', component: DealerLeadListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'consumer-lead-list', component: ConsumerLeadListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'plumber-lead-list', component: PlumberLeadListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'dwr', component: DwrComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'monthly-dwr', component: MonthlyDwrComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'leave-list', component: LeavesComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'travel-list', component: TravelListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'add-order/:dr_id', component: AddOrderComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1', '2']}},

  { path: 'topsellingitem', component: TopsellingitemComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},

  { path: 'primary-vs-secondary', component: PrimaryVsSecondaryComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},

  { path: 'distriutor-sales-report', component: DistriutorSalesReportComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},

  { path: 'plumber-detail.component/:id', component: PlumberDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'product-wise-report', component: ProductWiseReportComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'direct-order', component: DirectOrderComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},

  { path: 'schememaster', component: SchemeMasterComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'specialdiscount', component: SpecialDiscountComponent, canActivate: [AuthComponentGuard], data: {expectedRole: ['1']}},
  {path: 'print', component: PrintpageComponent, canActivate: [AuthComponentGuard], data: {expectedRole: ['1']}},
  {path: 'popup/:id', component: PopupComponent, canActivate: [AuthComponentGuard], data: {expectedRole: ['1']}},
  {path: 'printpage', component: PrintpageComponent, canActivate: [AuthComponentGuard], data: {expectedRole: ['1']}},
  {path: 'districtname', component: DistrictnameComponent, canActivate: [AuthComponentGuard], data: {expectedRole: ['1']}},
  {path: 'series-wise-report', component: SeriesWiseReportComponent, canActivate: [AuthComponentGuard], data: {expectedRole: ['1']}},
  {path: 'pop-n-gift-master', component: PopNGiftMasterComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'add-pop-n-gift/:id', component: AddPopNGiftComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'pop-n-gift-list', component: PopNGiftListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1', '2']}},
  { path: 'pop-n-gift-detail/:id', component: PopNGiftDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1', '2']}},
  { path: 'scheme-master-list', component: SchemeMasterListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1', '2']}},
  {path: 'scheme-master-add/:id', component: SchemeMasterAddComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'area-target', component: AreaTargetComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'allowance-master', component: AllowanceMasterComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'upload-file-model', component: UploadFileModelComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'expense-list', component: ExpenseListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'expense-detail/:id', component: ExpenseDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'travel-plan-detail/:id', component: TravelPlanDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'invoice-billing', component: InvoiceBillingComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'invoice-billing-detail/:id', component: InvoiceBillingDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'area-target-survey-report', component: AreaTargetSurveyReportComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'plumber-meet', component: PlumberMeetComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  { path: 'plumber-meet-detail/:id', component: PlumberMeetDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'target-survey', component: AreaTargetSurveyComponent},
  { path: 'production-plan-list', component: ProductionPlanListComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path : 'stock-data' , component:StockDataComponent,canActivate:[AuthComponentGuard], data : {expectedRole : ['1']}},
  {path : 'stock-summary/:id', component:StockSummaryComponent,canActivate:[AuthComponentGuard],data:{expectedRole : ['1']}},
  {path : 'warehouse-to-warehouse-summary' , component:WarehouseToWarehouseSummaryComponent,canActivate:[AuthComponentGuard], data:{expectedRole :['1']}},
  {path : 'warehouse-to-warehouse-summary-detail', component:WarehouseToWarehouseSummaryDetailComponent,canActivate:[AuthComponentGuard],data:{expectedRole : ['1']}},
  { path: 'areawisesalesreport', component: AreawisesalesreportComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},
  {path: 'citynames', component: CitynamesComponent, canActivate: [AuthComponentGuard], data: {expectedRole: ['1']}},
  {path : 'announcemnet-list',component : AnnouncemnetListComponent , canActivate : [AuthComponentGuard], data : {expectedRole : ['1']}},
  {path : 'announcemnet-add',component : AnnouncemneAddComponent,canActivate : [AuthComponentGuard],data : {expectedRole : ['1']}},
  // {path : 'announcemnet-add',component : AddAnnouncementComponent,canActivate : [AuthComponentGuard],data : {expectedRole : ['1']}},
  {path : 'announcement-detail/:id',component:AnnouncementDetailComponent,canActivate:[AuthComponentGuard],data:{expectedRole:['1']}},
  {path : 'complain-list',component:ComplainListComponent,canActivate:[AuthComponentGuard],data:{expectedRole:['1']}},
  {path : 'enquiry-from-app-listing',component:EnquiryFromAppListingComponent,canActivate:[AuthComponentGuard],data:{expectedRole:['1']}},
  {path : 'enquiry-showroom-listing',component:ShowroomEnquiryListComponent,canActivate:[AuthComponentGuard],data:{expectedRole:['1']}},

  { path: 'enquiry-from-app-detail/:id', component: EnquiryFromAppDetailComponent, canActivate: [AuthComponentGuard], data: { expectedRole: ['1']}},


];

@NgModule({
  declarations: [
    CitynamesComponent,
    CompanynamesComponent,
    AppComponent,
    GiftListComponent,
    AreawisesalesreportComponent,
    AddGiftComponent,
    PrintpageComponent,
    TerritoryListComponent,
    TerritoryAddComponent,
    LoginComponent,
    HeaderComponent,
    OfferAddComponent,
    PlumberDetailComponent,
    OfferListComponent,
    OfferDetailComponent,
    NavigationComponent,
    MasterTabComponent,
    AddProductComponent,
    MasterTabListComponent,
    ProductListComponent,
    UserAddComponent,
    SaleUserListComponent,
    SaleUserDetailComponent,
    DashboardComponent,
    UserEmailModalComponent,
    AddDiscountComponent,
    DiscountListComponent,
    SystemUserDetailComponent,
    SystemUserListComponent,
    ProductDetailComponent,
    ConfirmDialogComponent,
    EditAddressComponent,
    AddOrderComponent,
    OrderListComponent,
    OrderDetailComponent,
    MyNetworkComponent,
    AddHolidayComponent,
    AddLeaveRulesComponent,
    HolidayListComponent,
    AddDistributionComponent,
    DistributionDetailComponent,
    DistributionListComponent,
    DistributionOrderListComponent,
    LeaveRuleListComponent,
    FollowupListComponent,
    AddLeadComponent,

    LeadListComponent,
    LeadDetailComponent,
    UserLeadListComponent,
    EditleadComponent,
    AttendenceComponent,
    DealerComponent,
    DirectDealerComponent,
    DistributionEditComponent,
    CheckinComponent,
    LiveTrackComponent,
    DealerLeadListComponent,
    PlumberLeadListComponent,
    ConsumerLeadListComponent,
    StatusModalComponent,
    SecondaryOrderListComponent,
    CurrencywordsPipe,
    NumericWordsPipe,
    DwrComponent,
    UserTargetComponent,
    LeavesComponent,
    ChangeStatusComponent,
    AddPrimaryOrderValueComponent,
    TravelListComponent,
    PrimaryVsSecondaryComponent,
    DistributionLegderModelComponent,
    DistriutorSalesReportComponent,
    ProductQrCodeModelComponent,
    ChangeSchemeStatusModelComponent,
    PlumberEditModelComponent,
    MonthlyDwrComponent,
    OrderEditModalComponent,
    ProductWiseReportComponent,
    DirectOrderComponent,
    SchemeMasterComponent,
    MyFilterPipe,
    OrderDispatchComponent,
    UpdateAdminModelComponent,
    DistributionComponent,
    DrDiscountComponent,
    DisOtpVarificationComponent,
    DisExecutiveModelComponent,
    SpecialDiscountComponent,
    PrintpageComponent,
    PopupComponent,
    TopsellingitemComponent,
    FooterComponent,
    DistrictnameComponent,
    SeriesWiseReportComponent,
    PopNGiftMasterComponent,
    AddPopNGiftComponent,
    PopNGiftListComponent,
    PopNGiftDetailComponent,
    SchemeMasterListComponent,
    SchemeMasterAddComponent,
    AreaTargetComponent,
    UploadFileModelComponent,
    AllowanceMasterComponent,
    ExpenseListComponent,
    ExpenseDetailComponent,
    TravelPlanDetailComponent,
    InvoiceBillingComponent,
    InvoiceBillingDetailComponent,
    AreaTargetSurveyComponent,
    AreaTargetSurveyReportComponent,
    PlumberMeetComponent,
    PlumberMeetDetailComponent,
    ProductionPlanListComponent,
    StockDataComponent,
    StockSummaryComponent,
    WarehouseToWarehouseSummaryComponent,
    WarehouseToWarehouseSummaryDetailComponent,
    AnnouncemnetListComponent,
    AnnouncemneAddComponent,
    AnnouncementDetailComponent,
    ComplainListComponent,
    EnquiryFromAppListingComponent,
    AddAnnouncementComponent,
    EnquiryFromAppDetailComponent,
    ComplainDetailComponent,
    TargetComponent,
    TargetaddComponent,
    AddsurfaceorderComponent,
    BillingdocumentComponent,
    ShowroomEnquiryListComponent,
    FollowupAddComponent,

  ],
  imports: [
    BrowserModule,
    StorageServiceModule,
    FormsModule,
    ChartsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxPaginationModule,
    NoopAnimationsModule,
    MatDialogModule,
    FilterPipeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    MatButtonToggleModule,
    NgxEditorModule,
    AngularFontAwesomeModule,
    InfiniteScrollModule,
    AutocompleteLibModule,
    MatListModule,
    MatCardModule,
  ],
  providers: [
    PearlService,
    AuthGuard,
    AuthGuardLog,
    AuthComponentGuard,
    LocalStorage,
    DialogComponent,
    ExportexcelService,
    BnNgIdleService,
  ],

  entryComponents: [
TargetaddComponent,BillingdocumentComponent,
    DisExecutiveModelComponent, DisOtpVarificationComponent, DrDiscountComponent, UpdateAdminModelComponent, UserEmailModalComponent, ConfirmDialogComponent, EditAddressComponent, EditleadComponent, DistributionEditComponent, StatusModalComponent, ChangeStatusComponent, AddPrimaryOrderValueComponent, DistributionLegderModelComponent, ProductQrCodeModelComponent, ChangeSchemeStatusModelComponent, PlumberEditModelComponent, OrderEditModalComponent, OrderDispatchComponent
  ],

  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
