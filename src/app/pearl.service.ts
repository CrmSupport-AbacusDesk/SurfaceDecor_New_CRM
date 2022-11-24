import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import  * as FileSaver from 'file-saver';
import  * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
  providedIn: 'root'
})
export class PearlService {


  header:any=new HttpHeaders();
  data:any;
  myProduct:any={};
  peraluser:any={};
  tmp;
  detail:any={};

  orderFilterPrimary:any={}
  orderFilterSecondary:any={}
  dealerListSearch:any={}
  directDealerListSearch:any={}
  distributorListSearch:any={};
  billingListSearch:any={};
  popngiftListSearch:any={};
  orderListSearch:any={};
  expenseListSearch:any={};
  complainListSearch:any={};

  plumberListSearch:any={};
  announcementListSearch:any={};
  productListSearch:any={};
  productStart:any=0;
  saleListSearch:any={};
  enquiryListSearch:any={};

  popngiftmasterListSearch:any={};





  distributor_detail_primary_selected_tab:any=''
  distributor_detail_secondary_selected_tab:any=''

  navigationCount:any;


  // Live Links




  // Cpanel Server live Link :-
  // myurl="https://apps.abacusdesk.com/surfacedekor/crm/";
  // myimgurl="https://apps.abacusdesk.com/surfacedekor/";
  // myimgurl2="https://apps.abacusdesk.com/surfacedekor/";
  // dbUrl="https://apps.abacusdesk.com/surfacedekor/crm/api/index.php/";
  // product_image_url = "https://apps.abacusdesk.com/surfacedekor/crm/api/uploads/Products/";
  // sub_dealer = "https://apps.abacusdesk.com/surfacedekor/crm/api/uploads/sub_dealer/";
  // billing_image_url = "https://apps.abacusdesk.com/surfacedekor/crm/api/uploads/invoice_deliveryDoc/";
  // new_product_image_url_for_pop_master="https://apps.abacusdesk.com/surfacedekor/crm/api/uploads/Popgift/"
  // pdf_url="https://apps.abacusdesk.com/surfacedekor/crm/api/uploads/bill_pdf/"
  // pdf_url2="https://apps.abacusdesk.com/surfacedekor/crm/api/uploads/"
  

  // new test link 
  myurl="https://devcrm.abacusdesk.com/surfacedekortest/crm/";
  myimgurl="https://devcrm.abacusdesk.com/surfacedekortest/";
  myimgurl2="https://devcrm.abacusdesk.com/surfacedekortest/";
  dbUrl="https://devcrm.abacusdesk.com/surfacedekortest/crm/api/index.php/";
  product_image_url = "https://devcrm.abacusdesk.com/surfacedekortest/crm/api/uploads/Products/";
  sub_dealer = "https://devcrm.abacusdesk.com/surfacedekortest/crm/api/uploads/sub_dealer/";
  billing_image_url = "https://devcrm.abacusdesk.com/surfacedekortest/crm/api/uploads/invoice_deliveryDoc/";
  new_product_image_url_for_pop_master="https://devcrm.abacusdesk.com/surfacedekortest/crm/api/uploads/Popgift/"
  pdf_url="https://devcrm.abacusdesk.com/surfacedekortest/crm/api/uploads/bill_pdf/"
  pdf_url2="https://devcrm.abacusdesk.com/surfacedekortest/crm/api/uploads/"


  constructor(public http:HttpClient) {

    // this.fetchCounterAPI();

    console.log("Pearl Services Constructor Called: ")

  }

  can_active:any="";
  LogInCheck(username,password)
  {
    this.data={username,password};
    return this.http.post(this.dbUrl+"/login/submitnew/",JSON.stringify(this.data),{ headers:this.header });

  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }



  fetchData(data:any,fn:any)
  {
    this.header.append('Content-Type','application/json');
    console.log(this.dbUrl+fn);
    this.fetchCounterAPI();
    return this.http.post(this.dbUrl+fn,JSON.stringify(data),{ headers:this.header })
  }
  upload_image(val,fn_name)
  {
    console.log(val);
    return this.http.post(this.dbUrl+fn_name, val, { headers:this.header});

  }
  FileData(request_data:any, fn:any)
  {
    this.header.append('Content-Type',undefined);
    console.log(request_data);
    this.fetchCounterAPI();
    return this.http.post( this.dbUrl+fn, request_data, {headers : this.header});
  }

  fetchCounterAPI()
  {
    this.data={};

    this.http.post(this.dbUrl+"Attendance/count_data",JSON.stringify(this.data),{ headers:this.header }).subscribe((result => {
        console.log("count data result",result);
        this.navigationCount = result;
        console.log("Service Counter In Service File: ",this.navigationCount);

      }));

  }






}
