import { Event } from './../models/event.model';
import { EventWC } from './../models/eventWC.model';
import { GlobalVariables } from './../shared/GlobalVariables';
import { HttpParams, HttpClient } from '@angular/common/http';
import { EventPNC } from './../models/eventPNC.model';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as vabLogoFile from './vabLogo.js';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  // serverUrl = 'http://localhost:4000/';
  // serverUrl = 'http://duesbackend-env-1.b6qgyzs5az.us-east-2.elasticbeanstalk.com/';
  serverUrl = GlobalVariables.serverUrl;

  workbook = new Workbook();
  data = [];

  constructor(private http: HttpClient, private global: GlobalVariables) { }

  getStaffForEvent(eventID: number) {
    const params = new HttpParams().set('eventID', eventID.toString());
    const sendGateList = this.http.get(this.serverUrl + 'getStaffForEvent', {params})
    return sendGateList;
  }

  generatePncGateList(event: Event, staff: any) {
    const params = { event: event, staff: staff };
    const generateGateList = this.http.post(this.serverUrl + 'sendPncGateList', params);
    return generateGateList;

  }

  generateWcGateList(event: Event, staff: any) {
    const params = { event: event, staff: staff };
    const generateGateList = this.http.post(this.serverUrl + 'sendWcGateList', params);
    return generateGateList;

  }

  // generateGateList(event: EventPNC, email: boolean, download: boolean) {
  //   const params = new HttpParams().set('eventID', event.idevent.toString());
  //   const sendGateList = this.http.get(this.serverUrl + 'getStaffForEvent', {params})
  //   return sendGateList;
  // }

  // setData(results) {
  //   results.forEach(res => {
  //     this.data.push([
  //       res.Name,
  //       res.jobName,
  //       this.getTime(res.scheduledArrivalTime),
  //       this.getExperienced(res.pncExperienced),
  //       this.getExperienced2(res.pncExperienced),
  //       this.getBars(res.pncBars),
  //       this.getBars2(res.pncBars),
  //       this.getHealth(res.pncHealthForm),
  //       this.getHealth2(res.pncHealthForm),
  //       this.getWaiver(res.pncWaiver),
  //       this.getWaiver2(res.pncWaiver),
  //       'a', '',
  //       this.getRefresher(res.pncBarsRefresher),
  //       this.getRefresher2(res.pncBarsRefresher)
  //     ]);
  //   });
  // }

  // getTime(time) {
  //   var newTime = new Date(time);
  //   var hour = newTime.getHours();
  //   var night = "AM";
  //   if(hour > 12) {
  //     hour -= 12;
  //     night = "PM";
  //   }
  //   var min = (newTime.getMinutes() < 10 ? '0' : '') + newTime.getMinutes();
 
  //   var str = hour + ':' + min + " " + night;
  //   return str;
  // }

  // getExperienced(ex) {
  //   if(ex == 1) { return 'a'; }
  //   else { return ''; }
  // }
  // getExperienced2(ex) {
  //   if(ex == 0) { return 'a'; }
  //   else { return ''; }
  // }

  // getBars(bars) {
  //   if(bars) { return 'a'; }
  //   else { return ''; }
  // }
  // getBars2(bars) {
  //   if(!bars) { return 'a'; }
  //   else { return ''; }
  // }

  // getHealth(health) {
  //   if(health == 1) { return 'a'; }
  //   else { return ''; }
  // }
  // getHealth2(health) {
  //   if(health == 0) { return 'a'; }
  //   else { return ''; }
  // }

  // getWaiver(waiver) {
  //   if(waiver == 1) { return 'a'; }
  //   else { return ''; }
  // }
  // getWaiver2(waiver) {
  //   if(waiver == 0) { return 'a'; }
  //   else { return ''; }
  // }

  // getRefresher(ref) {
  //   if(ref == 1) { return 'a'; }
  //   else { return ''; }
  // }
  // getRefresher2(ref) {
  //   if(ref == 0) { return 'a'; }
  //   else { return ''; }
  // }

  // styleGateList(event: EventPNC) {
  //   const title = "VOLUNTEER GROUP GATE LIST 2019-2020 SEASON";

  //   // create a new workbook and worksheet
  //   // let workbook = new Workbook();
  //   let worksheet = this.workbook.addWorksheet('Gate List');

  //   // create the title row
  //   let titleRow = worksheet.addRow(['', '', title]);

  //   // create the subTitle rows
  //   let date = new Date(event.Date);
  //   let dateFormat:string = "";
  //   dateFormat = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
    
  //   let subTitleRow1 = worksheet.addRow(['', 'Group Name:', '', ' TAC - Triangle Aquatic Center' ]);
  //   let subTitleRow2 = worksheet.addRow(['', 'Date of Event:', '', dateFormat, '',  'Event:', '', event.Title]);
  //   let subTitleRow3 = worksheet.addRow(['', 'Stand Assignment:', '', event.location, '', '', '', 'Cart Assignment:', '', '']);
  //   worksheet.addRow([]);
  //   let instruction1 = worksheet.addRow(['', 'Gate list must be completed in full. Upon receipt, an acknowledgement will be sent back to you.']);
  //   let instruction2 = worksheet.addRow(['', 'FYI - to make the check mark we are using Webdings: just use the lower case "a" to make the check mark.']);
  //   worksheet.addRow([]);

  //   // create the table row headers
  //   let tableHeader1 = worksheet.addRow(['Name of Volunteer', 'Position', 'Arrival Time', 
  //                                       'Check Box If Volunteer Member is Experienced or New', '',
  //                                       'Check Box if Volunteer Member is BAR\'S Trained', '',
  //                                       'Check Box for Food Employee Reporting Agreement on file', '',
  //                                       'Check Box for Volunteer Program Waiver & Release on file', '',
  //                                       'Check Box for Volunteer Member Proof of Age(16 to 20) if needed', '',
  //                                       'Check Box for Volunteer Member BAR\'S Refresher Pledge if needed', '']);
  //   let tableHeader2 = worksheet.addRow(['',
  //                                       '',
  //                                       '',
  //                                       'E / N', '',
  //                                       'Y / N', '',
  //                                       'Y / N', '',
  //                                       'Y / N', '',
  //                                       'Y / N', '',
  //                                       'Y / N', '']);

  //   // cell fonts
  //   titleRow.font = {name: 'Calibri', family: 2, size: 11, bold: true, color: {argb: 'FFFF0000'}};
  //   instruction1.font = {name: 'Calibri', family: 2, size: 9, bold: true};
  //   instruction2.font = {name: 'Calibri', family: 2, size: 9, bold: true};
  //   tableHeader1.font = {name: 'Calibri', family: 2, size: 9, bold: true};
  //   tableHeader2.font = {name: 'Times New Roman', family: 1, size: 8, bold: true};

  //   // define the cells to merge
  //   worksheet.mergeCells('A1:A4'); // image
  //   worksheet.mergeCells('C1:N1'); // header
  //   worksheet.mergeCells('B2:C2'); // Group Name
  //   worksheet.mergeCells('D2:N2'); // TAC - Triangle Aquatic Center
  //   worksheet.mergeCells('B3:C3'); // Date of Event
  //   worksheet.mergeCells('D3:E3'); // this.event.date
  //   worksheet.mergeCells('F3:G3'); // Event
  //   worksheet.mergeCells('H3:N3'); // this.event.title
  //   worksheet.mergeCells('B4:C4'); // Stand Assignment
  //   worksheet.mergeCells('D4:G4'); // this.event.stand
  //   worksheet.mergeCells('H4:J4'); // Cart Assignment
  //   worksheet.mergeCells('K4:N4'); // ''
  //   worksheet.mergeCells('B6:N6'); // instruction1
  //   worksheet.mergeCells('B7:N7'); // instruction2
  //   worksheet.mergeCells('A9:A10'); // Name of Volunteer
  //   worksheet.mergeCells('B9:B10'); // Position
  //   worksheet.mergeCells('C9:C10'); // Arrival Time
  //   worksheet.mergeCells('D9:E9'); // Experienced
  //   worksheet.mergeCells('D10:E10'); // E / N
  //   worksheet.mergeCells('F9:G9'); // BAR'S Trained
  //   worksheet.mergeCells('F10:G10'); // Y / N
  //   worksheet.mergeCells('H9:I9'); // Reporting Agreement
  //   worksheet.mergeCells('H10:I10'); // Y / N
  //   worksheet.mergeCells('J9:K9'); // Program Waiver
  //   worksheet.mergeCells('J10:K10'); // Y / N
  //   worksheet.mergeCells('L9:M9'); // Proof of Age
  //   worksheet.mergeCells('L10:M10'); // Y / N
  //   worksheet.mergeCells('N9:O9'); // BAR'S Refresher
  //   worksheet.mergeCells('N10:O10'); // Y / N

  //   // column width
  //   worksheet.getColumn(1).width = 18;
  //   worksheet.getColumn(2).width = 12;
  //   worksheet.getColumn(3).width = 6.71;
  //   worksheet.getColumn(4).width = 6.71;
  //   worksheet.getColumn(5).width = 6.71;
  //   worksheet.getColumn(6).width = 6.71;
  //   worksheet.getColumn(7).width = 6.71;
  //   worksheet.getColumn(8).width = 6.71;
  //   worksheet.getColumn(9).width = 6.71;
  //   worksheet.getColumn(10).width = 6.71;
  //   worksheet.getColumn(11).width = 6.71;
  //   worksheet.getColumn(12).width = 6.71;
  //   worksheet.getColumn(13).width = 6.71;

  //   // row height
  //   worksheet.getRow(1).height = 15;
  //   worksheet.getRow(2).height = 15;
  //   worksheet.getRow(3).height = 15;
  //   worksheet.getRow(4).height = 15;
  //   worksheet.getRow(5).height = 15;
  //   worksheet.getRow(6).height = 15;
  //   worksheet.getRow(7).height = 15;
  //   worksheet.getRow(8).height = 15;
  //   worksheet.getRow(9).height = 66;
  //   worksheet.getRow(10).height = 15;

  //   // cell alignment
  //   worksheet.getCell('B2:C2').alignment = {horizontal: 'right'};
  //   worksheet.getCell('B3:C3').alignment = {horizontal: 'right'};
  //   worksheet.getCell('F3:G3').alignment = {horizontal: 'right'};
  //   worksheet.getCell('B4:C4').alignment = {horizontal: 'right'};
  //   worksheet.getCell('H4:J4').alignment = {horizontal: 'right'};
  //   worksheet.getCell('B6:N6').alignment = {horizontal: 'center'};
  //   worksheet.getCell('B7:N7').alignment = {horizontal: 'center'};
  //   worksheet.getCell('A9:A10').alignment = {horizontal: 'center'};
  //   worksheet.getCell('B9:B10').alignment = {horizontal: 'center'};
  //   worksheet.getCell('C9:C10').alignment = {horizontal: 'center', wrapText: true};
  //   worksheet.getCell('D9:E9').alignment = {horizontal: 'center', wrapText: true};
  //   worksheet.getCell('F9:G9').alignment = {horizontal: 'center', wrapText: true};
  //   worksheet.getCell('H9:I9').alignment = {horizontal: 'center', wrapText: true};
  //   worksheet.getCell('J9:K9').alignment = {horizontal: 'center', wrapText: true};
  //   worksheet.getCell('L9:M9').alignment = {horizontal: 'center', wrapText: true};
  //   worksheet.getCell('N9:09').alignment = {horizontal: 'center', wrapText: true};
  //   worksheet.getCell('D10:E10').alignment = {horizontal: 'center'};
  //   worksheet.getCell('F10:G10').alignment = {horizontal: 'center'};
  //   worksheet.getCell('H10:I10').alignment = {horizontal: 'center'};
  //   worksheet.getCell('J10:K10').alignment = {horizontal: 'center'};
  //   worksheet.getCell('L10:M10').alignment = {horizontal: 'center'};
  //   worksheet.getCell('N10:010').alignment = {horizontal: 'center'};

  //   // cell border
  //   worksheet.getCell('B2:C2').border = {bottom: {style: 'thin'}};
  //   worksheet.getCell('D2:N2').border = {bottom: {style: 'thin'}};
  //   worksheet.getCell('B3:C3').border = {bottom: {style: 'thin'}};
  //   worksheet.getCell('D3:E3').border = {bottom: {style: 'thin'}};
  //   worksheet.getCell('F3:G3').border = {bottom: {style: 'thin'}};
  //   worksheet.getCell('H3:N3').border = {bottom: {style: 'thin'}};
  //   worksheet.getCell('B4:C4').border = {bottom: {style: 'thin'}};
  //   worksheet.getCell('D4:G4').border = {bottom: {style: 'thin'}};
  //   worksheet.getCell('H4:J4').border = {bottom: {style: 'thin'}};
  //   worksheet.getCell('K4:N4').border = {bottom: {style: 'thin'}};

  //   worksheet.getCell('A9:A10').border = {top: {style: 'thin'} , 
  //                                         bottom: {style: 'thin'},
  //                                         left: {style: 'thin'},
  //                                         right: {style: 'thin'}};
  //   worksheet.getCell('B9:B10').border = {top: {style: 'thin'} , 
  //                                         bottom: {style: 'thin'},
  //                                         left: {style: 'thin'},
  //                                         right: {style: 'thin'}};
  //   worksheet.getCell('C9:C10').border = {top: {style: 'thin'} , 
  //                                         bottom: {style: 'thin'},
  //                                         left: {style: 'thin'},
  //                                         right: {style: 'thin'}};
  //   worksheet.getCell('D9:E9').border = {top: {style: 'thin'} , 
  //                                       bottom: {style: 'thin'},
  //                                       left: {style: 'thin'},
  //                                       right: {style: 'thin'}};
  //   worksheet.getCell('D10:E10').border = {top: {style: 'thin'} , 
  //                                         bottom: {style: 'thin'},
  //                                         left: {style: 'thin'},
  //                                         right: {style: 'thin'}};
  //   worksheet.getCell('F9:G9').border = {top: {style: 'thin'} , 
  //                                       bottom: {style: 'thin'},
  //                                       left: {style: 'thin'},
  //                                       right: {style: 'thin'}};
  //   worksheet.getCell('F10:G10').border = {top: {style: 'thin'} , 
  //                                         bottom: {style: 'thin'},
  //                                         left: {style: 'thin'},
  //                                         right: {style: 'thin'}};
  //   worksheet.getCell('H9:I9').border = {top: {style: 'thin'} , 
  //                                       bottom: {style: 'thin'},
  //                                       left: {style: 'thin'},
  //                                       right: {style: 'thin'}};
  //   worksheet.getCell('H10:I10').border = {top: {style: 'thin'} , 
  //                                         bottom: {style: 'thin'},
  //                                         left: {style: 'thin'},
  //                                         right: {style: 'thin'}};
  //   worksheet.getCell('J9:K9').border = {top: {style: 'thin'} , 
  //                                       bottom: {style: 'thin'},
  //                                       left: {style: 'thin'},
  //                                       right: {style: 'thin'}};
  //   worksheet.getCell('J10:K10').border = {top: {style: 'thin'} , 
  //                                         bottom: {style: 'thin'},
  //                                         left: {style: 'thin'},
  //                                         right: {style: 'thin'}};
  //   worksheet.getCell('L9:M9').border = {top: {style: 'thin'} , 
  //                                       bottom: {style: 'thin'},
  //                                       left: {style: 'thin'},
  //                                       right: {style: 'thin'}};
  //   worksheet.getCell('L10:M10').border = {top: {style: 'thin'} , 
  //                                         bottom: {style: 'thin'},
  //                                         left: {style: 'thin'},
  //                                         right: {style: 'thin'}};
  //   worksheet.getCell('N9:O9').border = {top: {style: 'thin'} , 
  //                                       bottom: {style: 'thin'},
  //                                       left: {style: 'thin'},
  //                                       right: {style: 'thin'}};
  //   worksheet.getCell('N10:O10').border = {top: {style: 'thin'} , 
  //                                         bottom: {style: 'thin'},
  //                                         left: {style: 'thin'},
  //                                         right: {style: 'thin'}};

  //   // cell background fill
  //   worksheet.getCell('D2:N2').fill = {
  //     type: 'pattern',
  //     pattern:'solid',
  //     fgColor:{argb:'FFFFFF00'}
  //   };

  //   worksheet.getCell('D3:E3').fill = {
  //     type: 'pattern',
  //     pattern:'solid',
  //     fgColor:{argb:'FFFFFF00'}
  //   };

  //   worksheet.getCell('H3:N3').fill = {
  //     type: 'pattern',
  //     pattern:'solid',
  //     fgColor:{argb:'FFFFFF00'}
  //   };

  //   worksheet.getCell('D4:G4').fill = {
  //     type: 'pattern',
  //     pattern:'solid',
  //     fgColor:{argb:'FFFFFF00'}
  //   };

  //   worksheet.getCell('K4:N4').fill = {
  //     type: 'pattern',
  //     pattern:'solid',
  //     fgColor:{argb:'FFFFFF00'}
  //   };

  //   // add an image
  //   let logo = this.workbook.addImage({
  //     base64: vabLogoFile.vabLogoBase64,
  //     extension: 'png',
  //   });
  //   worksheet.addImage(logo, 'A1:A4');

  //   // fill table with data
  //   this.data.forEach(d => {
  //     let row = worksheet.addRow(d);
  //     row.eachCell((cell, number) => {
  //       cell.border = { top: { style: 'thin' }, 
  //       left: { style: 'thin' },
  //       bottom: {style: 'thin'},
  //       right: {style: 'thin'} }
  //     });
  //     row.height = 15;
  //     row.font = {name: 'Calibri', family: 2, size: 9};
  //   });
  // }

  // saveGateList(event: EventPNC, email: boolean, download: boolean) {
  //   let date = new Date(event.Date);
  //   let dateFormat:string = "";
  //   dateFormat = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();


    
  //   this.workbook.xlsx.writeBuffer().then((data) => {
  //     let blob = new Blob([data],{type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  //     if(download) {
  //       fs.saveAs(blob, 'GateList_' + dateFormat);
  //     }
  //     if(email) {
  //       const jsonWb = JSON.stringify(this.workbook.model);
  //       // console.log('jsonWB: ' + jsonWb);
  //       const params = { workbook: jsonWb, date: dateFormat };
  //       this.http.post(this.serverUrl + 'sendGateList', params).subscribe(res => {
  //         console.log("Gate List was sent");
  //       });
  //     }
  //   });
  // }

}
