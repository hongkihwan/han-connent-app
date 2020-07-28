<template>
  <div class="contact-history-view">
    <div class="row">
      <div class="col-lg-14">
        <div class="card m-b-30" style="padding: 10px;">
          <div class="card-header">
            <span style="font-weight: bold;">모바일 만족도 조사 결과목록</span>
          </div>

          <div class="row">
            <div class="col-lg-14" style="display:flex;margin-top:15px;align-items:center;">
              <span>이력 추출 일자</span>
              <div style="display: flex;">
                <date-picker style="margin-left:20px;margin-right: 20px;" v-model="date" :popover="{ placement: 'bottom', visibility: 'click' }"/>
              </div>
              <div style="width:70px;">
                <span>상담사</span>
              </div>
              <select class="form-control" style="width:150px;margin-left:20px;margin-right:60px;">
                  <option value="0">전체</option>
                  <option></option>
              </select>
              <div style="width:70px;">
                <span>키워드</span>
              </div>
              <input type="text" class="form-control" style="width:180px;">
              <button class="btn btn-primary" style="margin-left:5px;">조회</button>
              <button class="btn btn-primary" style="width:150px;margin-left:10px;">통계 추출 (Excel)</button>
            </div>
          </div>
      
          <table id="callhist" class="table table-colored-bordered table-bordered-info" style="width:100%;margin-top:20px; table-layout:fixed;">
            <thead>
              <tr>
                <th style="width:60px; text-align:center;">순서</th>
                <th style="width:60px; text-align:center;">구분</th>
                <th style="width:140px; text-align:center;">발송일자</th>
                <th style="width:90px;">상담사</th>                            
                <th style="width:100px; text-align:center;">전화번호</th>                            
                <th style="width:60px; text-align:center;">분류</th>
                <th style="width:60px; text-align:center;">결과</th>
                <th style="text-align:center;">발송내용</th>
                <th style="width:90px;">발송번호</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      date: new Date(),
    }
  }
}
</script>

<style scoped>

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: 0px;
  margin-left: 0px;
}
</style>