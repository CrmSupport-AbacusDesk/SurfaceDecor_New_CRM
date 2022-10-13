import { Component, OnInit, Renderer2 } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PearlService } from 'src/app/pearl.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material';
import { DistributionEditComponent } from '../distribution-edit/distribution-edit.component';
import { LocalStorage } from 'src/app/localstorage.service';
import { DialogComponent } from 'src/app/dialog.component';
import * as moment from 'moment';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { Location } from '@angular/common'
import { StatusModalComponent } from 'src/app/order/status-modal/status-modal.component';
import { BillingdocumentComponent } from 'src/app/billingdocument/billingdocument.component';
import { AddSubDealerModalComponent } from 'src/app/add-sub-dealer-modal/add-sub-dealer-modal.component';



@Component({
    selector: 'app-distribution-detail',
    templateUrl: './distribution-detail.component.html',
    animations: [slideToTop()]

})
export class DistributionDetailComponent implements OnInit {

    area_target_list: any = {};
    public lineChartLabels: Label = [];
    public lineChartData: ChartDataSets[] = [];
    public lineChartType: ChartType = 'line';
    public lineChartLegend = true;
    brand_list1: any = [];
    skelton: any = new Array(10);
    temp_order: any = [];
    brand_list: any = [];
    dr_id: any = '';
    dr_detail: any;
    asmList: any = [];
    assignUserList: any = [];
    assignDelaerList: any = [];
    assignUser: any = [];
    assignUserId: any = [];
    userDiscountList = [];
    active: any = {};
    loader: any;
    subDealerList:any=[];
    today = new Date();
    opening_bal:any='';
    order_data: any = [];
    login_data: any = {};
    primary_ord_data: any = [];
    order_type: any = 0;
    ledger_data: any = [];
    assignedDealers: any = [];
    paymentReturnArray:any=[];
    orderTabActive: any = {
        'active': 'Pending',
    };
    count: any = [];
    orderdata: any = [];
    dashboardCounts: any = {};
    today_date: any;
    search_val: any = {};
    temp_disc: any = {};
    temp_checkin: any = {};
    deal_list: any = [];
    assign_brand: any = [];
    totalOrders: any = {};
    orderTabCounters: any = {};
    dealersCount: any;
    tmp_userList: any = [];
    search: any = {};
    tmpsearch: any = {};
    data: any = {};
    search2: any = {};
    tmpsearch2: any = {};
    sales_executive_update: any;
    sub_dealer_update: any;
    brands_update:any;
    temp_dis: any;
    disc_edit: any = false;
    list: any = {};
    view_tab: any = 'profile';
    view_order: any = 'primary';
    search3: any = {};
    tmpsearch3: any = {};
    search4: any = {};
    search5: any = {};
    search6:any ={};
    search7:any ={};
    search8:any ={};
    tmpsearch4: any = {};
    tmpsearch5: any = {};
    tmpsearch6: any = {};
    rsm: any = [];
    ass_user: any = [];
    primary_sale: any = [];
    assign_dealer: any = [];
    brand1: any = [];
    assignedExecutives: any = [];
    assign_area_list: any;
    dr_detail1: any = [];
    previous_data_list: any = [];
    login: any = {};
    dealers_filter: any = {};
    brands_list: any = [];
    dr_brand_list: any = []
    show_status: boolean = false;
    check_value:boolean=false;
    overall_total_sum: any = {};
    overall_total_payment_amount: any = '0';
    paymentReturnObject:any={};
    companyListArray:any=[]
    ledgerArrayList:any=[];
    billingTabActive: any = {
        active: 'Billing',
    };
    ledgerActivetab:any={
        active:'Credit'
    };

    billing_list: any = [];
    payment_list: any = [];
    limit_vs_outstanding_vs_overdue_data: any = {};
    outstanding_and_overdue_days_interval: any = [];
    total_debit:any=0;
    total_credit:any=0;
    total_closing:any=0;
    all_brands_list: any = [];

