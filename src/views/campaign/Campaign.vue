<template>
  <div class="contact-history-view">
    <div class="row">
      <div class="col-lg-12">
        <div class="card m-b-30" style="padding: 10px;">
          <div class="card-header" >
            <span style="font-weight: bold;">캠페인 데이터 목록</span>
          </div>
          <div class="row">
            <div class="Container-title">
              <span style="width:80px;margin-top:5px;margin-left:3px; margin-right:3px;">파일선택</span>
              <b-form-file v-model="file" type="file" accept=".xlsx" autofocus style="width:350px;" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..." />
              <button class="btn btn-primary ml-5" @click="uploadFile()">업로드</button>
              <button class="Button-select btn btn-primary" @click="loadAllData()">전체조회</button>
            </div>
          </div>
          <div class="Container-Tables">
            <div class="Container-fileInfo ml-3 mr-3">
              <div>
                <table class="table table-colored-bordered table-bordered-info" style="width:100%;margin-top:20px; table-layout:fixed;text-align:center;">
                  <thead>
                    <tr>
                      <th style="width: 60px">순서</th>
                      <th style="width: 260px">파일이름</th>
                      <th style="width: 235px">파일경로</th>
                      <th >등록일자</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(item,index) in fileInfoList">
                      <tr :key="index">
                        <td >{{ item.file_seq }}</td>
                        <td class="details" @click="fileDownLoad(item)">{{ item.file_name }}</td>
                        <td class="details" @click="seqFileData(item)">{{ item.file_Path }}</td>
                        <td>{{ $moment(item.file_regDate).format('YYYY-MM-DD HH:mm:ss') }}</td>
                      </tr>
                    </template>
                    <template v-if="fileInfoList.length <= 0"> 
                      <tr>
                        <td colspan=7 class="text-center">NO DATA Select Condition</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
              <div class="Container-PageArea">
                <ul>
                  <!-- 이전 페이지 버튼 -->
                  <li class="page-item" :class="{ disabled: fileInfo_pageData.isFirst }">
                    <div
                      class="page-link"
                      aria-label="Previous"
                      @click="infoPagingProc(1)">
                      &laquo;
                    </div>
                  </li>
                  <li class="page-item" :class="{ disabled: fileInfo_pageData.isFirst }">
                    <div
                      class="page-link"
                      @click="infoPagingProc(fileInfo_pageData.currentPage * 1 - 2)"
                    >
                      &lsaquo;
                    </div>
                  </li>
                  <!-- 페이지 번호 반복문 : 페이지번호에 active 클래스 주는 조건문 추가 필요 -->
                  <li v-for="i in fileInfo_pageData.pageBtns" :key="i" class="page-item">
                    <div @click="infoPagingProc(i)">
                      <span class="page-link">
                        {{ i }}
                        <span class="sr-only">(current)</span>
                      </span>
                    </div>
                  </li>
                  <!-- 다음 페이지 버튼 -->
                  <li class="page-item" :class="{ disabled: fileInfo_pageData.isLast }">
                    <div
                      class="page-link"
                      @click="infoPagingProc(fileInfo_pageData.currentPage * 1 + 2)"
                    >
                      &rsaquo;
                    </div>
                  </li>
                  <li class="page-item" :class="{ disabled: fileInfo_pageData.isLast }">
                    <div
                      class="page-link"
                      aria-label="Next"
                      @click="infoPagingProc(fileInfo_pageData.endPage)">
                      &raquo;
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="ml-3 mr-5">
              <div>
                <table class="table table-colored-bordered table-bordered-info" style="width:100%;margin-top:20px; table-layout:fixed;text-align:center;">
                  <thead>
                    <tr>
                      <th style="width:60px">순서</th>
                      <th style="width:80px">번호</th>
                      <th style="width:200px">제목</th>
                      <th style="width:100px">내용</th>
                      <th style="width:90px;">파일번호</th>
                      <th>파일이름</th>
                      <th>등록일자</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(item,index) in fileDataList">
                      <tr :key="index">
                        <td>{{ item.t_no }}</td>
                        <td>{{ item.t_number }}</td>
                        <td>{{ item.t_title }}</td>
                        <td class="details">{{ item.t_content }}</td>
                        <td class="details">{{ item.file_seq }}</td>
                        <td class="details">{{ item.file_name }}</td>
                        <td class="details">{{ $moment(item.file_regDate).format('YYYY-MM-DD HH:mm:ss') }}</td>
                      </tr>
                    </template>
                    <template v-if="fileDataList.length <= 0"> 
                      <tr>
                        <td colspan=7 class="text-center">NO DATA Select Condition</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
              <div class="Container-PageArea">
                <ul>
                  <!-- 이전 페이지 버튼 -->
                  <li class="page-item" :class="{ disabled: fileData_pageData.isFirst }">
                    <div
                      class="page-link"
                      aria-label="Previous"
                      @click="dataPagingProc(1)">
                      &laquo;
                    </div>
                  </li>
                  <li class="page-item" :class="{ disabled: fileData_pageData.isFirst }">
                    <div
                      class="page-link"
                      @click="dataPagingProc(fileData_pageData.currentPage * 1 - 2)"
                    >
                      &lsaquo;
                    </div>
                  </li>
                  <!-- 페이지 번호 반복문 : 페이지번호에 active 클래스 주는 조건문 추가 필요 -->
                  <li v-for="i in fileData_pageData.pageBtns" :key="i" class="page-item">
                    <div @click="dataPagingProc(i)">
                      <span class="page-link">
                        {{ i }}
                        <span class="sr-only">(current)</span>
                      </span>
                    </div>
                  </li>
                  <!-- 다음 페이지 버튼 -->
                  <li class="page-item" :class="{ disabled: fileData_pageData.isLast }">
                    <div
                      class="page-link"
                      @click="dataPagingProc(fileData_pageData.currentPage * 1 + 2)"
                    >
                      &rsaquo;
                    </div>
                  </li>
                  <li class="page-item" :class="{ disabled: fileData_pageData.isLast }">
                    <div
                      class="page-link"
                      aria-label="Next"
                      @click="dataPagingProc(fileData_pageData.endPage)">
                      &raquo;
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters} from 'vuex'
import { uploadFile, uploadToData } from "@/api/utils.js";
// import { makePageData } from "@/js/common.js";
//import { makePageData, makeDate } from "@/api/common.js";

