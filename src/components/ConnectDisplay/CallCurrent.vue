<template>
  <div class="Conntainer-Type">
        <div style="width: 100%; display:flex;justify-content:center;">
            <div class="pt-2">
                <div class="performance-item">
                    <div class="performance-title text-white">응대호</div>
                    <div class="performance-value black--text"><span>0 콜</span></div>
                </div>
                <div class="performance-item">
                    <div class="performance-title text-white">통화시간</div>
                    <div class="performance-value black--text"><span>00 : 00 : 00</span></div>
                </div>
                <div class="performance-item">
                    <div class="performance-title text-white">인바운드</div>
                    <div class="performance-value black--text"><span>0 콜</span></div>
                </div>
                <div class="performance-item">
                    <div class="performance-title text-white">아웃바운드</div>
                    <div class="performance-value black--text"><span>0 콜</span></div>
                </div>
            </div> 
        </div>
        <div class="mt-4" style="display:flex;justify-content:center;">
            <div class="Container-mini-call-display">
                <table class="callmonitor-title">
                    <thead>
                        <tr>
                            <td class="callmonitor-thead">고객대기</td>
                            <td class="callmonitor-thead">서비스레벨</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="callmonitor-tbody"><div>0</div></td>
                            <td class="callmonitor-tbody"><div>0<span>%</span></div></td>
                        </tr>
                    </tbody>
                </table>
                <table class="callmonitor-title">
                    <thead>
                        <tr>
                            <td class="callmonitor-thead">응대율</td>
                            <td class="callmonitor-thead">상담대기</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="callmonitor-tbody"><div>{{ 0 }}<span>%</span></div></td>
                            <td class="callmonitor-tbody"><div>{{ 0 }}건</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.Conntainer-Type  {
  height: 330px;
  width: 100%; 
  background-color: #3949ab;
}
.Container-customer-service-Representatatives {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.Container-mini-call-display .callmonitor-title {
  margin-bottom: 2px;
  border-collapse: separate;
  border-spacing: 3px;
} 

.performance-item {
  display: flex;
  justify-content: center;
  margin: 5px;
}
.performance-title {
  display: flex;
  justify-content: center;
  background-color:#78909C;
  border-radius:7px 0px 0px 7px;
  padding:3px 5px;
  width:100px;
  height:25px;
  font-size:14px;
}
.performance-value {
  display: flex;
  justify-content: center;
  background-color:#ffffff;
  border-radius:0px 7px 7px 0px;
  padding: 3px 5px;
  width: 105px;
  height: 25px;
  font-size: 14px;
}
.callmonitor-thead {
  height: 25px;
  background-color:#78909C;
  font-size: 14px;
  color: white;
  text-align: center;
  border-radius: 5px 5px 0px 0px;
}
.callmonitor-tbody {
  width: 100px;
  background-color:#ffffff;
  text-align: center;
  font-size: 25px;
  height: 45px;
  border-radius: 0px 0px 5px 5px;
}
</style>