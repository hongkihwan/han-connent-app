<template>
    <div class="contact-history-view">
        <div class="row">
          <div class="col-lg-8" style="display:flex;margin-left:10px;margin-top:20px;align-items: center;justify-content: center;">
            <div style="width:100px;"> 
              <span style="margin-right:10px;margin-top:7px;">통계구분</span>
            </div>
            <select v-model="repType" class="form-control" style="width:180px;margin-right:10px;">
              <option value="1074">2R 모터사이클</option>
              <option value="1075">4R 혼다자동차</option>                                
            </select>
            <date-picker v-model="repdate" id="enddate" :popover="{ placement: 'bottom', visibility: 'click' }"/>
            <div style="display:flex;">
              <button class="btn btn-primary" style="margin-left:5px;" @click="makeData">조회</button>
              <button @click="excelExport2" class="btn btn-primary" style="width:150px;margin-left:10px;">통계 추출 (Excel)</button>
            </div>
          </div>
        </div>
        <div style="margin-top:30px;margin-left: 10px;">
          <div>
            <h2>{{year}}년 {{month}}월 문의유형별 통계</h2>
          </div>

          <table id="monthlyrep" style="width:1960px;border:1px solid black;">
            <thead>
                <tr>
                  <th rowspan="2" style="width:180px;">상담분류</th>
                  <th rowspan="2" colspan="2" style="width:240px;">세분류</th>
                  <th class="col_day"> {{month}}/1 </th>
                  <th class="col_day"> {{month}}/2 </th>
                  <th class="col_day"> {{month}}/3 </th>
                  <th class="col_day"> {{month}}/4 </th>
                  <th class="col_day"> {{month}}/5 </th>
                  <th class="col_day"> {{month}}/6 </th>
                  <th class="col_day"> {{month}}/7 </th>
                  <th class="col_day"> {{month}}/8 </th>
                  <th class="col_day"> {{month}}/9 </th>
                  <th class="col_day"> {{month}}/10 </th>
                  <th class="col_day"> {{month}}/11 </th>
                  <th class="col_day"> {{month}}/12 </th>
                  <th class="col_day"> {{month}}/13 </th>
                  <th class="col_day"> {{month}}/14 </th>
                  <th class="col_day"> {{month}}/15 </th>
                  <th class="col_day"> {{month}}/16 </th>
                  <th class="col_day"> {{month}}/17 </th>
                  <th class="col_day"> {{month}}/18 </th>
                  <th class="col_day"> {{month}}/19 </th>
                  <th class="col_day"> {{month}}/20 </th>
                  <th class="col_day"> {{month}}/21 </th>
                  <th class="col_day"> {{month}}/22 </th>
                  <th class="col_day"> {{month}}/23 </th>
                  <th class="col_day"> {{month}}/24 </th>
                  <th class="col_day"> {{month}}/25 </th>
                  <th class="col_day"> {{month}}/26 </th>
                  <th class="col_day"> {{month}}/27 </th>
                  <th class="col_day" v-if="lastday >= 28"> {{month}}/28 </th>
                  <th class="col_day" v-if="lastday >= 29"> {{month}}/29 </th>
                  <th class="col_day" v-if="lastday >= 30"> {{month}}/30 </th>
                  <th class="col_day" v-if="lastday >= 31"> {{month}}/31 </th>
                  <th rowspan="2" style="width:60px;">계</th>
                  <th rowspan="2" style="width:60px;">일평균</th>
                  <th rowspan="2" style="width:60px;">항목내<br />構成比</th>
                  <th rowspan="2" style="width:60px;">전체<br />構成比</th>
                  <th rowspan="2" style="width:60px;">備考</th>
                </tr>
                <tr>
                    <th>{{getWeek(year,month,1)}}</th>
                    <th>{{getWeek(year,month,2)}}</th>
                    <th>{{getWeek(year,month,3)}}</th>
                    <th>{{getWeek(year,month,4)}}</th>
                    <th>{{getWeek(year,month,5)}}</th>
                    <th>{{getWeek(year,month,6)}}</th>
                    <th>{{getWeek(year,month,7)}}</th>
                    <th>{{getWeek(year,month,8)}}</th>
                    <th>{{getWeek(year,month,9)}}</th>
                    <th>{{getWeek(year,month,10)}}</th>
                    <th>{{getWeek(year,month,11)}}</th>
                    <th>{{getWeek(year,month,12)}}</th>
                    <th>{{getWeek(year,month,13)}}</th>
                    <th>{{getWeek(year,month,14)}}</th>
                    <th>{{getWeek(year,month,15)}}</th>
                    <th>{{getWeek(year,month,16)}}</th>
                    <th>{{getWeek(year,month,17)}}</th>
                    <th>{{getWeek(year,month,18)}}</th>
                    <th>{{getWeek(year,month,19)}}</th>
                    <th>{{getWeek(year,month,20)}}</th>
                    <th>{{getWeek(year,month,21)}}</th>
                    <th>{{getWeek(year,month,22)}}</th>
                    <th>{{getWeek(year,month,23)}}</th>
                    <th>{{getWeek(year,month,24)}}</th>
                    <th>{{getWeek(year,month,25)}}</th>
                    <th>{{getWeek(year,month,26)}}</th>
                    <th>{{getWeek(year,month,27)}}</th>
                    <th v-if="lastday >= 28">{{getWeek(year,month,28)}}</th>
                    <th v-if="lastday >= 29">{{getWeek(year,month,29)}}</th>
                    <th v-if="lastday >= 30">{{getWeek(year,month,30)}}</th>
                    <th v-if="lastday >= 31">{{getWeek(year,month,31)}}</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data" :key="index" :class="{midSubtot:item.midSubtot, topSubtot:item.topSubtot}">
                  <td :rowspan="item.topRowspan" :colspan="item.topSubtot ? 3 : 0" v-if="item.topRowspan >= 0">{{item.topName}}</td>
                  <td :rowspan="item.midRowspan" :colspan="item.midSubtot ? 2 : 0" v-if="item.midRowspan >= 0 && item.topSubtot !== true">{{item.midName}}</td>
                  <td v-if="item.topSubtot === false && item.midSubtot == false">{{item.botName}}</td>
                  <td><span v-if="item.day1 > 0">{{item.day1}}</span></td>
                  <td><span v-if="item.day2 > 0">{{item.day2}}</span></td>
                  <td><span v-if="item.day3 > 0">{{item.day3}}</span></td>
                  <td><span v-if="item.day4 > 0">{{item.day4}}</span></td>
                  <td><span v-if="item.day5 > 0">{{item.day5}}</span></td>
                  <td><span v-if="item.day6 > 0">{{item.day6}}</span></td>
                  <td><span v-if="item.day7 > 0">{{item.day7}}</span></td>
                  <td><span v-if="item.day8 > 0">{{item.day8}}</span></td>
                  <td><span v-if="item.day9 > 0">{{item.day9}}</span></td>
                  <td><span v-if="item.day10 > 0">{{item.day10}}</span></td>
                  <td><span v-if="item.day11 > 0">{{item.day11}}</span></td>
                  <td><span v-if="item.day12 > 0">{{item.day12}}</span></td>
                  <td><span v-if="item.day13 > 0">{{item.day13}}</span></td>
                  <td><span v-if="item.day14 > 0">{{item.day14}}</span></td>
                  <td><span v-if="item.day15 > 0">{{item.day15}}</span></td>
                  <td><span v-if="item.day61 > 0">{{item.day16}}</span></td>
                  <td><span v-if="item.day17 > 0">{{item.day17}}</span></td>
                  <td><span v-if="item.day18 > 0">{{item.day18}}</span></td>
                  <td><span v-if="item.day19 > 0">{{item.day19}}</span></td>
                  <td><span v-if="item.day20 > 0">{{item.day20}}</span></td>
                  <td><span v-if="item.day21 > 0">{{item.day21}}</span></td>
                  <td><span v-if="item.day22 > 0">{{item.day22}}</span></td>
                  <td><span v-if="item.day23 > 0">{{item.day23}}</span></td>
                  <td><span v-if="item.day24 > 0">{{item.day24}}</span></td>
                  <td><span v-if="item.day25 > 0">{{item.day25}}</span></td>
                  <td><span v-if="item.day26 > 0">{{item.day26}}</span></td>
                  <td><span v-if="item.day27 > 0">{{item.day27}}</span></td>
                  <td v-if="lastday >= 28"><span v-if="item.day28 > 0">{{item.day28}}</span></td>
                  <td v-if="lastday >= 29"><span v-if="item.day29 > 0">{{item.day29}}</span></td>
                  <td v-if="lastday >= 30"><span v-if="item.day30 > 0">{{item.day30}}</span></td>
                  <td v-if="lastday >= 31"><span v-if="item.day31 > 0">{{item.day31}}</span></td>
                  <td>{{item.sum}}</td>
                  <td style="text-align:right;">{{item.avg}}</td>
                  <td style="text-align:right;">{{item.sub_rate}}%</td>
                  <td style="text-align:right;">{{item.tot_rate}}%</td>
                  <td></td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top:30px;">
            <h2>{{year}}년 {{month}}월 불만접수현황</h2>
          </div>
          <table id="claim_contact">
              <thead>
                  <tr>
                      <th style="width:150px;">접수일</th>
                      <th style="width:150px;">대분류</th>
                      <th style="width:100px;">중분류</th>
                      <th style="width:150px;">소분류</th>
                      <th style="width:150px;">차종</th>
                      <th style="width:1200px;">접수내용</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in claim_contact" :key="index">
                      <td>{{item.contdt}}</td>
                      <td>{{item.catetopName}}</td>
                      <td>{{item.catemidName}}</td>
                      <td>{{item.catebotName}}</td>
                      <td>{{item.catedetName}}</td>
                      <td>{{item.detail}}</td>
                  </tr>
              </tbody>
          </table>

          <div style="margin-top:30px;">
            <h2> {{year}}년 {{month}}월 불만분석통계</h2>
          </div>
          <table id="claim">
            <thead>
              <tr>
                <th colspan="2">不滿/Claim</th>
                <th>{{claim_sum}}</th>                    
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in claim" :key="index">
                <td :rowspan="claim.length" v-if="index == 0" style="width:150px;">項目別 Claim</td>
                <td style="width:200px;">{{item.name}}</td>
                <td style="width:80px;">{{item.count}}</td>
              </tr>
              <tr v-for="(item, index) in carmodel" :key="index+100">
                <td :rowspan="carmodel.length" v-if="index == 0">車種別 Claim</td>
                <td>{{item.name}}</td>
                <td>{{item.count}}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
    name: 'MonthlyReport',
    components: {
      DatePicker
    },
    data() {
        return {
            data: [],
            claim_contact: [],
            claim: [],            
            carmodel: [],
            repdate: new Date(),
            year: 2019,
            month: 6,
            claim_sum: 0,
            lastday: 31,
            holidaycnt: 0,
            repType: 1074, /* 2R 897, 4R 898 */
        }
    },
    mounted() {
      this.makeData();
    },
    methods: {
        makeData() {
            this.data = [];
            this.claim = [];
            this.carmodel = [];

            this.year = this.repdate.getFullYear();
            this.month = this.repdate.getMonth()+1;

            this.makeLastdate(this.year, this.month);
            this.buildData(this.repType == 1074 ? 897 : 898, 0, 0, 0);
            this.buildClaim(this.repType == 1074 ? 1214 : 1178);
            this.buildModel(this.repType == 1074 ? 1077 : 1078);
            this.loadClaimContact(this.repType == 1074 ? 1214 : 1178);
            this.loadData();
            this.loadClaimData();
        },
        excelExport2 () {
            var wb = window.XLSX.utils.book_new();
            wb.SheetNames.push("Sheet 1");
            var ws2 = window.XLSX.utils.table_to_sheet(document.getElementById('monthlyrep'));

            let idx = 0;
            for(idx = 0 ; idx < this.lastday; idx++) {
                switch(idx) {
                    case 0:
                        ws2.D1.z = "m월 d일";
                        break;
                    case 1:
                        ws2.E1.z = "m월 d일";
                        break;
                    case 2:
                        ws2.F1.z = "m월 d일";
                        break;
                    case 3:
                        ws2.G1.z = "m월 d일";
                        break;
                    case 4:
                        ws2.H1.z = "m월 d일";
                        break;
                    case 5:
                        ws2.I1.z = "m월 d일";
                        break;
                    case 6:
                        ws2.J1.z = "m월 d일";
                        break;
                    case 7:
                        ws2.K1.z = "m월 d일";
                        break;
                    case 8:
                        ws2.L1.z = "m월 d일";
                        break;
                    case 9:
                        ws2.M1.z = "m월 d일";
                        break;
                    case 10:
                        ws2.N1.z = "m월 d일";
                        break;
                    case 11:
                        ws2.O1.z = "m월 d일";
                        break;
                    case 12:
                        ws2.P1.z = "m월 d일";
                        break;
                    case 13:
                        ws2.Q1.z = "m월 d일";
                        break;
                    case 14:
                        ws2.R1.z = "m월 d일";
                        break;
                    case 15:
                        ws2.S1.z = "m월 d일";
                        break;
                    case 16:
                        ws2.T1.z = "m월 d일";
                        break;
                    case 17:
                        ws2.U1.z = "m월 d일";
                        break;
                    case 18:
                        ws2.V1.z = "m월 d일";
                        break;
                    case 19:
                        ws2.W1.z = "m월 d일";
                        break;
                    case 20:
                        ws2.X1.z = "m월 d일";
                        break;
                    case 21:
                        ws2.Y1.z = "m월 d일";
                        break;
                    case 22:
                        ws2.Z1.z = "m월 d일";
                        break;
                    case 23:
                        ws2.AA1.z = "m월 d일";
                        break;
                    case 24:
                        ws2.AB1.z = "m월 d일";
                        break;
                    case 25:
                        ws2.AC1.z = "m월 d일";
                        break;
                    case 26:
                        ws2.AD1.z = "m월 d일";
                        break;
                    case 27:
                        ws2.AE1.z = "m월 d일";
                        break;
                    case 28:
                        ws2.AF1.z = "m월 d일";
                        break;
                    case 29:
                        ws2.AG1.z = "m월 d일";
                        break;
                    case 30:
                        ws2.AH1.z = "m월 d일";
                        break;
                    case 31:
                        ws2.AI1.z = "m월 d일";
                        break;
                }
            }
            

            wb.Sheets["Sheet 1"] = ws2;

            wb.SheetNames.push("Sheet 2");
            var ws3 = window.XLSX.utils.table_to_sheet(document.getElementById('claim_contact'));
            wb.Sheets["Sheet 2"] = ws3;

            wb.SheetNames.push("Sheet 3");
            var ws4 = window.XLSX.utils.table_to_sheet(document.getElementById('claim'));
            wb.Sheets["Sheet 3"] = ws4;

            

            var wbout = window.XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
            function s2ab(s) {
                            var buf = new ArrayBuffer(s.length);
                            var view = new Uint8Array(buf);
                            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                            return buf;
            }

            let blob = new Blob([s2ab(wbout)],{type:"application/octet-stream"});
            
            var saveData = (function () {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                return function (blob, fileName) {
                    var url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
            }());

            let dt = new Date();
            saveData(blob, dt.getFullYear().toString() + (dt.getMonth()+1).toString() + dt.getDate().toString() + '_'+dt.getHours().toString() + dt.getMinutes().toString() + dt.getSeconds() + ".xlsx");

            /*$("#button-a").click(function(){
            saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');
            });*/
        },
        excelExport() {
            //let dt = new Date();
/*
            var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function(s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            },
            format = function(s, c) {
                return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
                })
            }
            var toExcel1 = [];
            
            toExcel1.push(document.getElementById("monthlyrep").innerHTML);
            toExcel1.push(document.getElementById("claim_contact").innerHTML);
            toExcel1.push(document.getElementById("claim").innerHTML);

            var ctx = {
            worksheet: name || '',
            table: toExcel1
            };
            var link = document.createElement("a");
            link.download = dt.getFullYear().toString() + (dt.getMonth()+1).toString() + dt.getDate().toString() + '_'+dt.getHours().toString() + dt.getMinutes().toString() + dt.getSeconds() + ".xls";
            link.href = uri + base64(format(template, ctx))
            link.click();
*/

            var tablesToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,',
    tmplWorkbookXML = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">' +
    '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>' +
    '<Styles>' +
    '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>' +
    '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>' +
    '</Styles>' +
    '{worksheets}</Workbook>',
    tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>',
    tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}><Data ss:Type="{nameType}">{data}</Data></Cell>',
    base64 = function(s) {
      return window.btoa(unescape(encodeURIComponent(s)))
    },
    format = function(s, c) {
      return s.replace(/{(\w+)}/g, function(m, p) {
        return c[p];
      })
    }
  return function(tables, wsnames, wbname, appname) {
    var ctx = "";
    var workbookXML = "";
    var worksheetsXML = "";
    var rowsXML = "";

    for (var i = 0; i < tables.length; i++) {
      if (!tables[i].nodeType) tables[i] = document.getElementById(tables[i]);
      for (var j = 0; j < tables[i].rows.length; j++) {
        rowsXML += '<Row>'
        for (var k = 0; k < tables[i].rows[j].cells.length; k++) {
          var dataType = tables[i].rows[j].cells[k].getAttribute("data-type");
          var dataStyle = tables[i].rows[j].cells[k].getAttribute("data-style");
          var dataValue = tables[i].rows[j].cells[k].getAttribute("data-value");
          dataValue = (dataValue) ? dataValue : tables[i].rows[j].cells[k].innerHTML;
          var dataFormula = tables[i].rows[j].cells[k].getAttribute("data-formula");
          dataFormula = (dataFormula) ? dataFormula : (appname == 'Calc' && dataType == 'DateTime') ? dataValue : null;
          ctx = {
            attributeStyleID: (dataStyle == 'Currency' || dataStyle == 'Date') ? ' ss:StyleID="' + dataStyle + '"' : '',
            nameType: (dataType == 'Number' || dataType == 'DateTime' || dataType == 'Boolean' || dataType == 'Error') ? dataType : 'String',
            data: (dataFormula) ? '' : dataValue,
            attributeFormula: (dataFormula) ? ' ss:Formula="' + dataFormula + '"' : ''
          };
          rowsXML += format(tmplCellXML, ctx);
        }
        rowsXML += '</Row>'
      }
      ctx = {
        rows: rowsXML,
        nameWS: wsnames[i] || 'Sheet' + i
      };
      worksheetsXML += format(tmplWorksheetXML, ctx);
      rowsXML = "";
    }

    ctx = {
      created: (new Date()).getTime(),
      worksheets: worksheetsXML
    };
    workbookXML = format(tmplWorkbookXML, ctx);

    var link = document.createElement("A");
    
    // IE 11
    if (window.navigator.msSaveBlob) {
      var blob = new Blob([workbookXML], {
        type: "application/csv;charset=utf-8;"
      });
      navigator.msSaveBlob(blob, 'test.xls');
    }
    // Chrome and other browsers
    else {
      link.href = uri + base64(workbookXML);
    }

    link.download = wbname || 'Workbook.xls';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
})();

            //tablesToExcel(['monthlyrep','claim_contact','claim'],[this.year.toString() + '년 '+ this.month.toString() + '월',this.year.toString() + '년 '+ this.month.toString() + '월 불만접수현황','불만분석'],'export.xls', 'Excel');
            tablesToExcel(['claim'],['sheet1'],'export.xls','Excel');
       },
        getWeek(y, m, d) {
            let dt = new Date(y, m-1, d, 0, 0, 0, 0);
            let week = ['일','월','화','수','목','금','토'];

            return week[dt.getDay()];
        },
        makeLastdate(year, month) {
            let last = [31,29,31,30,31,30,31,31,30,31,30,31];
            let dt = new Date(year, 1, 29);
            if((dt.getMonth()+1) === 2) {
                last[1] = 29;
            } else {
                last[1] = 28;
            }

            this.lastday = last[month-1];

            let firstDay = new Date(year, month-1, 1);
            let firstHoliday = 7-firstDay.getDay();
            if(firstHoliday == 7) {
                firstHoliday = 1;
            } else {
                firstHoliday += 1;
            }

            this.holidaycnt = parseInt((this.lastday - firstHoliday) / 7 + 1);
        },
        loadData() {
            let self = this;
            let row = {};

            let startDT = this.year.toString();
            let endDT = this.year.toString();

            if(this.month < 10) {
                startDT += "0";
                endDT += "0";
            }

            startDT += this.month.toString();
            endDT += this.month.toString();

            axios.get('https://nodeapi.uniplat.net/api/honda_monthly/' + startDT + '01/' + endDT + '31')
            .then(function(res) {
                if(res.data.result === true) {
                    let idx = 0;
                    for(idx = 0; idx < res.data.items.length; idx++) {
                        row = self.data.find(item => item.topCode == res.data.items[idx].catetop && item.midCode == res.data.items[idx].catemid && item.botCode == res.data.items[idx].catebot);
                        if(row !== undefined && row.botCode != 0) {
                            switch(parseInt(res.data.items[idx].regdt.substring(6,8))) {
                                case 1:
                                    row.day1 = res.data.items[idx].cnt;
                                    break;
                                case 2:
                                    row.day2 = res.data.items[idx].cnt;
                                    break;
                                case 3:
                                    row.day3 = res.data.items[idx].cnt;
                                    break;
                                case 4:
                                    row.day4 = res.data.items[idx].cnt;
                                    break;
                                case 5:
                                    row.day5 = res.data.items[idx].cnt;
                                    break;
                                case 6:
                                    row.day6 = res.data.items[idx].cnt;
                                    break;
                                case 7:
                                    row.day7 = res.data.items[idx].cnt;
                                    break;
                                case 8:
                                    row.day8 = res.data.items[idx].cnt;
                                    break;
                                case 9:
                                    row.day9 = res.data.items[idx].cnt;
                                    break;
                                case 10:
                                    row.day10 = res.data.items[idx].cnt;
                                    break;
                                case 11:
                                    row.day11 = res.data.items[idx].cnt;
                                    break;
                                case 12:
                                    row.day12 = res.data.items[idx].cnt;
                                    break;
                                case 13:
                                    row.day13 = res.data.items[idx].cnt;
                                    break;
                                case 14:
                                    row.day14 = res.data.items[idx].cnt;
                                    break;
                                case 15:
                                    row.day15 = res.data.items[idx].cnt;
                                    break;
                                case 16:
                                    row.day16 = res.data.items[idx].cnt;
                                    break;
                                case 17:
                                    row.day17 = res.data.items[idx].cnt;
                                    break;
                                case 18:
                                    row.day18 = res.data.items[idx].cnt;
                                    break;
                                case 19:
                                    row.day19 = res.data.items[idx].cnt;
                                    break;
                                case 20:
                                    row.day20 = res.data.items[idx].cnt;
                                    break;
                                case 21:
                                    row.day21 = res.data.items[idx].cnt;
                                    break;
                                case 22:
                                    row.day22 = res.data.items[idx].cnt;
                                    break;
                                case 23:
                                    row.day23 = res.data.items[idx].cnt;
                                    break;
                                case 24:
                                    row.day24 = res.data.items[idx].cnt;
                                    break;
                                case 25:
                                    row.day25 = res.data.items[idx].cnt;
                                    break;
                                case 26:
                                    row.day26 = res.data.items[idx].cnt;
                                    break;
                                case 27:
                                    row.day27 = res.data.items[idx].cnt;
                                    break;
                                case 28:
                                    row.day28 = res.data.items[idx].cnt;
                                    break;
                                case 29:
                                    row.day29 = res.data.items[idx].cnt;
                                    break;
                                case 30:
                                    row.day30 = res.data.items[idx].cnt;
                                    break;
                                case 31:
                                    row.day31 = res.data.items[idx].cnt;
                                    break;
                            }
                        }
                    }

                    let subtot = self.data.filter(item => item.botCode == 0);
                    let subIdx = 0;
                    let subGroup = [];

                    //카테고리별 합계
                    subGroup = self.data.filter(item => item.botCode != 0);
                    for(idx = 0; idx < subGroup.length; idx++) {
                        subGroup[idx].sum += subGroup[idx].day1;
                        subGroup[idx].sum += subGroup[idx].day2;
                        subGroup[idx].sum += subGroup[idx].day3;
                        subGroup[idx].sum += subGroup[idx].day4;
                        subGroup[idx].sum += subGroup[idx].day5;
                        subGroup[idx].sum += subGroup[idx].day6;
                        subGroup[idx].sum += subGroup[idx].day7;
                        subGroup[idx].sum += subGroup[idx].day8;
                        subGroup[idx].sum += subGroup[idx].day9;
                        subGroup[idx].sum += subGroup[idx].day10;
                        subGroup[idx].sum += subGroup[idx].day11;
                        subGroup[idx].sum += subGroup[idx].day12;
                        subGroup[idx].sum += subGroup[idx].day13;
                        subGroup[idx].sum += subGroup[idx].day14;
                        subGroup[idx].sum += subGroup[idx].day15;
                        subGroup[idx].sum += subGroup[idx].day16;
                        subGroup[idx].sum += subGroup[idx].day17;
                        subGroup[idx].sum += subGroup[idx].day18;
                        subGroup[idx].sum += subGroup[idx].day19;
                        subGroup[idx].sum += subGroup[idx].day20;
                        subGroup[idx].sum += subGroup[idx].day21;
                        subGroup[idx].sum += subGroup[idx].day22;
                        subGroup[idx].sum += subGroup[idx].day23;
                        subGroup[idx].sum += subGroup[idx].day24;
                        subGroup[idx].sum += subGroup[idx].day25;
                        subGroup[idx].sum += subGroup[idx].day26;
                        subGroup[idx].sum += subGroup[idx].day27;
                        subGroup[idx].sum += subGroup[idx].day28;
                        subGroup[idx].sum += subGroup[idx].day29;
                        subGroup[idx].sum += subGroup[idx].day30;
                        subGroup[idx].sum += subGroup[idx].day31;

                        subGroup[idx].avg = (subGroup[idx].sum / (self.lastday-self.holidaycnt)).toFixed(1);
                    }

                    for(idx = 0;idx < subtot.length; idx++) {
                        //대분류 소계
                        if(subtot[idx].topCode != 0 && subtot[idx].midCode == 0 && subtot[idx].botCode == 0) {
                            subGroup = self.data.filter(item => item.topCode == subtot[idx].topCode && item.midCode != 0 && item.botCode == 0);                            
                        } else 
                        //전체 합계
                        if(subtot[idx].topCode == 0) {
                            subGroup = self.data.filter(item => item.topCode != 0 && item.midCode == 0 && item.botCode == 0);
                        } else {
                            //중분류 소계
                            subGroup = self.data.filter(item => item.topCode == subtot[idx].topCode && item.midCode == subtot[idx].midCode && item.topSubtot == false && item.midSubtot == false);
                        }

                        /*subtot[idx].day1 = 0;
                        subtot[idx].day2 = 0;
                        subtot[idx].day3 = 0;
                        subtot[idx].day4 = 0;
                        subtot[idx].day5 = 0;
                        subtot[idx].day6 = 0;
                        subtot[idx].day7 = 0;
                        subtot[idx].day8 = 0;
                        subtot[idx].day9 = 0;
                        subtot[idx].day10 = 0;
                        subtot[idx].day11 = 0;
                        subtot[idx].day12 = 0;
                        subtot[idx].day13 = 0;
                        subtot[idx].day14 = 0;
                        subtot[idx].day15 = 0;
                        subtot[idx].day16 = 0;
                        subtot[idx].day17 = 0;
                        subtot[idx].day18 = 0;
                        subtot[idx].day19 = 0;
                        subtot[idx].day20 = 0;
                        subtot[idx].day21 = 0;
                        subtot[idx].day22 = 0;
                        subtot[idx].day23 = 0;
                        subtot[idx].day24 = 0;
                        subtot[idx].day25 = 0;
                        subtot[idx].day26 = 0;
                        subtot[idx].day27 = 0;
                        subtot[idx].day28 = 0;
                        subtot[idx].day29 = 0;
                        subtot[idx].day30 = 0;
                        subtot[idx].day31 = 0;*/

                        for(subIdx = 0;subIdx < subGroup.length; subIdx++) {
                            subtot[idx].day1 += subGroup[subIdx].day1;
                            subtot[idx].day2 += subGroup[subIdx].day2;
                            subtot[idx].day3 += subGroup[subIdx].day3;
                            subtot[idx].day4 += subGroup[subIdx].day4;
                            subtot[idx].day5 += subGroup[subIdx].day5;
                            subtot[idx].day6 += subGroup[subIdx].day6;
                            subtot[idx].day7 += subGroup[subIdx].day7;
                            subtot[idx].day8 += subGroup[subIdx].day8;
                            subtot[idx].day9 += subGroup[subIdx].day9;
                            subtot[idx].day10 += subGroup[subIdx].day10;
                            subtot[idx].day11 += subGroup[subIdx].day11;
                            subtot[idx].day12 += subGroup[subIdx].day12;
                            subtot[idx].day13 += subGroup[subIdx].day13;
                            subtot[idx].day14 += subGroup[subIdx].day14;
                            subtot[idx].day15 += subGroup[subIdx].day15;
                            subtot[idx].day16 += subGroup[subIdx].day16;
                            subtot[idx].day17 += subGroup[subIdx].day17;
                            subtot[idx].day18 += subGroup[subIdx].day18;
                            subtot[idx].day19 += subGroup[subIdx].day19;
                            subtot[idx].day20 += subGroup[subIdx].day20;
                            subtot[idx].day21 += subGroup[subIdx].day21;
                            subtot[idx].day22 += subGroup[subIdx].day22;
                            subtot[idx].day23 += subGroup[subIdx].day23;
                            subtot[idx].day24 += subGroup[subIdx].day24;
                            subtot[idx].day25 += subGroup[subIdx].day25;
                            subtot[idx].day26 += subGroup[subIdx].day26;
                            subtot[idx].day27 += subGroup[subIdx].day27;
                            subtot[idx].day28 += subGroup[subIdx].day28;
                            subtot[idx].day29 += subGroup[subIdx].day29;
                            subtot[idx].day30 += subGroup[subIdx].day30;
                            subtot[idx].day31 += subGroup[subIdx].day31;

                            subtot[idx].sum += subGroup[subIdx].sum;
                            subtot[idx].avg = (subtot[idx].sum / (self.lastday-self.holidaycnt)).toFixed(1);

                            if(subtot[idx].topCode != 0 && subtot[idx].midCode != 0 && subtot[idx].botCode == 0) {
                                subGroup.forEach(element => element.sub_rate = element.sum == 0 ? 0.0 : (element.sum / subtot[idx].sum * 100).toFixed(1));
                            } else if(subtot[idx].topCode != 0 && subtot[idx].midCode == 0 && subtot[idx].botCode == 0) {
                                subGroup.forEach(element => {
                                    element.sub_rate = element.sum == 0 ? 0.0 : (element.sum / subtot[idx].sum * 100).toFixed(1);
                                });
                            } else {
                                subGroup.forEach(element => {
                                    element.sub_rate = element.sum == 0 ? 0.0 : 100.0.toFixed(1);
                                    element.tot_rate = element.sum == 0 ? 0.0 : (element.sum / subtot[idx].sum * 100).toFixed(1);
                                });

                                self.data.forEach(element => {
                                    element.tot_rate = element.sum == 0 ? 0.0 : (element.sum / subtot[idx].sum * 100).toFixed(1);
                                });

                                subtot[idx].sub_rate = subtot[idx].sum == 0 ? 0.0 : 100.0.toFixed(1);
                                //subtot[idx].tot_rate = 100.0;
                            }
                        }
                    }
                }
            });
        },
        loadClaimContact(seq) {
            let self = this;

            let startDT = this.year.toString();
            let endDT = this.year.toString();

            if(this.month < 10) {
                startDT += "0";
                endDT += "0";
            }

            startDT += this.month.toString();
            endDT += this.month.toString();

            axios.get('https://api.uniplat.net/api/contact/catetop/' + startDT + '01/' + endDT + '31/3/' + seq.toString())
            .then(function(res) {
                if(res.data.result == true) {
                    self.claim_contact = res.data.contacts;
                }
            })
        },
        loadClaimData() {
            let self = this;

            let startDT = this.year.toString();
            let endDT = this.year.toString();

            if(this.month < 10) {
                startDT += "0";
                endDT += "0";
            }

            startDT += this.month.toString();
            endDT += this.month.toString();

            axios.get('https://nodeapi.uniplat.net/api/honda_monthly_claim/' + startDT + '01/' + endDT + '31')
            .then(function(res) {
                if(res.data.result === true) {
                    self.claim_sum = 0;
                    self.claim.forEach(ele => {
                        ele.count = 0;
                        res.data.items.filter(item => ele.codeseq == item.catemid).forEach(val => ele.count += val.cnt);
                        self.claim_sum += ele.count;
                    });

                    self.carmodel.forEach(ele => {
                        ele.count = 0;
                        res.data.items.filter(item => ele.codeseq == item.catedet).forEach(val => ele.count += val.cnt);
                    });
                }
            });
        },
        buildClaim(start) {
            let items = this.$store.getters.QueryParentseq(start);

            this.claim = [];
            items.forEach(ele => {
                this.claim.push({
                    name: ele.cdname,
                    codeseq: ele.codeseq,
                    count: 0
                });
            });
        },
        buildModel(start) {
            let items = this.$store.getters.QueryParentseq(start);

            this.carmodel = [];
            items.forEach(ele => {
                this.carmodel.push({
                    name: ele.cdname,
                    codeseq: ele.codeseq,
                    count: 0
                });
            });
        },
        buildData(start, depth, top, mid) {
            let seq = start;
            let idx = 0;

            if(depth === 1) {
                seq = top;
            } else if(depth === 2) {
                seq = mid;
            }

            let items = this.$store.getters.QueryParentseq(seq);

            for(idx = 0; idx < items.length; idx++) {
                if(depth === 0) {
                    this.buildData(start, depth+1, items[idx].codeseq, 0);
                } else if(depth === 1 ) {
                    this.buildData(start, depth+1, top, items[idx].codeseq);
                } else {
                    this.data.push({
                        topCode: top,
                        topName: this.$store.getters.getCodeName(top),
                        midCode: mid,
                        midName: this.$store.getters.getCodeName(mid),
                        botCode: items[idx].codeseq,
                        botName: this.$store.getters.getCodeName(items[idx].codeseq),
                        day1: 0,
                        day2: 0,
                        day3: 0,
                        day4: 0,
                        day5: 0,
                        day6: 0,
                        day7: 0,
                        day8: 0,
                        day9: 0,
                        day10: 0,
                        day11: 0,
                        day12: 0,
                        day13: 0,
                        day14: 0,
                        day15: 0,
                        day16: 0,
                        day17: 0,
                        day18: 0,
                        day19: 0,
                        day20: 0,
                        day21: 0,
                        day22: 0,
                        day23: 0,
                        day24: 0,
                        day25: 0,
                        day26: 0,
                        day27: 0,
                        day28: 0,
                        day29: 0,
                        day30: 0,
                        day31: 0,
                        sum: 0,
                        avg: 0.0,
                        sub_rate: 0.0,
                        tot_rate: 0.0,
                        topRowspan:-1,
                        midRowspan:-1,
                        topSubtot: false,
                        midSubtot: false,
                    });
                }
            }

            if(depth == 2) {
                this.data.push({
                    topCode: top,
                    topName: this.$store.getters.getCodeName(top),
                    midCode: mid,
                    midName: "Sub Tot.",
                    botCode: 0,
                    botName: "",
                    day1: 0,
                    day2: 0,
                    day3: 0,
                    day4: 0,
                    day5: 0,
                    day6: 0,
                    day7: 0,
                    day8: 0,
                    day9: 0,
                    day10: 0,
                    day11: 0,
                    day12: 0,
                    day13: 0,
                    day14: 0,
                    day15: 0,
                    day16: 0,
                    day17: 0,
                    day18: 0,
                    day19: 0,
                    day20: 0,
                    day21: 0,
                    day22: 0,
                    day23: 0,
                    day24: 0,
                    day25: 0,
                    day26: 0,
                    day27: 0,
                    day28: 0,
                    day29: 0,
                    day30: 0,
                    day31: 0,
                    sum: 0,
                    avg: 0.0,
                    sub_rate: 0.0,
                    tot_rate: 0.0,
                    topRowspan:-1,
                    midRowspan:1,
                    topSubtot: false,
                    midSubtot: true,
                });
            }

            if(depth == 1) {
                this.data.push({
                    topCode: top,
                    topName: "Sub Tot.",
                    midCode: 0,
                    midName: "",
                    botCode: 0,
                    botName: "",
                    day1: 0,
                    day2: 0,
                    day3: 0,
                    day4: 0,
                    day5: 0,
                    day6: 0,
                    day7: 0,
                    day8: 0,
                    day9: 0,
                    day10: 0,
                    day11: 0,
                    day12: 0,
                    day13: 0,
                    day14: 0,
                    day15: 0,
                    day16: 0,
                    day17: 0,
                    day18: 0,
                    day19: 0,
                    day20: 0,
                    day21: 0,
                    day22: 0,
                    day23: 0,
                    day24: 0,
                    day25: 0,
                    day26: 0,
                    day27: 0,
                    day28: 0,
                    day29: 0,
                    day30: 0,
                    day31: 0,
                    sum: 0,
                    avg: 0.0,
                    sub_rate: 0.0,
                    tot_rate: 0.0,
                    topRowspan:1,
                    midRowspan:-1,
                    topSubtot: true,
                    midSubtot: false,
                });
            }

            if(depth == 0) {
                this.data.push({
                    topCode: top,
                    topName: "Grand Tot.",
                    midCode: 0,
                    midName: "",
                    botCode: 0,
                    botName: "",
                    day1: 0,
                    day2: 0,
                    day3: 0,
                    day4: 0,
                    day5: 0,
                    day6: 0,
                    day7: 0,
                    day8: 0,
                    day9: 0,
                    day10: 0,
                    day11: 0,
                    day12: 0,
                    day13: 0,
                    day14: 0,
                    day15: 0,
                    day16: 0,
                    day17: 0,
                    day18: 0,
                    day19: 0,
                    day20: 0,
                    day21: 0,
                    day22: 0,
                    day23: 0,
                    day24: 0,
                    day25: 0,
                    day26: 0,
                    day27: 0,
                    day28: 0,
                    day29: 0,
                    day30: 0,
                    day31: 0,
                    sum: 0,
                    avg: 0.0,
                    sub_rate: 0.0,
                    tot_rate: 0.0,
                    topRowspan:1,
                    midRowspan:-1,
                    topSubtot: true,
                    midSubtot: false,
                });
            }

            //depth 0 loop 종료는 모든 운행을 마친것~
            if(depth === 0) {
                //1. top level rowspan 확인
                let startRowIdx = -1;
                let tempCateName = "";
                let cnt = 0;

                for(idx = 0; idx < this.data.length; idx++) {
                    if(tempCateName !== this.data[idx].topName) {
                        if(startRowIdx >= 0) {
                            this.data[startRowIdx].topRowspan = cnt;
                        }

                        tempCateName = this.data[idx].topName;
                        startRowIdx = idx;
                        cnt = 1;
                    } else {
                        cnt++;
                    }
                }

                if(startRowIdx >= 0) {
                    this.data[startRowIdx].topRowspan = cnt;
                }

                startRowIdx = -1;
                tempCateName = "";
                cnt = 0;
                for(idx = 0; idx < this.data.length; idx++) {
                    if(tempCateName !== this.data[idx].midName) {
                        if(startRowIdx >= 0) {
                            this.data[startRowIdx].midRowspan = cnt;
                        }

                        tempCateName = this.data[idx].midName;
                        startRowIdx = idx;
                        cnt = 1;
                    } else {
                        cnt++;
                    }
                }

                if(startRowIdx >= 0) {
                    this.data[startRowIdx].midRowspan = cnt;
                }
            }
        }
    }
}
</script>

<style scoped>
.contact-history-view {
  text-align:left;
  height: 780px;
  overflow-x: auto;
}

.col_day {
    width:40px;
}

th, td {
    border:1px solid black;
    text-align:center;
}

.topSubtot {
    background-color:#ffcc00;
    font-weight:700;
    border-bottom:4px double black;
    text-align:left;
}

.topSubtot:last-child {
    background-color:#53d7ff;
    font-weight:700;
    border-top:2px solid black;
    border-bottom:2px solid black;
    text-align:left;
}

.midSubtot {
    background-color:#ffff00;
    font-weight:700;
    text-align:left;
}
</style>
