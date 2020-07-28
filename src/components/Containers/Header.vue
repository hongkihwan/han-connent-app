<template>
  <div class="Container-Header">
    <b-navbar style="background-color: #000051;" toggleable="lg" type="dark">
    <b-navbar-brand href="#">
        HANCONNECT
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/contect" class="white--text">고객상담</b-nav-item>
        <b-nav-item to="/contacthistory" class="ml-3 mr-3">전체통화메모이력</b-nav-item>
        <b-nav-item to="/contactSmsHistory">전체SMS발송이력</b-nav-item>
        <b-nav-item-dropdown class="ml-3 mr-3" text="REPORT" left>
          <b-dropdown-item to="/surveyreport">만족도조사결과</b-dropdown-item>
          <b-dropdown-item to="/dailyreport">DailyREPORT</b-dropdown-item>
          <b-dropdown-item to="/monthlyreport">MonthlyREPORT</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item class="white--text" to="/contactCurrentProcess">상담사관리</b-nav-item>
        <b-nav-item class="white--text" to="/contactQuestionTitle">문의유형관리</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="white--text">상담사 이름</b-nav-item>
        <b-avatar button badge src="https://cdn.vuetifyjs.com/images/john.jpg" @click="agentData"/>
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
#nav-collapse :hover {
  font-weight: bold;
}
#nav-collapse a.router-link-exact-active {
  color: white;
  font-weight: bold;
}
</style>