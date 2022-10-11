import { Component, OnInit, Inject } from '@angular/core';
import { PearlService } from 'src/app/pearl.service';
import { MAT_DIALOG_DATA, MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html'
})
export class StatusModalComponent implements OnInit {

  login:any={};
  tmpOrderStatus='';
  status_flag:any = 'no_data';
  reason_reject:any
  selected_survey_report_basic_info: any = [];
  selected_survey_report_area_info: any = [];
  overall_all_total: any = {};
  old_bill_data_array :any =[];
  outstanding_array :any =[];
  totalOutstandingArray :any =[];
  page_limit:any=50;
  start:any=0;
  area_target_list: any = [];
  area_target_list_count: any = 0;
  total_page:any='';
  pagenumber:any='';
  secondary_box_detail_list:any = [];
  view_tab:any='company_wise';
  warehouse_to_warehouse_transfer_summary_product_detail : any = []
  open_row_id:any=0;
  urls: any = [];
  selectedFile: any = [];
  loader:boolean = false;
  totalDealersOutstandingArray:any=[];
  totalCompanyWiseOverdueArray:any=[];
  complaint_images_data:any=[];
  totalDealersOverdueArray:any=[];
  totalCompanyWiseDisaptchValueArray:any=[];
  totalCompanyWiseDisaptchQuantiyArray:any=[];
  totalDealerWiseDisaptchValueArray:any=[];
  totalDealerWiseDisaptchQuantityArray:any=[];
  currentPlayingVideo: HTMLVideoElement;
  excel_data:any=[];


