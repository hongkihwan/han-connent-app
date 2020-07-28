<template>
  <div class="contact-history-view">
    <div class="row">
      <div class="col-lg-14">
        <div class="card m-b-30" style="padding: 10px;">
          <div class="card-header">
            <span style="font-weight: bold;">월별문의유형별 통계</span>
          </div>

          <div class="row">
            <div class="col-lg-14" style="display:flex;margin-top:15px;align-items:center;">
              <span>통계구분</span>
              <select class="form-control" style="width:150px;margin-left:20px;margin-right:60px;">
                <option value="0">2R 모터사이클</option>
                <option></option>
              </select>
              <date-picker style="margin-left:20px;margin-right: 20px;" v-model="date" :popover="{ placement: 'bottom', visibility: 'click' }"/>
              <button class="btn btn-primary" style="margin-left:5px;">조회</button>
              <button class="btn btn-primary" style="width:150px;margin-left:10px;">통계 추출 (Excel)</button>
            </div>
          </div>
      
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