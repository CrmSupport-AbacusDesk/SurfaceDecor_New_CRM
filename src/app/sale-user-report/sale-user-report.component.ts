import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { filter, retry, toArray } from 'rxjs/operators';
import { DatabaseService } from 'src/_services/DatabaseService';
import { PearlService } from 'src/app/pearl.service';
import { from } from 'rxjs';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

// import * as htmlToImage from 'html-to-image';
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

@Component({
  selector: 'app-sale-user-report',
  templateUrl: './sale-user-report.component.html',
  styleUrls: ['./sale-user-report.component.scss']
})
export class SaleUserReportComponent implements OnInit {
  ReportIncentiveList: any = [];
  ReportIncentiveBrandList: any = [];
  skelton: any = new Array(10);
  loader: boolean = false;
  list_count: any = 0;
  search_val: any = {};
  calculationArray: any = [];
  total_page: any = 0
  pagenumber: any = 0
  start: any = 0
  category_list: any = [];
  brand;
  search:any={};
  tmp_category: any = [];
  category;
  tmp_subcategory: any = [];
  rowTotalQty: any;
  rowTotalPoint: any;
  download_User_Report_excel_data: any = []
  new_array: any = [];
  excel_data: any = [];
  page_limit: any = 50;

  ReportIncentiveBrandList2: any = [];

  @ViewChild('table') table: ElementRef;

  constructor(public serve: PearlService) {
    this.search_val.active_tab = 'Market';
    this.getReportIncentive();
    // this.getCategoryList();
  }

  ngOnInit() {
  }

  refresh() {
    // this.search_val = {};
    this.start = 0
    this.search_val = {
      active_tab: 'Market',
      'start': this.start,
      'pagelimit': this.page_limit
    };
    this.ReportIncentiveList = []
    this.getReportIncentive();
  }
  getCategoryList() {
    this.serve.fetchData(0, "Product/product_category_list").subscribe((result) => {
      this.category_list = result['category'];
      this.tmp_category = this.category_list;
      console.log(this.tmp_category);

    });
  }

  category_array_filter(data, array) {
    this.category_list = this.filterList(data.toUpperCase(), array);
  }
  filterList(search_word, search_array) {
    this.new_array = [];
    console.log(search_array);
    console.log(search_word);
    for (var i = 0; i < search_array.length; i++) {
      if (search_array[i].category.toUpperCase().search(search_word) !== -1) {
        this.new_array.push(search_array[i]);
      }
    }
    return this.new_array;
  }

  getReportIncentive() {
    this.loader = true;
    this.ReportIncentiveList = [];
    this.search_val = {
      active_tab: this.search_val.active_tab,
      start: this.start,
      pagelimit: this.page_limit
    };
    this.serve.fetchData({ 'search': this.search_val, 'searchData':this.search  }, 'User/userPointMaster').pipe(
      retry(3)
    ).subscribe((res) => {
      console.log(res);
      this.loader = false;
      this.ReportIncentiveList = res['userData'];
      // this.calculationArray = res['userData']['brandData'];
      // console.log(this.calculationArray);

      // this.ReportIncentiveList = this.ReportIncentiveBrandList.concat(res['userData']);
      this.ReportIncentiveBrandList = res['BrandList'];
      this.ReportIncentiveBrandList2 = res['BrandList'];
      this.list_count = res['list_count'];

      this.total_page = Math.ceil(this.list_count / this.page_limit);
      this.pagenumber = Math.ceil(this.start / this.page_limit) + 1;
    }, err => {
      this.loader = false;
    })
  }

  filterSaleTotalQtyAndPointData() {
    const totalArray = from(this.calculationArray);
    console.log(totalArray);
    totalArray.pipe(filter((data: any) => data), toArray()).subscribe((res) => {
      console.log(res);

    })


  }


  filterBrandData(brand_name) {
    const totalBrand = from(this.ReportIncentiveBrandList2);
    console.log(totalBrand);
    totalBrand.pipe(filter((data: any) => data.brand_name.toUpperCase() == brand_name.toUpperCase()), toArray()).subscribe((res) => {
      console.log(res);
      this.ReportIncentiveBrandList2 = res;
      console.log(this.ReportIncentiveBrandList2);
      if (this.ReportIncentiveBrandList2.length > 0) {
        return this.ReportIncentiveBrandList = this.ReportIncentiveBrandList2
      }
      else {
        return this.ReportIncentiveBrandList;
      }
    })


  }

  tempSearch: any = '';

  filterBrandListData(brand_name) {
    brand_name = brand_name.toUpperCase();
    this.tempSearch = '';
    this.ReportIncentiveBrandList = [];
    for (let i = 0; i < this.ReportIncentiveBrandList2.length; i++) {
      this.tempSearch = this.ReportIncentiveBrandList2[i].brand_name.toUpperCase();

      if (this.tempSearch.search(brand_name)) {
        this.ReportIncentiveBrandList.push(this.ReportIncentiveBrandList2[i]);
      }

    }


  }

  onBetweenDate(event, tab) {
    console.log(event);
    console.log(tab);
    if (tab == 'date_from') {
      this.search_val.date_from = moment(event.value).format('YYYY-MM-DD');
    }
    if (tab == 'date_to') {
      this.search_val.date_to = moment(event.value).format('YYYY-MM-DD');

    }
  }