  constructor(@Inject(MAT_DIALOG_DATA)public data,public dialog:MatDialog,public serve:PearlService,public dialog_component:DialogComponent,public toast:ToastrManager) {
    console.log(this.data);
    if(this.data.data){
      this.status_flag=this.data.data;
    }

    if(this.data.image){
      this.status_flag='image_model_open';
    }

    if(this.data.from=='product_image'){
      this.status_flag=this.data.from;
    }
    if(this.data.from=='billing_detail'){
      this.status_flag=this.data.from;
    }
    if(this.data.from=='complain detail modal'){
      this.status_flag=this.data.from;
    }
    if(this.data.from=='old_bill_distribution_page'){
      this.status_flag=this.data.from;
    this.oldBillsData();

    }

    if(this.data.from=='out_standing_distribution_page'){
      this.status_flag=this.data.from;
    this.oldOutstandingData();

    }

    

    if(this.data.from=='user_image'){
      this.status_flag=this.data.from;
    }
    if(this.data.from == 'dashboard_outstanding_tab'){
      this.status_flag =this.data.from;
      this.totalCompanyOutstandingData(); 
    }

    if(this.data.from == 'dashboard_dispatch_value_tab'){
      this.status_flag =this.data.from;
     this.totalCompanyWiseDispatchValueData();
    }

    if(this.data.from == 'dashboard_dispatch_quantity_tab'){
      this.status_flag =this.data.from;
     this.totalCompanyWiseDispatchQuantityData();
    }
    if(this.data.from == 'dashboard_overdue_tab'){
      this.status_flag =this.data.from;
      this.totalCompanyWiseOverdueData();
    }
    console.log( this.status_flag);

    this.tmpOrderStatus =  this.data.order_status;
    console.log(this.tmpOrderStatus);
    if(this.tmpOrderStatus){
      this.data.order_status = '';
      this.data.reason = '';

    }

    if(this.data.from == 'expense_detail_page' && this.data.change_status_of && this.data.expense_id){

      console.log(this.data);
      console.log('data comes from expese detail');
      this.status_flag=this.data.from;

    }

    if(this.data.from == 'travel_plan_detail_page' && this.data.travel_id){
      console.log(this.data);
      console.log('data comes from travel plan detail');
      this.status_flag=this.data.from;

    }

    if(this.data.from == 'distributor_detail_page' && this.data.dr_id && this.data.dr_id != ''  && this.data.credit_limit && this.data.dr_code && this.data.credit_opening_balance && this.data.credit_period){
      console.log(this.data);
      console.log('data comes from distributor_detail_page');
      this.status_flag=this.data.from;

    }

    if(this.data.from == 'area_target_survey_report' && this.data.survey_id){
      console.log(this.data);
      console.log('data comes from area_target_survey_report');
      this.status_flag=this.data.from;
      this.get_survey_data_of_particular_id();

    }

    if(this.data.from == 'dashboard' && this.data.data_type){
      console.log(this.data);
      console.log('data comes from dashboard');
      this.status_flag=this.data.from;
      this.get_targt_vs_achievement_list();

    }

    if((this.data.from == 'plumber-meet-list-page' || this.data.from == 'plumber-meet-detail-page') && this.data.plumber_meet_id && this.data.plumber_meet_status){
      console.log(this.data);
      console.log('data comes from plumber-meet-list-page');
      this.status_flag=this.data.from;

    }

    if((this.data.from == 'order_detail_page') && this.data.master_cart_id){
      console.log(this.data);
      console.log('data comes from order_detail_page');
      this.status_flag=this.data.from;
      this.get_secondary_box_data_from_master_box(this.data.master_cart_id);

    }

    if((this.data.from == 'warehouse_to_warehouse_summary_detail') && this.data.master_box_qr_code_id){
      console.log(this.data);
      console.log('data comes from warehouse_to_warehouse_summary_detail page');
      this.status_flag=this.data.from;
      this.get_warehouse_to_warehouse_transfer_summary_product_detail(this.data.master_box_qr_code_id);

    }

    if((this.data.from == 'add_product_page') && (this.data.category == 'add_new_category' || this.data.sub_category == 'add_new_sub_category')){
      console.log(this.data);
      console.log('data comes from add_product_page');
      this.status_flag=this.data.from;

    }

    if(this.data.from == 'product_listing_page' &&  (this.data.selected_cetegory_id != '0' || this.data.selected_sub_category_id != '0')){
      console.log(this.data);
      console.log('data comes from product_listing_page');
      this.status_flag=this.data.from;
      this.data.selected_cetegory_id ? this.get_category_or_subcategory_data('category',this.data.selected_cetegory_id) : this.get_category_or_subcategory_data('sub_category',this.data.selected_sub_category_id)

    }

    if(this.data.from == 'complain_list' &&  (this.data.complain_status && this.data.complain_id != '0')){
      console.log(this.data);
      console.log('data comes from complain_list_page');
      this.status_flag='complain_list_for_status_change';


    }

    if(this.data.from == 'distributor_detail_page' &&  (this.data.purpose == 'add_multiple_contact' && this.data.di_id != '0')){
      console.log(this.data);
      console.log('data comes from distributor_detail_page for add_multiple_contact');
      this.status_flag=this.data.purpose;

    }

    if(this.data.from == 'distributor_detail_page' &&  (this.data.purpose == 'edit_multiple_contact' && this.data.contact_id != '0')){
      console.log(this.data);
      console.log('data comes from distributor_detail_page for edit_multiple_contact');
      this.status_flag=this.data.purpose;

    }

    if(this.data.from == 'Change Status from user list' &&  (this.data.user_verification_status == 'Pending' && this.data.user_id != '0')){
      console.log(this.data);
      console.log('data comes from user list for verify dr user');
      this.status_flag=this.data.from;

    }

    if(this.data.from == 'complain_list' &&  (this.data.where_to =='for_view_images' && this.data.complain_id != '0')){
      console.log(this.data);
      console.log('data comes from complain_list_page to view images');
      this.status_flag='complain_list_for_view_images';
      this.get_complain_images();
    }

    if(this.data.from=='close_order'){
      this.status_flag=this.data.from;
    }

    if(this.data.from=='save_button_modal_quantity'){
      console.log("quantity save button modal",this.data);
      this.status_flag=this.data.from;
    }

    if(this.data.from=='view_order_item_table'){
      console.log("order item view button modal data", this.data);
      this.status_flag=this.data.from;
      this. listing_order_item();
    }

  }

  ngOnInit() {
    this.login= JSON.parse(sessionStorage.getItem('login'));
    console.log(this.login.data.id);
  }
  // aamir changes here
  update_log_listing_array:any=[]
  listing_order_item(){
    console.log("the data order item", this.data.order_item_id)
    this.serve.fetchData({'order_item_id':this.data.order_item_id,'order_id':this.data.order_id},'Order/order_update_log_listing').subscribe((r)=>{
      console.log("order update order log listing",r);
      this.update_log_listing_array=r['update_log_listing'];
      console.log("this update listing array",this.update_log_listing_array);
    });
    this.dialog.closeAll();
  }

