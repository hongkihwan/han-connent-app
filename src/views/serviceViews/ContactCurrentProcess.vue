<template>
  <div>
    <div class="Container-CurrentProcess">
      <div>
        <b-list-group v-for="(item, index) in agents" :key="item.agentseq" @click="agentInfo(index)">
          <b-list-group-item style="cursor:pointer;">
            <b-avatar size="2em" src="https://cdn.vuetifyjs.com/images/john.jpg" badge badge-variant="success" variant="secondary"/>
            <span class="ml-3">ID : {{item.agentid}}</span>
            <span class="ml-5 mr-5">상담사이름 : {{item.name}}</span>
            <span class="ml-5 mr-5">내선번호 : {{item.station}}</span>
            <span class="ml-5 mr-5">CTI ID : {{item.ctiid}}</span>
            <span>역할 : {{item.role}}</span>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <div class="Container-AgentInfo">
      <div style="display: flex;align-items: center;">
        <div class="mr-2">
          <span>아이디</span>
        </div>
        <input v-model="agentId" type="text" class="form-control" style="width:100px;">
      </div>
      <div class="ml-2 mr-2" style="display: flex;align-items: center;">
        <div class="mr-2">
          <span>상담사이름</span>
        </div>
        <input v-model="agentName" type="text" class="form-control" style="width:130px;">
      </div>
      <div style="display: flex;align-items: center;">
        <div class="mr-2">
          <span>내선번호</span>
        </div>
        <input v-model="agentStation" type="text" class="form-control" style="width:100px;">
      </div>
      <div class="ml-2 mr-2" style="display: flex;align-items: center;">
        <div class="mr-2">
          <span>CTI ID</span>
        </div>
        <input v-model="ctiId" type="text" class="form-control" style="width:100px;">
      </div>
      <div style="display: flex;align-items: center;">
        <div class="mr-2" >
          <span>역할</span>
        </div>
        <input v-model="agentRole" type="text" class="form-control" style="width:100px;">
      </div>
      <button class="ml-3 btn btn-primary" >추가</button>
      <button class="ml-3 btn btn-primary" >수정</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      agents: [],
      agentId: '',
      agentName: '',
      agentStation: '',
      ctiId:'',
      agentRole:'',
    }
  },
  mounted() { 
    this.loadAgent();
  },
  methods: {
    agentInfo(index) {
      this.agentId = this.agents[index].agentid;
      this.agentName = this.agents[index].name;
      this.agentStation = this.agents[index].station;
      this.ctiId = this.agents[index].ctiid;
      this.agentRole = this.agents[index].role;            
    },
    loadAgent: function () {
      let self=this;
      // console.log(process.env.VUE_APP_API_URL);
      axios.get(process.env.VUE_APP_API_URL+'/api/agent/3')
      .then(function (res) {
          if(res.data.result === true) {
            self.agents = res.data.items;
          }
      });
    },
  }
}
</script>

<style scoped>
.Container-CurrentProcess {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.Container-AgentInfo {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>