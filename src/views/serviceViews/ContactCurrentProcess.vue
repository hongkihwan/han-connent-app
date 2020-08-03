<template>
  <div class="Container-Top-agents"> 
    <b-row align-v="center">
      <div class="col-lg-12">
        <div class="card-header" style="display: flex;align-items: center;justify-content: space-between;">
          <span style="font-weight: bold;">상담사 목록</span>
          <b-button variant="primary" @click="addAgent">추가</b-button>
        </div>
      </div>
      <div class="mt-2 ml-2 mr-2" v-for="(item) in agents" :key="item.agentseq">
        <b-card title="상담사 정보" img-src="hankook_logo.png"
        img-alt="Agent-info" img-top tag="agent" style="max-width:20rem;box-shadow: 3px 3px 10px rgba(126, 126, 126, 0.165);" class="mb-2" >
        <b-card-sub-title>(주)한국코퍼레이션</b-card-sub-title>
          <div class="mt-2" style="display:flex;align-items: center;">
            <b-avatar size="4rem" src="https://cdn.vuetifyjs.com/images/john.jpg"/>
            <div class="ml-2">
              <div><span style="font-weight:bold;font-size:20px;"> {{ item.name }}</span><span class="ml-1" style="font-size:13px;" >{{ item.role }} </span></div>
              <div>
                <span style="font-size:15px;">{{ item.agentid }}</span>
                <span class="ml-2">{{ item.station != null ? item.station != ' ' ? item.station : 'NULL' : 'NULL' }}</span>
              </div>
              <!-- <span>{{ item.ctiid != null ? item.ctiid != ' ' ? item.ctiid : 'NULL' : 'NULL' }}</span> -->
            </div>
          </div>
        <b-button class="mt-2" style="width:100%;" variant="primary" @click="modifyAgentData(item)">수정</b-button>
        </b-card>
      </div>
    </b-row>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  data() {
    return {
      agents: [],
      agentInfoObj: {
        // 상담사 정보관리 Object
        agentId: '',
        agentName: '',
        agentStation: '',
        ctiId:'',
        agentRole:'',
        // TABLE에 tanantid를 제거하면 반드시 없애기
        tanantid: 3,
        agentPassword: 1111111111,
      }
    }
  },
  mounted() { 
    this.loadAgent();
  },
  methods: {
    async addAgent() {
      const { value: formValues } = await Swal.fire({
        icon: 'info',
        title: "상담사 정보",
        allowOutsideClick: false,
        focusConfirm: false,
        confirmButtonText: '등록' ,
        html: `<div>
                <div>
                  <span style="font-weight:bold;">소속회사명 : </span>
                  <input id="agentCompanyId" style="text-align: center;" autofocus />
                </div>
                <div style="display: flex; justify-content: space-around; align-items: center;margin-top: 10px;">
                  <div >
                    <span style="font-weight:bold;">CTIID : </span>
                    <input id="agentCtiId" style="width: 80px;text-align: center;"/>
                  </div>
                  <div >
                    <span style="font-weight:bold;">상담사 : </span>
                    <input id="agentName" style="width: 80px;text-align: center;"/>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-around; align-items: center;margin-top: 10px;">
                  <div>
                    <span style="font-weight:bold;">내선번호 : </span>
                    <input id="agentStation" style="width: 80px;text-align: center;" />
                  </div>
                  <div>
                    <span style="font-weight:bold;">권한 : </span>
                    <select id="agentRole" style="margin-left:5px;">
                      <option value="none">선택</option>
                      <option value="AGENT">AGENT</option>
                      <option value="CLINET">CLINET</option>
                      <option value="KMS">KMS</option>
                      <option value="MANAGER">MANAGER</option>
                    </select>
                  </div>
                </div>
               </div>`,
            preConfirm: () => {
              return  {
                agentCtiId : document.getElementById('agentCtiId').value,
                agentName : document.getElementById('agentName').value,
                companyId : document.getElementById('agentCompanyId').value,
                agentStation: document.getElementById('agentStation').value,
                agentRole: document.getElementById('agentRole').value,
              }
            }
        });
      if(formValues) {
        console.log('[component-ContactCurrentProcess-addAgent] / ',JSON.stringify(formValues));
      }

      // console.log('[Components-ContactCurrentProcess-addAgent] AgentInfo Object : ', this.agentInfoObj);
      // if(this.agentInfoObj["agentId"] == "" || this.agentInfoObj["agentName"] == "" 
      //   || this.agentInfoObj["agentStation"] == "" || this.agentInfoObj["ctiId"] == "" || this.agentInfoObj["agentRole"] == "") {
      //   self.$swal({ 
      //     text: '입력값을 확인해주세요',
      //     width: 300,
      //     icon: 'warning',
      //     allowOutsideClick: false
      //   });
      // }else {
      //   self.$swal({
          
      //   });
      //   axios.post('http://localhost:8081/api/agent/addAgent', this.agentInfoObj)
      //   .then(function (res) {
      //       if(res.data.result === true) {
      //         self.$swal({ 
      //           title: '결과내용',
      //           text:'성공적으로 추가되었습니다.',
      //           width:300,
      //           icon:'success',
      //           allowOutsideClick: false
      //         });
      //       }else {
              
      //         self.$swal({ 
      //           title: '결과내용',
      //           text: '이미있는 정보 이므로 추가할 수 없습니다. ',
      //           width:300,
      //           icon:'error',
      //           allowOutsideClick: false
      //         });
      //       }
      //   });
      //   // this.clearInputBox();
      // }
    },
    async modifyAgentData(item) {
      let agentData = JSON.parse(JSON.stringify(item));
      console.log('[agentData] : ', agentData);

      const { value: formValues } = await Swal.fire({
        icon: 'info',
        width: 400,
        title: "상담사 정보",
        allowOutsideClick: false,
        confirmButtonText: '확인',
        focusConfirm: false,
        html: `<div>
                <div style="display:flex;justify-content: space-evenly;">
                  <div>
                    <span style="font-weight:bold;">CTIID : </span>
                    <span id="ctiId">${agentData.ctiid}</span>
                  </div>
                  <div>
                    <span style="font-weight:bold;">상담사 : </span>
                    <span id="agentName" >${agentData.name}</span>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-around; align-items: center;margin-top: 10px;">
                  <div>
                    <span style="font-weight:bold;">내선번호 : </span>
                    <input id="agentStation" style="width: 80px;text-align: center;" value="${agentData.station}">
                  </div>
                  <div>
                    <span style="font-weight:bold;">권한 : </span>
                    <select id="agentRole" style="margin-left:5px;">
                      <option value="${agentData.role}">${agentData.role}</option>
                      <option value="AGENT">AGENT</option>
                      <option value="CLINET">CLINET</option>
                      <option value="KMS">KMS</option>
                      <option value="MANAGER">MANAGER</option>
                    </select>
                  </div>
                </div>
               </div>`,
        preConfirm: () => {
          return  {
            agentSeq: agentData.agentseq,
            agentName: document.getElementById('agentStation').value,
            agentRole: document.getElementById('agentRole').value,
          }
        }
      });
      if(formValues) {
        console.log(JSON.stringify(formValues));
      }
    },
    modifyAgent() {
      let self=this;
      console.log('[Components-ContactCurrentProcess-modifyAgent] AgentInfo Object : ', this.agentInfoObj);

      if(this.agentInfoObj["agentId"] == "" || this.agentInfoObj["agentName"] == "" 
        || this.agentInfoObj["agentStation"] == ""|| this.agentInfoObj["ctiId"] == "" || this.agentInfoObj["agentRole"] == "") {
        self.$swal({ 
          text: '입력값을 확인해주세요',
          width: 300,
          icon: 'warning',
          allowOutsideClick: false
        });
      }else {
        axios.post('http://localhost:8081/api/agent/update', this.agentInfoObj)
        .then(function (res) {
            if(res.data.result === true) {
              self.$swal({ 
                title: '결과내용',
                text:'성공적으로 수정되었습니다.',
                width:300,
                icon:'success',
                allowOutsideClick: false
              });
            }else {
              self.$swal({ 
                title: '결과내용',
                text: '서버확인이 필요합니다.',
                width:300,
                icon:'error',
                allowOutsideClick: false
              });
            }
        });
        // this.clearInputBox();
      }
    },
    agentInfo(index) {
      this.agentInfoObj["agentId"] = this.agents[index].agentid;
      this.agentInfoObj["agentName"] = this.agents[index].name;
      this.agentInfoObj["agentStation"] = this.agents[index].station;
      this.agentInfoObj["ctiId"] = this.agents[index].ctiid;
      this.agentInfoObj["agentRole"] = this.agents[index].role;            
    },
    clearInputBox() {
      this.agentInfoObj["agentId"] = '';
      this.agentInfoObj["agentName"] = '';
      this.agentInfoObj["agentStation"] = '';
      this.agentInfoObj["ctiId"] = '';
      this.agentInfoObj["agentRole"] = '';
    },
    loadAgent() {
      let self=this;
      // console.log(process.env.VUE_APP_API_URL);
      axios.get(process.env.VUE_APP_API_URL+'/api/agent/3')
      .then(function (res) {
        if(res.data.result === true) {
          self.agents = res.data.items;
        }else {
          self.$swal({ 
          title: '결과내용',
          text: '서버확인이 필요합니다.  ',
          width: 300,
          icon:'error',
          allowOutsideClick: false
        });
        }
      }).catch(error => {
        self.$swal({ 
          title: '결과내용',
          text: '서버확인이 필요합니다. : '+ error,
          width: 300,
          icon:'error',
          allowOutsideClick: false
        });
      });
    },
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.Container-Select {
  width: 150px;
  height: 35px;
  margin-left: 20px;
  margin-right: 30px;
  text-align-last: center;
  border: 0.5px solid rgba(218, 218, 218);
}
.Container-list-group-item div:hover{
  cursor:pointer;
  color: blue;
  text-align: center;
  font-weight: bold;
}
.Container-Top-agents {
  width: 100%;
  height:780px;
  overflow-y: auto;
}

.Container-CurrentProcess {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.Container-AgentInfo {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.table-colored-bordered.table-bordered-info thead th {
  color:rgba(126, 126, 126, 0.165);
  font-weight:600;
  text-align: center;
  background-color: #f0f0f2;
}
</style>