  exportAsXLSX() {
    console.log("download_excel method calls");
    this.excel_data = [];
    this.loader = true;
    this.serve.fetchData({ 'search': this.search_val }, 'User/userPointMaster').subscribe((result => {
      console.log(result);
      this.loader = false;
      this.download_User_Report_excel_data = result['userData'];
      console.log(this.download_User_Report_excel_data);

      // for (let i = 0; i < this.download_User_Report_excel_data.length; i++) {

      //   let keys_value: any = [];
      //   keys_value = Object.keys(this.download_User_Report_excel_data[i])

      //   let excel_object: any = {}

      //   for (let secondary_index = 0; secondary_index < keys_value.length; secondary_index++) {
      //     excel_object[keys_value[secondary_index]] = this.download_User_Report_excel_data[i][keys_value[secondary_index]]
      //   }

      //   this.excel_data.push(excel_object)

      // }
      for (let x = 0; x < this.ReportIncentiveList.length; x++) {

        let brandlist = this.ReportIncentiveList[x]['brandData'];

        for (let y = 0; y < brandlist.length; y++) {
          this.excel_data.push({
            'Name': this.ReportIncentiveList[x].name,
            'Total Qty': this.ReportIncentiveList[x].total_qty,
            'BIRTHDAY POINT': this.ReportIncentiveList[x].birthday_point,
            'WORK EFFICIENCY POINT': this.ReportIncentiveList[x].work_effeciency_point,
            'ANNIVERSARY POINT': this.ReportIncentiveList[x].aniversary_points,
            'Total Points': this.ReportIncentiveList[x].total_points,
            'ART LAM 1.00MM':`'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'BELAVISTA 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'COLORISTA 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'CONCEPT 1.00MM':`'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'CONCEPT COLOURS 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'CRAFTLAM 1.00MM':`'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'CRAFTWOOD': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'DECO LAM 0.90MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'DUNHILL TREND 1.00MM':`'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'FABRIC COLLECTION': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'FABRIC SLIMLAM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'FOLDER': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'GOLD MICA 0.90': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'HALLMARK 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'HALLMARK PRO 0.85MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'HOME STYLE': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'IMPERIO 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'LAYERS': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'LINER': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'MICA LAM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'MIX LINER': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'OTHERS': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SELECTION 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SIZZLER PLUS 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SLIM LAM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SLIM LAM COLOURS': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SLIM LAM FABRIC': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'STAR MICA0.85MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'STONEMART 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SURFACE ACRYLIC': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SURFACE ADHESIVE': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SURFACE CORE 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SURFACE EDGE BEND': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SURFACE FABRIC': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SURFACE GLAMOUROUS': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SURFACE LOUVERS': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SURFACE PROJECT 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SURFACE TXTR 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'SURFACE UNI FAB 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'TIS': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            'ZERO GRAVITY 1.00MM': `'Incentive Points': ${brandlist[y].incentivePoints},'Qty':${brandlist[y].total_qty},`,
            // 'Incentive Points': brandlist[y].incentivePoints,
            // 'Qty': brandlist[y].total_qty,
          })
        }

      }





      console.log(this.excel_data);
      this.serve.exportAsExcelFile(this.excel_data, 'USER REPORT SHEET');
      setTimeout(() => {

      }, 700);
    }), err => {
      this.loader = false;

    });

  }

  ExportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'User Report Sheet.xlsx');

  }


  // downloadExcel(date,product_id)
  // {

  //   let data = {'warehouse_id':this.apiHit.serviceWarehouse_id,'date':date,'product_id':product_id}

  //   this.apiHit.PostRequest(data, "Stock/downloadBarcodeExcel").subscribe((result => {

  //     setTimeout(() => {

  //       window.open(this.apiHit.downloadURL + "uploads/barcodeData.csv");

  //      }, 700);

  //   }));
  // }

  exportAsPDF(div_id) {
    let data = document.getElementById(div_id);
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')

      // let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      // pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      // pdf.save('Filename.pdf');
    });
  }


  printPdf(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    window.close();

    document.body.innerHTML = originalContents;
    // this.router.navigate(['coupon-code-list'])
  }
  printPdf2(divName) {
    var divContents = document.getElementById(divName).innerHTML;
    var a = window.open('', '', `height=700, width:500`);
    a.document.write('<html>');
    a.document.write('<body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
  }

  // exportPDF(div_id) {
  //   this.loading_list = true;
  //   this.showDivpdf = true;
  //   this.imgFile = []

  //   var imgWidth = 0;
  //   var pageHeight = 0;
  //   var imgHeight = 0;
  //   var heightLeft = 0;
  //   var position = 0;
  //   let pdf = null;
  //   let coponId = this.getData.id;
  //   var element: HTMLElement = null;

  //   setTimeout(() => {

  //     if (this.showDivpdf == true) {
  //       element = document.getElementById(div_id);

  //       htmlToImage.toPng(element).then(function (dataUrl) {

  //         console.log(dataUrl);

  //         const imgFile = dataUrl;

  //         imgWidth = 200;
  //         pageHeight = 295;
  //         imgHeight = element.offsetHeight * imgWidth / element.offsetWidth;
  //         heightLeft = imgHeight;

  //         pdf = new jspdf('p', 'mm');
  //         position = 5;
  //         console.log('image width 1 ' + imgWidth)
  //         console.log('image imgHeight 1 ' + imgHeight)

  //         pdf.addImage(imgFile, 'PNG', 5, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;

  //         while (heightLeft >= 0) {

  //           position = heightLeft - imgHeight + 5;

  //           pdf.addPage();
  //           pdf.addImage(imgFile, 'PNG', 5, position, imgWidth, imgHeight);
  //           heightLeft -= pageHeight;
  //         }

  //         pdf.save(`Coupon${coponId}.pdf`);
  //       });


  //     }
  //     this.loading_list = false;

  //   }, 1000);

  //   setTimeout(() => {
  //     this.loading_list = false;


  //   }, 5000);


  // }

}