  update_quantity_item(){
    console.log("this quantity edit modal data works");
    // const index = this.data.order_item.findIndex(row => row.id === id);
    //     console.log(index);

        this.serve.fetchData({ 'order_item_id': this.data.order_item, 'remark':this.data.user_verification_remark,'item': this.data.item,
          'order':this.data.order,'order_id':this.data.order_id, 'updated_by':this.login.data.id}, 'Order/update_order_item')
        .subscribe((result) => {
            console.log(result);
            // this.editqty = false;

        });
        this.dialog.closeAll();
  }
  // aamir chnages end here

  order_status_change(reason,status){
    console.log(reason);
    console.log(status);
    this.serve.fetchData({'reason':reason,'status':status,'id':this.data.order_id,'action_by':this.login.data.id,'update_status_itemwise_array':this.data.update_status_itemwise_array},"Order/orderstatus_change").subscribe((result=>{
      console.log(result);
    }))
    this.dialog.closeAll();
  }

  update_pop_order_status(){
    console.log(this.data.reason);
    console.log(this.data.order_status);
    this.serve.fetchData({'reason':this.data.reason,'status':this.data.order_status,'id':this.data.order_id,'action_by':this.login.data.id},"Order/pop_order_status_change").subscribe((result=>{
      console.log(result);
    }))
    this.dialog.closeAll();
  }


  update_checkin_status(){
    console.log(this.data.checkin_verification_remark);

    console.log(this.data.checkin_id);
    this.serve.fetchData({'checkin_verification_remark':this.data.checkin_verification_remark,'checkin_id':this.data.checkin_id,'status_update_by':this.login.data.id},"Attendance/verified_checkin_status").subscribe((result=>{
      console.log(result);
    }))
    this.dialog.closeAll();

  }

  update_expense_status(){

    console.log("update_expense_status method calls");
    console.log(this.data);
    console.log('status change by = '+this.login.data.id);
    this.serve.fetchData({'reason':this.data.reason,'status':this.data.expense_status,'expense_id':this.data.expense_id,'status_changed_by':this.login.data.id,'type':this.data.change_status_of, 'total_approved_amount' : (this.data.change_status_of == 'accounts' && this.data.expense_status == 'Approved' ? this.data.approved_amount : '' ) },"Expense/expense_status_update").subscribe((result=>{
      console.log(result);

      if(result['msg'] == 'success')
      {
        this.dialog_component.success("Expense Status", "Update");
        // window.history.go(-1);
      }
      else{
        this.dialog_component.error("Something Went Wrong");
      }

    }))
    this.dialog.closeAll();

  }

  conInt(amount){
    amount = parseInt(amount)
    return amount;
  }

  update_travel_plan_status(){
    console.log("update_travel_plan_status method calls");

    console.log(this.data);
    console.log('status change by = '+this.login.data.id);
    this.serve.fetchData({'reason':this.data.reason,'status':this.data.travel_status,'travel_id':this.data.travel_id,'status_changed_by':this.login.data.id},"Travel/update_travel_plan_status").subscribe((result=>{
      console.log(result);

      if(result['msg'] == 'success')
      {
        this.dialog_component.success("Travel Plan Status", "Update");
        window.history.go(-1);
      }
      else{
        this.dialog_component.error("Something Went Wrong");
      }

    }))
    this.dialog.closeAll();


  }

  update_billing_details(){
    console.log("update_travel_plan_status method calls");

    console.log(this.data);
    console.log('Credit Data Change By = '+this.login.data.id);
    this.serve.fetchData({'dr_id':this.data.dr_id,'credit_limit':this.data.credit_limit,'dr_code':this.data.dr_code,'credit_opening_balance':this.data.credit_opening_balance,'credit_period':this.data.credit_period,'credit_data_changed_by':this.login.data.id,'display_billing_status':this.data.display_billing_status},"Distributors/bill_credit_limit_data_save").subscribe((result=>{
      console.log(result);

      if(result['msg'] == 'success')
      {
        this.dialog_component.success("Billing Details", "Update");
      }
      else{
        this.dialog_component.error("Something Went Wrong");
      }

    }))
    this.dialog.closeAll();
  }

  get_survey_data_of_particular_id(){
    console.log("get_survey_data_of_particular_id method calls");

    this.serve.fetchData({'survey_id':this.data.survey_id},"User/dr_area_target_survey_data_detail").subscribe((result=>{
      console.log(result);
      this.selected_survey_report_basic_info=result['survey_detail'];
      this.selected_survey_report_area_info=result['survey_item_detail'];
      this.overall_all_total=result['overall_all_total'];

    }))

  }

