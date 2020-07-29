<template>
  <div class="uni-contact-view" style="height:100%;">
    <div class="contact-content" style="height:100%;">
      <div class="row" style="height:322px;">
        <div class="col-lg-7" style="padding-right: 0px;">
          <div class="row">
            <div class="col-lg-5" style="padding-right: 0px;padding-left: 0px;">
              <div class="card m-b-30" style="height:200px;">
                <div class="card-header">
                  <span>고객 정보</span>
                </div>
                <CustInfo/>
              </div>

              <div class="card m-b-30" style="height:200px;">
                <div class="card-header">
                  <span>콜백 목록</span>
                </div>

                <div style="height:100%;overflow:auto;">
                  <table style="width:100%;text-align:left;">
                    <tr>
                      <th>No.</th>
                      <th>일시</th>
                      <th>연락번호</th>
                    </tr>
                    <tr>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-lg-7" style="padding-right: 0px;">
              <div class="card m-b-30" style="height:400px;">
                <div class="card-header">
                  <span>통화메모</span>
                </div>
                <ContactMemo/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12" style="padding-left: 0px;padding-right: 0px;">
              <div class="card m-b-30" style="height:380px;">
                <div class="card-header">
                  <span>통화메모이력</span>
                </div>
                <ContactMemoHistory/>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="card m-b-30">
            <div class="card-header">
                <span>Agent Assistant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import CustInfo from '@/components/CustomerInfo/CustInfo.vue';
import ContactMemo from '@/components/Contact/ContactMemo.vue';
import ContactMemoHistory from '@/components/Contact/ContactMemoHistory.vue';

export default {
  components: {
    CustInfo,
    ContactMemo,
    ContactMemoHistory
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: 0px;
  margin-left: 0px;
}

.uni-hcs-custinfo {
  height:440px;
}

.uni-contact-note {
  height:125px;
}

.atomy_title {
  color:rgb(0,181,239);
}

.roundbox {
  background-color:#d2ecf3;
  border-radius: 10px 10px;    
  width:250px;
  font-size:10pt;
  color:#525252;
  margin-bottom:20px;
  padding:15px 15px;
  text-align:left;
}

.leftbox {
  text-align:left;
}

.leftbox:after {
  clear:both;
}

.rightbox {
  text-align:right;
}

.rightbox:after {
  clear:both;
}

.uni-contact-view table td {
  border: 1px solid #e0e0e0;
  font-size:10pt;
  padding:4px 4px 4px 10px;
  text-align:center;
  background-color:#fafafa;
}

.uni-contact-view table th {
  border: 1px solid #e0e0e0;
  background-color:#f0f0f2;
  font-size:10pt;
  text-align:center;
  color:#999999;
  width:60px;
}
</style>