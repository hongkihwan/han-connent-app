<template>
  <div class="Container-Header">
    <b-navbar style="background-color: #000051;" toggleable="lg" type="dark">
    <b-navbar-brand to="/contact">
      HANCONNECT
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/contact" class="white--text">고객상담</b-nav-item>
        <b-nav-item to="/contacthistory" class="ml-3 mr-3">전체통화메모이력</b-nav-item>
        <b-nav-item to="/contactSmsHistory">전체SMS발송이력</b-nav-item>
        <b-nav-item-dropdown class="ml-3 mr-3" text="REPORT">
          <b-dropdown-item to="/surveyreport">만족도조사결과</b-dropdown-item>
          <b-dropdown-item to="/dailyreport">DailyREPORT</b-dropdown-item>
          <b-dropdown-item to="/monthlyreport">MonthlyREPORT</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown class="mr-3" text="캠페인">
          <b-dropdown-item to="/campaign">파일등록</b-dropdown-item>
          <b-dropdown-item to="/campaignRegister">데이터생성</b-dropdown-item>
          <b-dropdown-item to="/campaignConfirm">데이터확인</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item class="white--text" to="/contactCurrentProcess">상담사관리</b-nav-item>
        <b-nav-item class="white--text" to="/contactQuestionTitle">문의유형관리</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="white--text">상담사 이름</b-nav-item>
        <div>
          <div>
            <b-avatar style="cursor:pointer;" src="https://cdn.vuetifyjs.com/images/john.jpg" id="popover-reactive-1" variant="primary" @click="agentData" />
          </div>
          <b-popover
            target="popover-reactive-1"
            placement="bottom">
            <template v-slot:title>
              <div style="display: flex;justify-content: center; ">
               상담사 정보
              </div>
            </template>

            <div style="display: flex;">
              <div style="display: flex;align-items: center;">
                <b-avatar src="https://cdn.vuetifyjs.com/images/john.jpg" size="4rem"/>
              </div>
              <div class="ml-3">
                <div>
                  <span>(주)한국코퍼레이션</span>
                </div>
                <div>
                  <span>소속부서명</span>
                </div>
                <div>
                  <span>홍길동</span>
                </div>
              </div>
            </div>
            <div>
              <b-button style="width:100%;" class="mt-2 btn btn-primary" to="/contact">로그아웃</b-button>
            </div>
            </b-popover>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>  
  </div>
</template>

<script>
export default {
  methods: {
    agentData() {

    }
  }
}
</script>

<style scoped>
b-nav-item :hover {
  color: white;
}
#nav-collapse a.router-link-exact-active {
  color: white;
  font-weight: bold;
}
.popover-header h3 {
  background-color: #303f9f;
}
</style>