  get_targt_vs_achievement_list(){
    console.log("get_targt_vs_achievement_list method");
    this.serve.fetchData({'start':this.start,'pagelimit':this.page_limit,'type':this.data.data_type},"User/assigned_area_target_list_for_dashboard").subscribe((result=>{
      console.log(result);
      this.area_target_list = result['assigned_area_target_list']
      this.area_target_list_count = result['area_target_list_count']
      this.total_page = Math.ceil(this.area_target_list_count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;


    }))

  }

  update_plumber_meet_status(){
    console.log("update_plumber_meet_status method");
    console.log(this.data);
    console.log('status change by = '+this.login.data.id);
    this.serve.fetchData({'remarks':this.data.reason,'status':this.data.plumber_meet_status,'plumber_meet_id':this.data.plumber_meet_id,'status_changed_by':this.login.data.id},"PlumberMeet/plumber_meet_status_change_for_web").subscribe((result=>{
      console.log(result);

      if(result == 'Updated Successfully')
      {
        this.dialog_component.success("Carpenter Meet Status", "Update");
      }
      else{
        this.dialog_component.error("Something Went Wrong, Please Try Again !");
      }

    }))
    this.dialog.closeAll();

  }

  get_secondary_box_data_from_master_box(master_cart_id){

    console.log("get_secondary_box_data_from_master_box method");
    this.serve.fetchData({'master_cart_id':master_cart_id},"order/secondary_box_detail").subscribe((result=>{
      console.log(result);
      this.secondary_box_detail_list = result['secondary_box_detail_list']
    }))


  }

  get_warehouse_to_warehouse_transfer_summary_product_detail(master_box_qr_code_id){

    console.log("get_warehouse_to_warehouse_transfer_summary_product_detail method");
    this.serve.fetchData({'master_box_qr_code_id':master_box_qr_code_id},"Stock/warehouse_to_warehouse_transfer_product_wise_detail").subscribe((result=>{
      console.log(result);
      this.warehouse_to_warehouse_transfer_summary_product_detail = result['product_wise_detail_list']
    }))


  }

  add_new_category(){
    console.log("add_new_category method calls");
    console.log(this.data);
    console.log(this.selectedFile);
    this.loader = true;

    this.serve.fetchData({'category' : (this.status_flag=='product_listing_page' && (this.data.selected_cetegory_id != '0') ? {'id': this.data.selected_cetegory_id , 'main_category': this.data.category,'image':this.selectedFile,'created_by':this.login.data.id} : {'main_category': this.data.new_category_name,'image':this.selectedFile,'created_by':this.login.data.id})},"CategoryProductMaster/addMainCategorynew").subscribe((result=>{
      console.log(result['msg']);
      this.loader = false;

      if(result['msg'] == 'Success')
      {
        this.dialog_component.success("Category Added", "Successfully");
        this.dialog.closeAll();

      }
      else{
        this.dialog_component.error(result['msg']);
      }

    }))


  }

  add_new_sub_category(){
    console.log("add_new_sub_category method calls");
    console.log(this.data);
    console.log(this.selectedFile);
    this.loader = true;

    this.serve.fetchData({'category' : (this.status_flag=='product_listing_page' && (this.data.selected_sub_category_id != '0') ? {'edit_sub_cat_id': this.data.selected_sub_category_id ,'image':this.selectedFile,'created_by':this.login.data.id,'sub_category':this.data.new_subcategory_name} : {'main_category_id':this.data.category_id,'sub_category':this.data.new_subcategory_name,'image':this.selectedFile,'created_by':this.login.data.id,'id': this.data.selected_sub_category_id})},"CategoryProductMaster/addSubCategory").subscribe((result=>{

      console.log(result['msg']);
      this.loader = false;

      if(result['msg'] == 'Success')
      {
        this.dialog_component.success("Sub Category Added", "Successfully");
        this.dialog.closeAll();

      }
      else{
        this.dialog_component.error(result['msg']);
      }

    }))


  }

  delete_img(index: any) {
    this.urls.splice(index, 1)
    this.selectedFile=[];

  }

  insertImage(event) {

    console.log(event);

    let files = event.target.files;
    console.log(files)
    if (files) {
      console.log("in if");
      for (let file of files) {
        console.log("in for");
        let reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e);

          this.urls[0] = (e.target.result);
          console.log(this.urls);
          for (var i = 0; i < this.urls.length; i++) {
            this.selectedFile = (this.urls[i]);
          }
          console.log(this.selectedFile);

        }
        reader.readAsDataURL(file);
      }
    }
    console.log(this.urls);



  }

  get_category_or_subcategory_data(type,id){
    console.log("get_category_or_subcategory_data method calls");

    this.serve.fetchData({'type':type,'id':id},"CategoryProductMaster/category_or_sub_category_data").subscribe((result=>{
      console.log(result);
      this.urls.push(result['image'])
      for (var i = 0; i < this.urls.length; i++) {
        this.selectedFile = (this.urls[i]);
      }
      this.data.category = result['category_name']
      this.data.new_subcategory_name = result['sub_category_name']

    }))

  }

  onPlayingVideo(event) {
    event.preventDefault();
    // play the first video that is chosen by the user
    if (this.currentPlayingVideo === undefined) {
      this.currentPlayingVideo = event.target;
      this.currentPlayingVideo.play();
    } else {
      // if the user plays a new video, pause the last one and play the new one
      if (event.target !== this.currentPlayingVideo) {
        this.currentPlayingVideo.pause();
        this.currentPlayingVideo = event.target;
        this.currentPlayingVideo.play();
      }
    }
  }

  delete_uploaded_image(){

  }


  update_complain_status(reason,changed_status){
    console.log(this.data.reason);
    console.log(this.data.complain_status);

    console.log(reason);
    console.log(changed_status);

    console.log(this.data.complain_id);


    this.serve.fetchData({'reason':this.data.reason,'status':this.data.complain_status,'id':this.data.complain_id,'action_by':this.login.data.id},"Complaint_Controller/update_complaint_status").subscribe((result=>{
      console.log(result);
      if(result['msg']=='Status Updated Successfully'){
        this.toast.successToastr("sucess");
        this.dialog.closeAll();

      }else{
        this.toast.successToastr("Something Went Wrong");
      }
    }))
  }


  add_multiple_contacts(){

    console.log("add_multiple_contacts method calls");
    console.log(this.data);
    console.log(this.data.dr_id);
    this.serve.fetchData({'contact_person':this.data.contact_person, 'mobile':this.data.mobile, 'dr_id':this.data.di_id, 'created_by':this.login.data.id},"Distributors/add_dr_multiple_contact").subscribe((result=>{
      console.log(result);
    }))
    this.dialog.closeAll();
  }

  update_multiple_contacts(){

    console.log("update_multiple_contacts method calls");
    console.log(this.data);
    console.log(this.data.contact_id);
    this.serve.fetchData({'contact_person':this.data.contact_person, 'mobile':this.data.mobile, 'contact_id':this.data.contact_id, 'updated_by':this.login.data.id},"API").subscribe((result=>{
      console.log(result);
    }))
    this.dialog.closeAll();
  }


  update_dr_user_status(){
    console.log("update_dr_user_status method calls");
    console.log(this.data.user_verification_remark);
    console.log(this.data.user_verification_status);


    console.log(this.data.checkin_id);
    this.serve.fetchData({'user_verification_remark':this.data.user_verification_remark,'user_id':this.data.user_id,'status_update_by':this.login.data.id},"User/update_user_verification_status").subscribe((result=>{
      console.log(result);
    }))
    this.dialog.closeAll();

  }

  get_complain_images(){
    console.log("get_complain_images method calls");

    this.serve.fetchData({'complain_id':this.data.complain_id},"Complaint_Controller/assigned_complaint_images_upload_by_user").subscribe((result=>{
      console.log(result);
      this.complaint_images_data = result['images']

    }))


  }




  closeOrder(){
    // Closed
        this.serve.fetchData({ 'remark':this.data.remark,'id':this.data.order_id, 'updated_by':this.login.data.id,'status':'Closed'}, 'Order/order_status_closed')
        .subscribe((result) => {
            console.log(result);
            if(result){
              this.toast.successToastr("Status Updated Successfully");
              this.dialog.closeAll();

            }else{
              this.toast.successToastr("Something Went Wrong");
            }
        });
  }

    oldBillsData(){
      console.log(this.data.dr_id);
        this.loader = true;

        this.serve.fetchData({'dr_id' : this.data.dr_id},'Tally_invoice_credit/previous_opening_bills_list').subscribe((result)=>{
          console.log(result);
            this.old_bill_data_array = result['previous_opening_bills_list'];
          setTimeout(() => {
              this.loader =false;
          }, 2000);
        })

    }


    oldOutstandingData(){
      console.log(this.data.dr_id);
        this.loader = true;

        this.serve.fetchData({'dr_id' : this.data.dr_id},'Tally_invoice_credit/company_wise_outstanding').subscribe((result)=>{
          console.log(result);
            this.outstanding_array = result;
          setTimeout(() => {
              this.loader =false;
          }, 2000);
        })

    }

    totalCompanyOutstandingData(){
      console.log(this.data.dr_id);
        this.loader = true;
      // console.log('login_id' + this.login.data.id);
      
        this.serve.fetchData({},'Distributors/company_outstanding').subscribe((result)=>{
          console.log(result);
            this.totalOutstandingArray = result['total_outstanding_balance'];
            console.log(this.totalOutstandingArray);
            
          setTimeout(() => {
              this.loader =false;
          }, 1000);
        })

    }

    downloadCompany_Wise_Outstanding(){
      this.loader=true;
      this.excel_data=[];

      this.serve.fetchData({},'Distributors/company_outstanding').subscribe((result)=>{
        this.totalOutstandingArray = result['total_outstanding_balance'];
        for(let i=0;i<this.totalOutstandingArray.length;i++){
          this.excel_data.push({
            'COMPANY NAME':this.totalOutstandingArray[i].company_name,
            'OUTSTANDING BALANCE':this.totalOutstandingArray[i].outstanding_balance
          })
        }
        this.serve.exportAsExcelFile(this.excel_data,'COMPANY WISE OUTSTANDING EXCEL');
        setTimeout(() => {
          this.loader=false;
        }, 1000);
      })
      
    }

    downloadDealer_Wise_Outstanding(){
      this.loader=true;
      this.excel_data=[];

      this.serve.fetchData({},'Distributors/dr_outstanding').subscribe((result)=>{
        this.totalDealersOutstandingArray=result['total_outstanding_balance'];
        for(let i=0;i<this.totalDealersOutstandingArray.length;i++){
          this.excel_data.push({
            'CUSTOMER NAME':this.totalDealersOutstandingArray[i].customer_name,
            'OUTSTANDING BALANCE':this.totalDealersOutstandingArray[i].outstanding_balance,
          })
        }
        this.serve.exportAsExcelFile(this.excel_data,'DEALER WISE OUTSTANDING EXCEL');
        setTimeout(() => {
          this.loader=false;
        }, 1000);
      })
      
    }


    totalDealersOutstandingData(){
      console.log(this.data.dr_id);
        this.loader = true;
      // console.log('login_id' + this.login.data.id);
      
        this.serve.fetchData({},'Distributors/dr_outstanding').subscribe((result)=>{
          console.log(result);
            this.totalDealersOutstandingArray = result['total_outstanding_balance'];
            console.log(this.totalOutstandingArray);
            
          setTimeout(() => {
              this.loader =false;
          }, 1000);
        })

    }

    totalCompanyWiseOverdueData(){
      console.log(this.data.dr_id);
        this.loader = true;
      // console.log('login_id' + this.login.data.id);
      
        this.serve.fetchData({},'Distributors/company_wise_overdue').subscribe((result)=>{
          console.log(result);
            this.totalCompanyWiseOverdueArray = result['company_wise_overdue'];
            console.log(this.totalCompanyWiseOverdueArray);
            
          setTimeout(() => {
              this.loader =false;
          }, 1000);
        })

    }
    downladCompanyWiseOverdueDataExcel(){
      console.log(this.data.dr_id);
        this.loader = true;
      // console.log('login_id' + this.login.data.id);
      this.excel_data=[];
        this.serve.fetchData({},'Distributors/company_wise_overdue').subscribe((result)=>{
          console.log(result);
            this.totalCompanyWiseOverdueArray = result['company_wise_overdue'];
            console.log(this.totalCompanyWiseOverdueArray);
              for(let i=0; i<this.totalCompanyWiseOverdueArray.length; i++){
                this.excel_data.push({
                  'COMPANY NAME':this.totalCompanyWiseOverdueArray[i].surface_company_name,
                  'CREDIT PERIOD':this.totalCompanyWiseOverdueArray[i].credit_period,
                  'CREDIT OPENING BALANCE':this.totalCompanyWiseOverdueArray[i].credit_opening_balance,
                  'OVERDUE BALANCE':this.totalCompanyWiseOverdueArray[i].overdue_balance,
                })
              }
              this.serve.exportAsExcelFile(this.excel_data,'COMPANY WISE OVERDUE EXCEL');
          setTimeout(() => {
              this.loader =false;
          }, 1000);
        })

    }

    totalDealerOverdueData(){
      console.log(this.data.dr_id);
        this.loader = true;
      // console.log('login_id' + this.login.data.id);
      
        this.serve.fetchData({},'Distributors/dr_wise_overdue').subscribe((result)=>{
          console.log(result);
            this.totalDealersOverdueArray = result['dealer_wise_overdue'];
            console.log(this.totalDealersOverdueArray);
            
          setTimeout(() => {
              this.loader =false;
          }, 1000);
        })

    }

    downloadtotalDealerOverdueDataExcel(){
      console.log(this.data.dr_id);
        this.loader = true;
      // console.log('login_id' + this.login.data.id);
        this.excel_data=[];
        this.serve.fetchData({},'Distributors/dr_wise_overdue').subscribe((result)=>{
          console.log(result);
            this.totalDealersOverdueArray = result['dealer_wise_overdue'];
            console.log(this.totalDealersOverdueArray);
              for(let i=0; i<this.totalDealersOverdueArray.length; i++){
                this.excel_data.push({
                  'DEALER NAME':this.totalDealersOverdueArray[i].dealer_name,
                  'CREDIT PERIOD':this.totalDealersOverdueArray[i].credit_period,
                  'CREDIT OPENING BALANCE':this.totalDealersOverdueArray[i].credit_opening_balance,
                  'OVERDUE BALANCE':this.totalDealersOverdueArray[i].total_overdue_balance,
                })
              }
              this.serve.exportAsExcelFile(this.excel_data,'Dealer Wise Overdue Data Excel');
          setTimeout(() => {
              this.loader =false;
          }, 1000);
        })

    }

    totalCompanyWiseDispatchValueData(){
      console.log(this.data.dr_id);
        this.loader = true;
      // console.log('login_id' + this.login.data.id);
      
        this.serve.fetchData({},'Distributors/company_wise_dispatch').subscribe((result)=>{
          console.log(result);
            this.totalCompanyWiseDisaptchValueArray = result['company_dispatch_data'];
            console.log(this.totalCompanyWiseDisaptchValueArray);
            
          setTimeout(() => {
              this.loader =false;
          }, 1000);
        })

    }

    downloadCompany_Wise_Dispatch_Value(){
      this.loader=true;
      this.excel_data=[];
      this.serve.fetchData({},'Distributors/company_wise_dispatch').subscribe((result)=>{
        this.totalCompanyWiseDisaptchValueArray = result['company_dispatch_data'];
        for(let i=0;i<this.totalCompanyWiseDisaptchValueArray.length;i++){
          this.excel_data.push({
            'COMPANY NAME':this.totalCompanyWiseDisaptchValueArray[i].company_name,
            'TOTAL DISPATCH VALUE':this.totalCompanyWiseDisaptchValueArray[i].total_dispatch_value
          })
        }
        this.serve.exportAsExcelFile(this.excel_data,'COMPANY WISE DISPATCH VALUE EXCEL');
        setTimeout(() => {
          this.loader=false;
        }, 1000);
      })
      
    }
    downloadCompany_Wise_Dispatch_Quantity(){
      this.loader=true;
      this.excel_data=[];
      this.serve.fetchData({},'Distributors/company_wise_dispatch_quantity').subscribe((result)=>{
        this.totalCompanyWiseDisaptchValueArray = result['company_dispatch_data'];
        for(let i=0;i<this.totalCompanyWiseDisaptchValueArray.length;i++){
          this.excel_data.push({
            'COMPANY NAME':this.totalCompanyWiseDisaptchValueArray[i].company_name,
            'TOTAL DISPATCH Quantity':this.totalCompanyWiseDisaptchValueArray[i].total_dispatch_quantity
          })
        }
        this.serve.exportAsExcelFile(this.excel_data,'COMPANY WISE DISPATCH QUANTITY EXCEL');
        setTimeout(() => {
          this.loader=false;
        }, 1000);
      })
      
    }

    totalDealerDispatchValueData(){
      console.log(this.data.dr_id);
        this.loader = true;
      // console.log('login_id' + this.login.data.id);
      
        this.serve.fetchData({},'Distributors/dr_wise_dispatch').subscribe((result)=>{
          console.log(result);
            this.totalDealerWiseDisaptchValueArray = result['dr_dispatch_data'];
            console.log(this.totalDealerWiseDisaptchValueArray);
            
          setTimeout(() => {
              this.loader =false;
          }, 1000);
        })

    }

    downloadDealer_Wise_Dispatch_Value(){
      this.loader=true;
      this.excel_data=[];
      this.serve.fetchData({},'Distributors/dr_wise_dispatch').subscribe((result)=>{
        this.totalDealerWiseDisaptchValueArray=result['dr_dispatch_data'];
        for(let i=0;i<this.totalDealerWiseDisaptchValueArray.length;i++){
          this.excel_data.push({
            'CUSTOMER NAME':this.totalDealerWiseDisaptchValueArray[i].customer_name,
            'TOTAL DISPATCH VALUE':this.totalDealerWiseDisaptchValueArray[i].total_dispatch_value,
          })
        }
        this.serve.exportAsExcelFile(this.excel_data,'DEALER WISE DISPATCH VALUE EXCEL');
        setTimeout(() => {
          this.loader=false;
        }, 1000);
      })
      
    }

    totalCompanyWiseDispatchQuantityData(){
      console.log(this.data.dr_id);
        this.loader = true;
      // console.log('login_id' + this.login.data.id);
      
        this.serve.fetchData({},'Distributors/company_wise_dispatch_quantity').subscribe((result)=>{
          console.log(result);
            this.totalCompanyWiseDisaptchQuantiyArray=result['company_dispatch_data'];
            console.log(this.totalCompanyWiseDisaptchQuantiyArray);
            
          setTimeout(() => {
              this.loader =false;
          }, 1000);
        })

    }

    downloadDealer_Wise_Dispatch_Quantity(){
      console.log(this.data.dr_id);
        this.loader = true;
      // console.log('login_id' + this.login.data.id);
      this.excel_data=[];

        this.serve.fetchData({},'Distributors/company_wise_dispatch_quantity').subscribe((result)=>{
          console.log(result);
            this.totalCompanyWiseDisaptchQuantiyArray=result['company_dispatch_data'];
            console.log(this.totalCompanyWiseDisaptchQuantiyArray);
            for(let i=0;i<this.totalCompanyWiseDisaptchQuantiyArray.length; i++){
              this.excel_data.push({
                'COMPANY NAME':this.totalCompanyWiseDisaptchQuantiyArray[i].company_name,
                'TOTAL DISPATCH QUANTITY':this.totalCompanyWiseDisaptchQuantiyArray[i].total_dispatch_quantity,

              })
            }
            this.serve.exportAsExcelFile(this.excel_data,'COMPANY WISE DISPATCH QUANTITY');
          setTimeout(() => {
              this.loader =false;
          }, 1000);
        })

    }

    totalDealerDispatchQuantityData(){
      console.log(this.data.dr_id);
        this.loader = true;
      // console.log('login_id' + this.login.data.id);
      
        this.serve.fetchData({},'Distributors/dr_wise_dispatch_quantity').subscribe((result)=>{
          console.log(result);
            this.totalDealerWiseDisaptchQuantityArray = result['dr_dispatch_data'];
            console.log(this.totalDealerWiseDisaptchQuantityArray);
            
          setTimeout(() => {
              this.loader =false;
          }, 1000);
        })

    }
    downloadDispatchQuantityExcelDealerWise(){
      console.log(this.data.dr_id);
        this.loader = true;
      // console.log('login_id' + this.login.data.id);
      this.excel_data=[];

        this.serve.fetchData({},'Distributors/dr_wise_dispatch_quantity').subscribe((result)=>{
          console.log(result);
            this.totalDealerWiseDisaptchQuantityArray = result['dr_dispatch_data'];
            console.log(this.totalDealerWiseDisaptchQuantityArray);
              for(let i=0; i<this.totalDealerWiseDisaptchQuantityArray.length; i++){
                this.excel_data.push({
                  'CUSTOMER NAME':this.totalDealerWiseDisaptchQuantityArray[i].customer_name,
                  'TOTAL DISPATCH QUANTITY':this.totalDealerWiseDisaptchQuantityArray[i].total_dispatch_quantity
                })
              }
              this.serve.exportAsExcelFile(this.excel_data , 'EXCEL OF DISPATCH QUANTITY FOR DEALER WISE');
          setTimeout(() => {
              this.loader =false;
          }, 1000);
        })

    }

}
