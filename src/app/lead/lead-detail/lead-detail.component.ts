import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { ActivatedRoute , Router } from '@angular/router';
import { PearlService } from 'src/app/pearl.service';
import { MatDialog } from '@angular/material';
import { EditleadComponent } from 'src/app/editlead/editlead.component';
import { DialogComponent } from 'src/app/dialog.component';
import {PopupComponent} from '../../popup/popup.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LocalStorage } from 'src/app/localstorage.service';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  animations: [slideToTop()]
})
export class LeadDetailComponent implements OnInit {
  public static all_distributors:any = [];
  public static lead_id: any;
  assign_user: any={};
  login_data:any={}
  constructor( public matDialog: MatDialog,public toast:ToastrManager, public session: LocalStorage, public route: ActivatedRoute, public serve: PearlService, public router: Router , public dialog: MatDialog, public alert: DialogComponent) {
    
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value.data;
    console.log(this.login_data.id);
    
    
    this.route.params.subscribe( params => {
      console.log(params);
      this.lead_id = params.id;
      console.log(this.lead_id);
      
    });
    this.leadDetail();
    
    this.salesUserLIst();
  }
  
  asmList: any = [];
  assignUserList: any = [];
  assignUser: any = [];
  
  lead_id: any;
  active: any = {};
  
  lead_detail: any = [];
  lead_detail1: any = [];
  sales_executive_update: any;
  loader: any;
  search: any = {};
  tmpsearch: any = {};
  tmp_userList: any = [];
  rsm: any = [];
  ass_user: any = [];
  showPortal: any;
  
  
  all_distributor: any = [];
  
  ngOnInit() {
    
    this.route.params.subscribe(params => {
      console.log(params);
      this.lead_detail.sales_primary_id = params.id;
    });
    
  }
  toggleterritory(key, action) {
    console.log(action);
    console.log(key);
    
    if (action == 'open') { this.active[key] = true; }
    if (action == 'close') { this.active[key] = false; }
    
    console.log(this.active);
    this.salesUserLIst();
    
  }
  
  leadDetail() {
    this.loader = 1;
    
    this.serve.fetchData({'id': this.lead_id}, 'Distributors/distributor_detail').subscribe((result => {
      console.log(result);
      this.lead_detail = result['distributor_detail']['result'];
      this.assignUserList = result['distributor_detail']['result']['assign_user'];
      console.log(this.assignUserList);
      setTimeout (() => {
        this.loader = '';
        
      }, 700);
    }));
  }
  
  
  
  
  
  
  
  
  
  
  getItemsList(search) {
    console.log(search);
    
    this.asmList = [];
    for (let i = 0; i < this.tmp_userList.length; i++) {
      search = search.toLowerCase();
      this.tmpsearch = this.tmp_userList[i]['name'].toLowerCase();
      if (this.tmpsearch.includes(search)) {
        this.asmList.push(this.tmp_userList[i]);
      }
    }
    console.log(this.asmList);
    
  }
  salesUserLIst() {
    this.serve.fetchData({'state':0}, 'User/sales_user_list').subscribe((result => {
      console.log(result);
      this.asmList = result['sales_user_list'];
      this.tmp_userList = this.asmList;
      console.log(this.assignUserList);
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      console.log(this.assignUserList);
      
      
      
      
      for (let i = 0; i < this.asmList.length; i++) {
        console.log('in');
        console.log(this.assignUserList);
        
        for (let j = 0; j < this.assignUserList.length; j++) {
          console.log('in2');
          
          if (this.asmList[i].id == this.assignUserList[j]['sales_executive']) {
            console.log('in23');
            
            this.asmList[i].check = true;
            this.rsm.push(this.asmList[i].id);
            console.log(this.rsm);
            
          }
          console.log(this.rsm);
          this.ass_user =  this.rsm;
          
          
        }
        
      }
      console.log(this.assignUser);
    }));
    
    
  }
  editDilog(value, type) {
    console.log('hello');
    
    const dialogRef = this.dialog.open(EditleadComponent, {
      width: '350px',
      data: {
        value,
        type,
        id: this.lead_id
      }});
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        console.log('The dialog was closed');
        this.leadDetail();
        
        
      });
    }
    
    editAddress(country, state, district, city, pincode, address, type) {
      console.log(country, state, district, city, pincode, address, type);
      console.log('hello');
      
      const dialogRef = this.dialog.open(EditleadComponent, {
        width: '750px',
        data: {
          country,
          state,
          district,
          city,
          pincode,
          address,
          type,
          id: this.lead_id
        }});
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          console.log('The dialog was closed');
          
          this.leadDetail();
          
          
          
        });
      }
      
      editContact(id, type) {
        console.log(id, type);
        
        const dialogRef = this.dialog.open(EditleadComponent, {
          width: '750px',
          data: {
            type,
            id
          }});
          dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            console.log('The dialog was closed');
            this.leadDetail();
            
            
          });
        }
        
        addContact(id, type) {
          const dialogRef = this.dialog.open(EditleadComponent, {
            width: '750px',
            data: {
              type,
              id
            }});
            dialogRef.afterClosed().subscribe(result => {
              console.log(result);
              console.log('The dialog was closed');
              
              
              
            });
          }
          
          deleteContact() {
            this.alert.delete('Lead Data !').then((result) => {
              if (result) {
                console.log('success');
                
                
                
                
                
                
                
                
                
              }
            });
          }
          confirm_lead(id) {
            this.alert.confirm('').then((result) => {
              if (result) {
                
                this.serve.fetchData(id, 'Distributors/confirm_lead').subscribe((result => {
                  console.log(result);
                  if (this.lead_detail.type == 1) {
                    this.router.navigate(['lead-list']);
                  } else {
                    this.router.navigate(['dealer-lead-list']);
                    
                  }
                }));
              }});
            }
            update_assigned_sales_executive(sales_executive) {
              this.sales_executive_update = sales_executive;
              
            }
            update_assigned_executive(exec_id) {
              console.log(this.lead_id);
              console.log(this.ass_user);
              console.log(this.rsm);
              
              this.serve.fetchData({exec: this.ass_user, dr_id: this.lead_id}, 'Distributors/update_assigned_sales_executive').subscribe((result => {
                
                
                this.leadDetail();
                
                
              }));
              this.sales_executive_update = '';
              
            }
            product_Brand(value, index, event) {
              console.log(event);
              console.log(value);
              console.log(index);
              console.log(this.asmList);
              
              
              
              if (event.checked) {
                if (this.rsm.indexOf(this.asmList[index]['id']) === -1) {
                  
                  this.rsm.push(value);
                  console.log(this.rsm);
                }
              } else {
                for ( let j = 0; j < this.asmList.length; j++) {
                  if (this.asmList[index]['id'] == this.rsm[j]) {
                    this.rsm.splice(j, 1);
                  }
                }
                console.log(this.rsm);
              }
              this.ass_user =  this.rsm;
            }
            
            convert_lead(){
              console.log("convert_lead method calls");
              this.serve.fetchData({'lead_id': this.lead_id , 'lead_converted_by' : this.login_data.id},'Distributors/confirm_lead').subscribe((result => {
                console.log(result);
                this.toast.successToastr("Lead Converted Successfully");                
              }));
              
            }
            
          }
          