    // Pie Chart Code
    // Pie
    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'top',
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return label;
                },
            },
        }
    };
    public pieChartLabels: Label[] = [];
    public pieChartData: number[] = [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartColors = [
        {
            backgroundColor: ['rgba(242, 192, 16, 0.9)', 'rgba(231, 64, 51, 0.9)'],
        },
    ];

    contact_person_info: any = []
    constructor(public route: ActivatedRoute, public location: Location, public rout: Router, public toast: ToastrManager, public serve: PearlService, public alert: DialogComponent, public dialog: MatDialog, public session: LocalStorage, public renderer: Renderer2, public alrt: DialogComponent,public popup_dialog: MatDialog) {


        this.login_data = this.session.getSession();
        this.login_data = this.login_data.value;
        this.login_data = this.login_data.data;
        console.log(this.login_data);

        this.route.params.subscribe(params => {
            console.log(params);
            this.dr_id = params.id;
            console.log(this.dr_id);

            this.serve.distributor_detail_primary_selected_tab != '' ? this.view_tab = this.serve.distributor_detail_primary_selected_tab : this.serve.distributor_detail_primary_selected_tab = this.view_tab;
            this.serve.distributor_detail_secondary_selected_tab != '' ? this.orderTabActive.active = this.serve.distributor_detail_secondary_selected_tab : this.serve.distributor_detail_secondary_selected_tab = this.orderTabActive.active;
            this.serve.distributor_detail_primary_selected_tab != '' ? this.getOrders(this.view_tab, this.orderTabActive.active) : '';

        });

        this.retailerDetail();
        this.today_date = moment(new Date()).format('MMM - Y');

        this.session.getSession()
            .subscribe(resp => {
                console.log(resp);
                this.login_data = resp.data;
                console.log(this.login_data);

                if (this.login_data.type == '1' && this.login_data.lead_type == 'Dr') {
                    this.renderer.addClass(document.body, 'chanel-patner');
                } else {
                    this.renderer.removeClass(document.body, 'chanel-patner');
                }
            });

        this.get_primary_ord();
        this.limit_vs_outstanding_vs_overdue_method();
        this.outstanding_and_overdue_days_interval_method();
    }

    ngOnInit() {

        this.login = JSON.parse(sessionStorage.getItem('login'));
        console.log(this.login.data.id);
        this.get_brand_list();
    }

    toggleterritory(key, action) {
        console.log(action);
        console.log(key);

        if (action == 'open') { this.active[key] = true; }
        if (action == 'close') {
            this.active[key] = false;
        }

        console.log(this.active);
    }

    scrollHandler(eve) {
        console.log(eve);
        console.log('called');

    }


    verify() {
        this.serve.fetchData({ 'dr_id': this.dr_id }, 'Distributors/verify_dealer')
            .subscribe(resp => {
                console.log(resp);
                if (resp['verify_dealer'] == 1) {
                    this.toast.successToastr('Dealer Verified');
                }
                else if (resp['verify_dealer'] == 0) {
                    this.toast.successToastr('Dealer Unverified');
                }
                else {
                    this.toast.errorToastr("Something Went Wrong. Please Try Again");
                }
                this.retailerDetail();
            });
    }
    getOrders(type, status) {
        this.serve.distributor_detail_secondary_selected_tab = this.orderTabActive.active;
        console.log(this.search4);
        this.show_status = true;

        let orderType;
        if (type == 'pOrder') {
            orderType = 'Primary';
        } else {
            orderType = 'Secondary';
        }
        this.orderTabActive.active = status;
        this.loader = true;

        const data = { 'id': this.dr_id, 'type': orderType, 'status': status, 'search': this.search4 };
        this.serve.fetchData(data, 'Distributors/getOrders')
            .subscribe((result) => {
                console.log(result);
                this.order_data = result['data'];
                this.totalOrders = result['count'];
                this.orderTabCounters = result['tabCounters'];
                console.log(this.orderTabCounters);

                setTimeout(() => {
                    this.loader = false;

                }, 700);

            });
    }
    getOrdersSearch(action: any = '') {
        if (action == 'refresh') {
            this.loader = true;
            this.search4 = {};
            this.loader = false;
            this.getOrders(this.view_tab, this.orderTabActive.active);
        }
    }
    dr_brand_list_id: any = []
    retailerDetail() {
        this.loader = true;

        const id = { 'id': this.dr_id };
        this.serve.fetchData(id, 'Distributors/distributor_detail')
            .subscribe((result) => {
                console.log(result);
                this.dr_detail = result['distributor_detail']['result'];
                this.dr_brand_list = this.dr_detail['brand'];

                this.contact_person_info = result['distributor_detail']['dr_contact_list'];

                this.temp_order = this.order_data;
                this.assignUserList = result['distributor_detail']['result']['assign_user'];
                this.assignDelaerList = result['distributor_detail']['result']['assign_dealer'];
                this.subDealerList = result['distributor_detail']['result']['sub_dealers'];
                // this.assign_brand = result['distributor_detail']['result']['brand'];
                this.dealersCount = result['distributor_detail']['dealersCount'];
                this.assignUserId = this.assignUserList;
                this.temp_disc = this.dr_detail.discount_data;
                this.temp_checkin = this.dr_detail.checkin;
                console.log(this.dr_detail);
                this.salesUserLIst();

                console.log("Check Scheme Enabled ",this.dr_detail.pop_n_gift_scheme_enabled);

                if(this.dr_detail.pop_n_gift_scheme_enabled == 'YES'){
                  this.check_value = true;
                }else{
                  this.check_value = false;
                }

                setTimeout(() => {
                    this.loader = false;

                }, 700);

            });
    }
    imageModel(image){
        const dialogRef = this.popup_dialog.open( StatusModalComponent, {
          width: '500px',data:{
            image,
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          console.log('The dialog was closed');

        });

      }
    salesUserLIst() {
        this.serve.fetchData({ 'state': 0 }, 'User/active_sales_user_dr_assigned')
            .subscribe((result) => {
                console.log(result);
                this.asmList = result['sales_user_list'];
                this.tmp_userList = result['sales_user_list'];

                console.log(this.assignUser);

                for (let i = 0; i < this.asmList.length; i++) {
                    for (let j = 0; j < this.assignUserList.length; j++) {
                        if (this.asmList[i].id == this.assignUserList[j]['sales_executive']) {
                            this.asmList[i].check = true;
                            this.rsm.push(this.asmList[i].id);
                            console.log(this.rsm);

                        }
                    }

                }
                console.log(this.assignUser);
            });

    }


    getItemsList(search) {
        console.log(search);

        this.asmList = [];
        for (let i = 0; i < this.tmp_userList.length; i++) {
            search = search.toLowerCase();
            console.log(this.tmp_userList[i]['name']);

            this.tmpsearch = this.tmp_userList[i]['name'].toLowerCase();
            if (this.tmpsearch.includes(search)) {
                this.asmList.push(this.tmp_userList[i]);
            }
        }
        console.log(this.asmList);

    }

    editAddress(country, state, district, city, pincode, address, type, area) {
        console.log(country, state, district, city, pincode, address, type);
        console.log(this.dr_id);

        const dialogRef = this.dialog.open(DistributionEditComponent, {
            width: '768px',
            data: {
                country,
                state,
                district,
                city,
                pincode,
                address,
                type,
                area,
                id: this.dr_id
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            console.log('The dialog was closed');
            this.retailerDetail();


        });
    }

    edit_dr_detail(company_name, mobile, email, gst, landline, name, dob, doa, password, type, target, opening_balance, Whatsapp, username, pancard, group, collection_days, price_group, monthly_scheme_required, yearly_scheme_required, sales_ho) {
        const dialogRef = this.dialog.open(DistributionEditComponent, {
            width: '750px',
            data: {
                company_name,
                mobile,
                email,
                gst,
                landline,
                name,
                dob,
                doa,
                password,
                username,
                type,
                id: this.dr_id,
                target,
                opening_balance,
                ledger_length: this.ledger_data.length,
                Whatsapp,
                pancard,
                group,
                collection_days,
                price_group,
                monthly_scheme_required,
                yearly_scheme_required,
                sales_ho
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            console.log('The dialog was closed');
            this.retailerDetail();
        });
    }

    get_primary_ord() {
        this.loader = 1;
        this.serve.fetchData({ 'dr_id': this.dr_id }, 'Distributors/get_primary_ord')
            .subscribe((result) => {
                console.log(result);
                this.loader = '';
                if (result) {
                    this.primary_ord_data = result['get_primary_ord'];
                }
            });
    }
    update_assigned_brands(brands){
        this.brands_update =brands
    }

    update_assigned_sales_executive(sales_executive) {
        this.sales_executive_update = sales_executive;
    }
    update_assigned_executive(exec_id) {
        console.log(this.rsm);
        console.log(this.asmList);

        this.serve.fetchData({ 'exec': this.rsm, 'dr_id': this.dr_id }, 'Distributors/update_assigned_sales_executive')
            .subscribe((result => {
                console.log(result);
              
                this.asmList = this.tmp_userList;
                this.asmList.map((el) => { el.check = false; });

                if (this.rsm) {
                    for (let i = 0; i < this.rsm.length; i++) {
                        const index_val = this.asmList.map((el) => el.id).indexOf(this.rsm[i]);
                        console.log(index_val);

                        this.asmList[index_val].check = !this.asmList[index_val].check;
                    }
                }
                console.log(this.asmList);
                if(result['update_exec'].msg== 'success'){
                    this.toast.successToastr("Sales User Updated")
                }else{
                    this.toast.errorToastr("Somthing Went Wrong")
                }

                this.retailerDetail();
            }));
        this.sales_executive_update = '';
        this.rout.navigate(['/distribution-detail/' + this.dr_id]);

    }



    related_tabs(tab) {
        console.log(tab);
        this.view_tab = tab;
        this.serve.distributor_detail_primary_selected_tab = this.view_tab

    }

    getItemscheckin(search) {
        console.log(search);

        this.dr_detail.checkin = [];
        for (let i = 0; i < this.temp_checkin.length; i++) {
            search = search.toLowerCase();
            this.tmpsearch3 = this.temp_checkin[i]['exec_name'].toLowerCase();
            if (this.tmpsearch3.includes(search)) {
                this.dr_detail.checkin.push(this.temp_checkin[i]);
            }
        }
        console.log(this.dr_detail.checkin);

    }


    product_Brand(value, index, event,data) {
            console.log(data);
            
        console.log(this.rsm);
        console.log(this.asmList);

        if (event.checked) {
            if(data.name == "Select All"){
                for(let i=0; i<this.asmList.length; i++){
                    this.asmList[i].check = true;
                    this.rsm.push(this.asmList[i].id);
                    console.log(this.rsm);
                    
                }
            }

            if (this.rsm.indexOf(this.asmList[index]['id']) === -1) {
                this.rsm.push(value);
                console.log(this.rsm);
            }
        } else {
            if(data.name == "Select All"){
                for(let i=0; i<this.asmList.length; i++){
                    this.asmList[i].check = false;
                    this.rsm = [];
                    console.log(this.rsm);
                    
                }
            }

            for (let j = 0; j < this.asmList.length; j++) {
                if (this.asmList[index]['id'] == this.rsm[j]) {
                    this.rsm.splice(j, 2);
                }
            }
            console.log(this.rsm);
        }
        this.ass_user = this.rsm;
    }
    select_dealer(data, event) {
        console.log(this.assign_dealer);

        if (data.check) {
            this.assign_dealer.push(data);
        } else {
            const index = this.assign_dealer.findIndex(row => row.id == data.id);

            this.assign_dealer.splice(index, 1);
        }
        console.log(this.assign_dealer);
    }


    save_assign_dealer() {
        console.log(this.assign_dealer);
        this.loader = true;
        this.serve.fetchData({ 'dealer_list': this.assign_dealer, 'dr_id': this.dr_id }, 'Distributors/assign_dealer')
            .subscribe((result => {
                console.log(result);

                if (result['msg'] == 'success') {
                    this.active.dealer = false;
                    this.retailerDetail();

                    this.loader = false;
                    this.toast.successToastr('Retail Partners Updated');
                }
            }));
    }


    deleteOrder(id, i) {
        console.log(id);

        this.alrt.delete('Order Data').then((result) => {
            if (result) {
                this.serve.fetchData({ id }, 'order/directOrderdelete')
                    .subscribe((response) => {
                        if (response) {
                            this.primary_ord_data.splice(i, 1);
                            this.get_primary_ord();
                        }

                    });
            }

        });

    }


    count_data() {
        console.log('test');
        this.serve.fetchData({ id: this.dr_id }, 'Distributors/count_data_dr').subscribe((result => {
            console.log(result);
            this.dashboardCounts = result;
            console.log(this.dashboardCounts);



        }));
    }


    back(): void {
        console.log("location back method calls");
        console.log(this.location);
        this.location.back()
    }


    edit_billing_details(credit_limit, credit_period, credit_opening_balance, dr_code, display_billing_status) {

        console.log("edit_billing_details method calls");

        const dialogRef = this.dialog.open(StatusModalComponent, {
            width: '800px', data: {
                'credit_limit': credit_limit && credit_limit != '' ? credit_limit : '',
                'credit_period': credit_period && credit_period != '' ? credit_period : '',
                'credit_opening_balance': credit_opening_balance && credit_opening_balance != '' ? credit_opening_balance : '',
                'dr_code': dr_code && dr_code != '' ? dr_code : '--',
                'display_billing_status': display_billing_status,
                'dr_id': this.dr_id,
                'from': 'distributor_detail_page'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.retailerDetail();

        });


    }

    con_date(date){
    
        if( this.billingTabActive.active == 'Billing'){
        this.search7.bill_date = moment(date).format('YYYY-MM-DD');
        this.get_billing_list();
        }else{
           
        this.search7.payment_date = moment(date).format('YYYY-MM-DD');
        this.get_payment_list();
        }
        
        console.log(this.search7.payment_date);
        console.log(this.search7.bill_date);
        // this.billingTabActive.active = 'Billing' ? this.get_billing_list() : this.get_payment_list();
        
      }
    get_billing_list() {
        console.log("get_billing_list method calls");
        this.loader = true;
        this.billingTabActive.active = 'Billing';
        this.serve.fetchData({ 'dr_id': this.dr_id ,'search':this.search7}, "Tally_invoice_credit/dr_credit_billing_list").subscribe((result => {
            console.log(result);
            this.billing_list = result['billing_list'];
             this.overall_total_sum = result['overall_total_sum'];
             console.log(this.overall_total_sum);
             
            setTimeout(() => {
                this.loader = false;
            }, 1000);
        }))

    }

    get_payment_list() {
        console.log("get_payment_list method calls");
        this.loader = true;
        this.billingTabActive.active = 'Payment';
        this.serve.fetchData({ 'dr_id': this.dr_id , 'search':this.search7 }, "Tally_invoice_credit/dr_invoice_payment_listing").subscribe((result => {
            console.log(result);
            this.payment_list = result['list'];
             this.overall_total_payment_amount = result['overall_total_payment_amount'];
            setTimeout(() => {
                this.loader =false;
            }, 1000);
        }))

    }


    limit_vs_outstanding_vs_overdue_method() {
        console.log("limit_vs_outstanding_vs_overdue_data method calls");
        this.serve.fetchData({ 'dr_id': this.dr_id }, "Tally_invoice_credit/dr_credit_limit_vs_outstanding_vs_overdue_on_dashboard").subscribe((result => {
            console.log(result);
            this.limit_vs_outstanding_vs_overdue_data = result['dr_detail'];
        }))

    }

    outstanding_and_overdue_days_interval_method() {
        console.log("outstanding_and_overdue_days_interval_method method calls");
        this.serve.fetchData({ 'dr_id': this.dr_id }, "Tally_invoice_credit/outstanding_and_overdue_days_interval").subscribe((result => {
            console.log(result);
            this.outstanding_and_overdue_days_interval = result['previous_summary'];
            this.pieChartData = []
            this.pieChartLabels = []
            for (let index = 0; index < result['previous_summary'].length; index++) {
                this.pieChartData.push(parseInt(result['previous_summary'][index].value));
                this.pieChartLabels.push((result['previous_summary'][index].days + ' days'));
            }

        }))
    }



    check_brand(brands_id) {

        console.log(brands_id);


    }


    get_brand_list() {
        console.log("get_brand_list method calls");
        this.serve.fetchData({}, 'Brand_list/brand_list').subscribe((result) => {
            console.log(result);
            this.all_brands_list = result['brand_list'];

            for (let i = 0; i < this.all_brands_list.length; i++) {


                for (let j = 0; j < this.dr_brand_list.length; j++) {


                    if (this.all_brands_list[i].id == this.dr_brand_list[j].id) {
                        console.log("works if condition in get brand list")
                        this.all_brands_list[i].checks = true;
                        this.checks.push(this.all_brands_list[i].id);
                        console.log(this.checks);

                    }
                }

            }
        });

    }

    update_brands(brand_id) {
        console.log("brand_id = " + brand_id);
        this.loader = true;
        this.serve.fetchData({ "brand_id": this.checks, 'dr_id': this.dr_id, 'assign_by': this.login_data.id }, 'Distributors/assign_brand_to_dr').subscribe((result) => {
            console.log(result);
            if(result['msg'] == 'Success to Assign'){
                this.retailerDetail();
                this.toast.successToastr("Brands Updated !!");
            }
            else{
                this.toast.errorToastr("Something went wrong")
            }
        });
        this.loader = false;
        this.brands_update = 'false';
    }


    check_brands(brand_id) {
        console.log("check_brands method calls");
        // this.dr_brand_list_id = this.dr_brand_list['id'];
        // console.log("this dr brand list id", this.dr_brand_list_id);

        // let index = -1
        // let secondary_index = -1


        // index = this.dr_detail['brand'].findIndex(row => row.brand == brand_id)
        // secondary_index = this.dr_brand_list.findIndex(row => row.brand == brand_id)

        // secondary_index >= 0 ? this.dr_brand_list.splice(secondary_index,1)  : '';
        // return index>= 0 ? true : false+


    }



    add_multiple_contacts() {

        console.log("add_multiple_contacts method calls");


        const dialogRef = this.dialog.open(StatusModalComponent, {
            width: '750px',
            data: {
                'from': 'distributor_detail_page',
                'purpose': 'add_multiple_contact',
                'di_id': this.dr_id,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            console.log('The dialog was closed');
            this.retailerDetail();
        });



    }


    delete_contact_person(contact_id) {
        this.alert.delete('Contact Data !').then((result) => {
            if (result) {
                this.serve.fetchData({ "id": contact_id }, "Distributors/remove_dr_contact").subscribe((result) => {
                    console.log(result);
                    if (result['msg'] == 'Deleted Successfully') {
                        this.alert.success("Contact", "Delete");
                        this.retailerDetail();
                    }
                    else {
                        this.alert.error("Something Went Wrong");
                    }

                })
            }

        });
    }

    edit_contact_Details(contact_name, contact_no, contact_id) {

        console.log("edit_contact_Details method calls");

        const dialogRef = this.dialog.open(StatusModalComponent, {
            width: '750px',
            data: {
                'from': 'distributor_detail_page',
                'purpose': 'edit_multiple_contact',
                'contact_id': contact_id,
                'contact_person': contact_name,
                'mobile': contact_no,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            console.log('The dialog was closed');
            this.retailerDetail();
        });



    }

    // aamir change 22-feb-2022 start here
    go_to(id, type) {
        this.rout.navigate(['/invoice-billing-detail/' + id], { queryParams: { id, type } });
    }

    // aamir changes 22-feb-2022 end here
    //aamir changes 25-feb-2022
    checks: any = []
    show: any;

    select_social_lead_method(lead) {
        console.log(lead.checks);
        console.log(lead);
        
        if (lead.checks == true) {
            if(lead.brand_name == 'Select All'){
                console.log("inside select all");
                for(let i=0; i<this.all_brands_list.length; i++){
                    this.all_brands_list[i].checks = true;
                    this.checks.push(this.all_brands_list[i].id);
                    console.log(this.checks);
                    
                }
            }
            this.checks.push(lead.id);
            console.log(this.checks);
            this.show = lead.checks
            console.log(this.show);

        }
        else {
            if(lead.brand_name == 'Select All'){
                console.log("inside select all");
                for(let i=0; i<this.all_brands_list.length; i++){
                    this.all_brands_list[i].checks = false;
                    this.checks = [];
                    console.log(this.checks);
                    
                }
            }

            for (var j = this.checks.length - 1; j >= 0; j--) {
                if (lead.id == this.checks[j]) {
                    console.log("works properly",this.checks.length - 1)
                    this.checks.splice(j, 1);
                }
            }
            console.log(this.checks);
        }
    }

    openDialog(complain_id,where_to): void {

          const dialogRef = this.dialog.open(StatusModalComponent, {
            width: '600px', data: {
              'from' : 'complain_list',
              'complain_id' : complain_id,
              'where_to':where_to
            }
          });

      }


      schemeEnabledCheck(ob) {

        console.log("PQR checked: " + ob.checked);

        this.alert.enabledScheme('To Enable Scheme').then((result) => {

          console.log("PQR checked: " + ob.checked);

          this.serve.fetchData({ "pop_n_gift_schemeEnabled": ob.checked, 'dr_id': this.dr_id, 'assign_by': this.login_data.id }, 'Enquiry/pop_scheme_enable').subscribe((result) => {
            console.log(result);
            if(result['msg'] == true){
                this.retailerDetail();
                this.toast.successToastr("Scheme Updated Successfully !!");
            }
            else{
                this.toast.errorToastr("Something went wrong")
            }
          });

        });

      }

      show_bill(){
          const dialogRef = this.dialog.open(StatusModalComponent , {
              width:'600px',
              data:{
                  from : 'old_bill_distribution_page',
                  dr_id : this.dr_id
              }
          });
          dialogRef.afterClosed().subscribe(res =>{
              console.log(res);
              
          })
      }

      show_outstanding(){
        const dialogRef =this.dialog.open(StatusModalComponent , {
            width:'600px',
            data:{
                from : 'out_standing_distribution_page',
                dr_id : this.dr_id
            }
        });
        dialogRef.afterClosed().subscribe((res)=>{
            console.log(res);
            
        })
      }

        getPaymentReturn(){
            console.log("payment return api called");
            this.loader=true;
                this.serve.fetchData({'dr_id': this.dr_id , 'search':this.search7 },'Tally_invoice_credit/dr_invoice_payment_return_listing').subscribe((resp)=>{
                    console.log(resp);
                    this.paymentReturnArray=resp['list'];
                    this.paymentReturnObject.overall_total_payment_amount=resp['overall_total_payment_amount'];
                    setTimeout(() => {
                        this.loader=false;
                    }, 1000);
                })
        }

        con_date2(event){
            console.log(event.value);
                this.search7.payment_date=moment(event.value).format('YYYY-MM-DD');
                this.getPaymentReturn();
        }

            getcompanyList(){
                this.loader=true;
                this.serve.fetchData({},'Tally_invoice_credit/surface_company_list').subscribe((res)=>{
                    console.log(res);
                    this.companyListArray=res['company_list'];

                    setTimeout(() => {
                        this.loader=false;
                    }, 1000);
                })

                
            }

            getLedgerData(){

               

                if(this.search8.date_to){
                    this.search8.date_to=moment(this.search8.date_to).format('YYYY-MM-DD');
                   
                }
                if(this.search8.date_from){
                    this.search8.date_from=moment(this.search8.date_from).format('YYYY-MM-DD');
                }
                this.loader=true;
                this.serve.fetchData({'dr_id':this.dr_id,'filter':this.search8},'Tally_invoice_credit/dr_ledger_list').subscribe((res)=>{
                    console.log(res);
                    this.ledgerArrayList=res['account_list'];
                    this.opening_bal=res['opening_bal'];
                    this.total_debit=res['total_debit'];
                    this.total_credit=res['total_credit'];
                    this.total_closing=res['final_opening_balance'];
                    setTimeout(() => {
                        this.loader=false;
                    }, 1000);
                    
                })

            }

            downloadPdfledger(){
                if(this.search8.date_to){
                    this.search8.date_to=moment(this.search8.date_to).format('YYYY-MM-DD');
                   
                }
                if(this.search8.date_from){
                    this.search8.date_from=moment(this.search8.date_from).format('YYYY-MM-DD');
                }
                this.loader=true;
                this.serve.fetchData({'dr_id':this.dr_id,'filter':this.search8},'Tally_invoice_credit/ledger_pdf').subscribe((res)=>{
                    console.log(res);
                    if(res['status']=="Success"){
                        window.open(this.serve.pdf_url2+'test_pdf/ledger.pdf')
                    }
                    setTimeout(() => {
                            this.loader=false;
                    }, 1000);
                })

            }

            go_to_add_document(id){
                const dialogRef = this.dialog.open(BillingdocumentComponent, {
                  width: '500px',
                  data: {
                      id
                  }
              });
              dialogRef.afterClosed().subscribe(result => {
                  console.log(result);
                  console.log('The dialog was closed');
            
              });
              }
          

              openModelToAddSubDealer(){
                const dialogRef=this.dialog.open(AddSubDealerModalComponent,{
                    panelClass:'rightmodal',
                    data: {
                        dr_id:this.dr_id
                    }
                    
                });
                dialogRef.afterClosed().subscribe(result => {
                    console.log(result);
                    console.log('The dialog was closed');
                    this.retailerDetail();
                });
              }

             

              openDialog2(image){
                const dialogRef = this.dialog.open(StatusModalComponent,{
                  // width: '500px',
                  panelClass:'image-modal',
                    data:{
                      image,
                      from:"user target modal"
                    }
                  }
                  )
                  dialogRef.afterClosed().subscribe((result)=>{
                    console.log(result);
                    console.log("this dialog box is closed");
                  })
              }

}