export default {

  data() {
    return {
      file: null, 
      /** 파일 데이터 현재 페이지 기록 */ 
      fileDataCurPage: 0, 
      /** 클릭한 seqNumber */
      file_seq_Number: 0,
      /** 페이지 번호 */
      pageNo: 0,
      /** 한페이지에 표시할 게시물 수 */
      pagePerCount: 10,
      /** 페이지 처리에 사용하는 값 */
    }
  },
  mounted() {
    this.loadAllData();
  },
  computed: {
    ...mapGetters({
      fileInfoList: 'campaign/getDataInfoList',
      fileInfoListCnt: 'campaign/getDataInfoListCnt',
      fileInfo_pageData: 'campaign/getInfoPageData',

      fileDataList: 'campaign/getDataList',
      fileDataListCnt: 'campaign/getDataListCnt',
      fileData_pageData: 'campaign/getPageData'
    }),
  },
  methods: {
    async infoPagingProc(reqPage) {
      // Campaign Info 데이터의 페이지 버튼을 누를때마다 처리한다. 
      // Campaign 데이터 불러오기 
      if (!reqPage || reqPage==0) {
          reqPage = this.pageNo + 1;
      }
      let fileInfoParams = {
        file_infoListCnt: this.fileInfoListCnt,
        pagePerCount: this.pagePerCount,
        reqPage,
      };
      await this.$store.dispatch('campaign/fileInfoList', fileInfoParams, { root: true });
      await this.$store.dispatch('campaign/fileInfoPageSetting', fileInfoParams, { root: true });
    },

    async dataPagingProc(reqPage) {
      // Campaign 데이터의 페이지 버튼을 누를때마다 처리한다.
      // Campaign 데이터 불러오기
      if (!reqPage || reqPage==0) {
          reqPage = this.pageNo + 1;
      }
      
      let fileDataParams = {
        file_seq: this.file_seq_Number,
        file_dataListCnt: this.fileDataListCnt,
        pagePerCount: this.pagePerCount,
        reqPage,
      };
      console.log('[Campaign-dataPagingProc] reqPage : ', reqPage);
      console.log('[Campaign-dataPagingProc] file_seq_Number : ', this.file_seq_Number);

      await this.$store.dispatch('campaign/fileDataList', fileDataParams, { root: true });
      await this.$store.dispatch('campaign/fileDataPageSetting', fileDataParams, { root: true });
      // await this.$store.commit('campaign/setPageData', pageData);
    },
    async loadAllData() {
      // 전체 데이터 조회시 처리.
      let file_seq=0;
      let reqPage=0;
      this.file_seq_Number=0;

      if(!reqPage || reqPage==0) {
        reqPage= reqPage +1;
      }

      let fileDataParams = {
        file_seq: this.file_seq_Number,
        file_dataListCnt: this.fileDataListCnt,
        pagePerCount: this.pagePerCount,
        reqPage,
      };

      let fileInfoParams = {
        file_infoListCnt: this.fileInfoListCnt,
        pagePerCount: this.pagePerCount,
        reqPage,
      };

      await this.$store.commit('campaign/setInitialize');
      // File Info 페이징 처리 및 데이터 로드
      await this.$store.dispatch('campaign/fileInfoListCnt', fileInfoParams, { root: true });
      await this.$store.dispatch('campaign/fileInfoPageSetting', fileInfoParams, { root: true });
      await this.$store.dispatch('campaign/fileInfoList', fileInfoParams, { root: true });
      // 파일 데이터 로드 
      await this.$store.dispatch('campaign/fileDataListCnt', file_seq, { root: true });
      await this.$store.dispatch('campaign/fileDataPageSetting', fileDataParams, { root: true });
      await this.$store.dispatch('campaign/fileDataList', fileDataParams, { root: true });
    },
    async uploadFile() {
      if(this.file == undefined || this.file.length == 0 || this.file == null) {
        let type = 'error';
        let htmlMessage = `<div class="text-white"><p class="h6">파일을 확인해주세요.</p></div>`;
        this.makeToast(type, htmlMessage);
      }else {
        let fileNameChk = this.file.name.slice(this.file.name.indexOf(".")+1).toLowerCase();
        
        if(fileNameChk != "xlsx") {
          let type = 'error';
          let htmlMessage = `<div class="text-white"><p class="h6">엑셀파일(.xlsx)만 등록가능합니다.</p></div>`;
          this.makeToast(type, htmlMessage);
          
          this.file = null;
        }else {
          let formData = new FormData();
          formData.append('file', this.file);
        
          await uploadFile(formData)
          .then((res) => {
              console.log('[DEBUG] campaignRegistry/makeToast this DATA : ', this);
              let type='success';
              let htmlMessage = `<div class="text-white"><p class="h6">성공적으로 파일이 등록되었습니다.</p></div>`;
              this.makeToast(type, htmlMessage);
              this.file = null;
              console.log('[API uploadFile RESULT]-SuccessMessage : ', res);
          })
          .catch((error) => {
              console.log('[API uploadFile ERROR]-ErrorMessage : ', error);
              this.file = null;
          });
          await uploadToData(formData)
            .then((res) => {
              let type='success';
              let htmlMessage = `<div class="text-white"><p class="h6">성공적으로 데이터가 등록되었습니다.</p></div>`;
              this.makeToast(type, htmlMessage);
              console.log('[API uploadToData RESULT]-SuccessMessage] : ', res);
            }).catch((error) => {
              console.log('[API uploadToData ERROR]-ErrorMessage : ', error);
            });
        }
      }
    },
    async seqFileData(items) {
      // 파일을 선택했을때 처리
      let jsonObj = JSON.parse(JSON.stringify(items));
      let seqNumber = jsonObj.file_seq;
      this.file_seq_Number=seqNumber;
      console.log('[Campaign-seqFileData] items Object Process :', seqNumber);

      let reqPage=0;

      if (!reqPage || reqPage==0) {
        reqPage = this.pageNo + 1;
      }

      let fileDataParams = {
        file_seq: seqNumber,
        file_dataListCnt: this.fileDataListCnt,
        pagePerCount: this.pagePerCount,
        reqPage,
      };

      await this.$store.dispatch('campaign/fileDataListCnt', seqNumber, { root: true });
      await this.$store.dispatch('campaign/fileDataList', fileDataParams, { root: true });
      await this.$store.dispatch('campaign/fileDataPageSetting', fileDataParams, { root: true });
    },
    fileDownLoad(link) {
      let jsonObj = JSON.parse(JSON.stringify(link));
      window.location.href = jsonObj.file_Path;
    },
    
    makeToast(type, htmlMessage) {
      // Message 처리.
      this.$toast.open({
        type: type,
        position:'top-right',
        message: htmlMessage, 
        duration: 3000,
        dismissible: true
      });
    },
  }
}
</script>

<style scoped>
.contact-history-view {
  text-align:left;
  height:780px;
  overflow-x: auto;
  overflow-y: auto;
}
.Container-Tables {
  display: flex;
  width:100%;
  justify-content: center;
}
.Container-title {
  display:flex;
  width: 100%;
  justify-content: center;
  margin-left:10px;
  margin-top:20px;
}
.table-colored-bordered.table-bordered-info thead th {
  color:#000030;
  text-align: center;
  background-color: #f0f0f2;
}
.Container-fileInfo tbody > tr:hover {
  color:#2196f3;
  cursor: pointer;
}
.details {
  max-width: 130px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap; 
}
.Button-select {
  width: 100px;
  margin-left:10px;
}
.Container-PageArea {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 35px;
  text-align: center;
}
.Container-PageArea ul {
  list-style: none;
  display: flex;
}
.Container-PageArea li {
  margin: 0 10px;
}
.Container-PageArea .disabled {
  display: none;
}
</style>