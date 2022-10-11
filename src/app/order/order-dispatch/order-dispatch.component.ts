import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PearlService } from 'src/app/pearl.service';

@Component({
    selector: 'app-order-dispatch',
    templateUrl: './order-dispatch.component.html',
})
export class OrderDispatchComponent implements OnInit {
    loader: any = 1;
    order_id: any = 0;
    disable: boolean = false;
    order_detail: any = [];
    order_item: any = [];
    dispatchStatusFlag: number = 0;
    status_flag: any;
    login:any={};

    constructor(@Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public serve: PearlService) {
        console.log(data);
        this.status_flag=this.data.data;
        this.order_id = data['order_id'];

        this.login= JSON.parse(sessionStorage.getItem('login'));
        console.log(this.login.data.id);


    }

    ngOnInit() {
        if(this.status_flag != 'Change Status from pop and gift'){
            this.orderDetail();
            this.select_all();
        }
        else if(this.status_flag == 'Change Status from pop and gift'){
            this.get_pop_order_detail()
        }
        else{

        }
    }

    orderDetail() {
        this.loader = 1;
        let id = { 'order_id': this.order_id }
        this.serve.fetchData(id, "Order/order_detail").subscribe((result => {
            console.log(result);
            this.order_detail = result['order_detail'];
            this.order_item = result['order_detail']['order_item'];
            this.order_detail.order_cgst = this.order_detail.order_gst / 2;
            this.order_detail.order_cgst = parseFloat(this.order_detail.order_cgst).toFixed(2);
            setTimeout(() => {
                this.loader = '';

            }, 700);
        }))
    }



    update_order() {




        this.disable = true;

        console.log(this.order_item);

        for (let i = 0; i < this.order_item.length; i++) {
            if ((parseInt(this.order_item[i]['dispatchQty'])) == (parseInt(this.order_item[i]['qty']))) {
                status='Dispatch';
            }
            else {
                this.dispatchStatusFlag = 1;
                status='PDispatch';
                break;
            }
        }

        console.log(this.dispatchStatusFlag);
        console.log(status);

        if(this.status_flag != 'Change Status from pop and gift'){
            this.serve.fetchData({ 'order_id': this.order_id, "data": this.order_item , 'Status':status,'action_by':this.login.data.id,'remark':this.data.reason}, "Order/dispatch_order2")
            .subscribe(resp => {
                console.log(resp);
                if (resp['dispatch_order'] == 'success') {
                    this.dialog.closeAll();
                }
            });
        }
        else if(this.status_flag == 'Change Status from pop and gift'){
            this.serve.fetchData({ 'order_id': this.order_id, "data": this.order_item , 'Status':status}, "Order/pop_order_dispatch_item")
            .subscribe(resp => {
                console.log(resp);
                if (resp['result'] == 'success') {
                    this.dialog.closeAll();
                }
            });
        }
        else{

        }

    }

    show_remark:boolean=false
    check_qty(indx, enterDispatchQty) {
        console.log(this.order_item[indx]);
        this.show_remark=false;
        if (this.order_item[indx]['dispatchQty'] == null) {
            this.order_item[indx]['dispatchQty'] = 0;
        }

        if (parseInt(this.order_item[indx]['dispatchQty']) > parseInt(this.order_item[indx]['pending_qty'])) {

            this.order_item[indx]['dispatchQty'] = parseInt(this.order_item[indx]['pending_qty']);
        }
        // if(parseInt(this.order_item[indx]['dispatchQty'])<parseInt(this.order_item[indx]['pending_qty'])){
        //     this.show_remark=true
        // }else{
        //     this.show_remark=false
        // }

        // console.log("order item data after enter qty : ",this.order_item);

        // if(parseInt(this.order_item[indx]['dispatchQty'])<parseInt(this.order_item[indx]['pending_qty'])){
        //   this.show_remark=true
        // }
        console.log("enter dispatch qty: ",enterDispatchQty);

        if(parseInt(enterDispatchQty)<parseInt(this.order_item[indx]['pending_qty'])){
          this.show_remark=true
        }

        console.log("After compare enter qty show Remark : ",this.show_remark);

        if(this.show_remark != true){

          console.log("Enter in Show Remark != true condition ", this.show_remark)

          for(let i = 0; i < this.order_item.length; i++){

            if(i == indx){

              console.log("Index Match loop index : "+i+" enter index : "+indx);

              continue;

            }else{

              if(this.order_item[i]['dispatchQty'] == null){
                this.order_item[i]['dispatchQty'] = 0;
              }

              if(parseInt(this.order_item[i]['dispatchQty'])<parseInt(this.order_item[i]['pending_qty'])){
              console.log("comparing loop conditions : Dispatch qty -> "+parseInt(this.order_item[i]['dispatchQty'])+" Pending Qty : "+parseInt(this.order_item[i]['pending_qty']));
                this.show_remark=true
                break;
              }

            }

          }

        }




    }

    select_all() {
        for (let i = 0; i < this.order_item.length; i++) {
            this.order_item[i]['dispatchQty'] = this.order_item[i]['pending_qty'];

        }



    }

    get_pop_order_detail(){
        console.log("get_pop_order_detail method calls");
        console.log( this.order_id);

        const id = {'order_id': this.order_id};
        this.loader = 1;
        this.serve.fetchData(id, 'Order/pop_master_order_detail').subscribe((result => {
            console.log(result);
            this.order_detail=result['pop_order_data'];
            this.order_item=result['pop_order_item'];
            console.log(this.order_item);
            setTimeout(() => {
                this.loader = '';

            }, 700);
        }))


    }


}
