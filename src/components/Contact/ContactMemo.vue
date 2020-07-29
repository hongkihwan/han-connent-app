<template>
  <div class="uni-mpcjob-contact">

    <div class="contact-select-menu">
        <div style="display:flex;">
            <div class="contact-select-item" :class="{'contact-active-item':index === curIndex}" v-for="(item,index) in contacts" :key="index">
                <span @click="selectContact(index)">상담답변 {{index+1}}</span>
                <button @click="closeContact(index)" v-if="contacts.length > 1 ">X</button>
            </div>
            <button class="btn contact-add-btn" @click="addContact">+</button>
        </div>
    </div>
    <form role="form">
        <table>
            <tr>
                <td>
                    <div style="text-align:left;margin-left:5px;">인입구분</div>
                </td>
                <td>
                    <div style="text-align:left;margin-left:5px;">차량종류</div>
                </td>
            </tr>
            <tr>
                <td class="uni-mpcjob-contact-col1">                        
                    <select class="form-control input-sm" v-model="contacts[curIndex].valInboundType" @change="changeBrand">
                        <option value=0>선택하세요</option>
                        <option v-for="item in contacts[curIndex].inboundType" :key="item.codeseq" :value="item.codeseq">{{item.cdname}}</option>
                    </select>
                </td>
                <td>
                    <select class="form-control">
                        <option value=0>선택하세요</option>
                        <option v-for="item in contacts[curIndex].carModel" :key="item.codeseq" :value="item.codeseq">{{item.cdname}}</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <div style="text-align:left;margin-left:5px;">통화유형</div>
                </td>
                <td>
                    <div style="text-align:left;margin-left:5px;">통화결과</div>
                </td>
            </tr>
            <tr>
                <td class="uni-mpcjob-contact-col1">                        
                    <select class="form-control input-sm" v-model="contacts[curIndex].valCallType">
                        <option value=0>선택하세요</option>
                        <option v-for="item in contacts[curIndex].callType" :key="item.codeseq" :value="item.codeseq">{{item.cdname}}</option>
                    </select>
                </td>
                <td class="uni-mpcjob-contact-col1">
                    <select class="form-control" v-model="contacts[curIndex].valCallResult">
                        <option value=0>선택하세요</option>
                        <option v-for="item in contacts[curIndex].callResult" :key="item.codeseq" :value="item.codeseq">{{item.cdname}}</option>
                    </select>
                </td>
            </tr>
        </table>

        <div style="text-align:left;margin-left:5px;">문의유형</div>
        <table>
            <tr>
                <td class="uni-mpcjob-contact-col1">                        
                    <select class="form-control input-sm" v-model="contacts[curIndex].valCateTop" @change="changeCateTop">
                        <option value=0>대분류</option>
                        <option v-for="item in contacts[curIndex].cateTop" :key="item.codeseq" :value="item.codeseq">{{item.cdname}} ({{item.codeseq}})</option>
                    </select>
                </td>
                <td class="uni-mpcjob-contact-col1">
                    <select class="form-control" v-model="contacts[curIndex].valCateMid" @change="changeCateMid">
                        <option value=0>중분류</option>
                        <option v-for="item in contacts[curIndex].cateMid" :key="item.codeseq" :value="item.codeseq">{{item.cdname}} ({{item.codeseq}})</option>
                    </select>
                </td>
                <td class="uni-mpcjob-contact-col1">
                    <select class="form-control" v-model="contacts[curIndex].valCateBot" @change="changeCateBot">
                        <option value=0>소분류</option>
                        <option v-for="item in contacts[curIndex].cateBot" :key="item.codeseq" :value="item.codeseq">{{item.cdname}} ({{item.codeseq}})</option>
                    </select>
                </td>
            </tr>
        </table>
        <textarea style="resize: none;height:80px;" class="form-control"/>
    </form>
    <div class="mt-1">
      <button class="btn btn-primary" style="width:100%;height:35px;" @click="saveContactData">저장</button>
    </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    mounted() {
        this.loadData();
    },
    data() {
        return {
            curIndex: 0,
            contacts: [
                {valInboundType:"0", valModel:"0", valCateTop:"0", valCallType:"0", valCallResult:"0", valCateMid:"0", valCateBot:"0", valDetail:"", valProdTop:"0", valProdMid:"0", valPrjSeq:"0", inboundType: [], carModel: [], callType: [], callResult: [], cateTop: [], cateMid: [], cateBot: [], },
            ],
        }
    },
    methods: {
        initiailizeData() {
            let self = this
            for(let idx = 0; idx < self.contacts.length; idx++ ) {
                self.contacts[idx].cateTop = [];
                self.contacts[idx].cateMid= [];
                self.contacts[idx].cateBot= [];
                self.contacts[idx].valCateTop = "0";
                self.contacts[idx].valCateMid = "0";                    
                self.contacts[idx].valCateBot = "0";    
            }
            self.changeBrand();
        },
        async changeBrand() {
            console.log('====== [updateData] changeBrand ======');
            let self = this;
            // let topCode = '898'; // 2R 상담유형
            // let modelCode = '1078'; // 4R 모델
            // let modelCode = '1077'; // 2R 모델
            let topCode = '';
            let modelCode = '';

            //2R
            if(self.contacts[self.curIndex].valInboundType === 1074) {
                console.log('[모터싸이클(2R)] : ', self.contacts[self.curIndex].valInboundType);
                topCode = '897';
                modelCode = '1077';
            } else if (self.contacts[self.curIndex].valInboundType === 1075) {
                console.log('[모터싸이클(4R)] : ', self.contacts[self.curIndex].valInboundType);
                topCode = '898';
                modelCode = '1078';
            } else {
                return;
            }

            await axios.get(process.env.VUE_APP_API_URL + '/api/lookup/parent/' + topCode)
                .then(function(res) {
                    if(res.data.result === true) {
                        self.contacts[self.curIndex].cateTop = res.data.items;
                        self.contacts[self.curIndex].cateMid= [];
                        self.contacts[self.curIndex].cateBot= [];
                        self.contacts[self.curIndex].valCateTop = "0";
                        self.contacts[self.curIndex].valCateMid = "0";                    
                        self.contacts[self.curIndex].valCateBot = "0";                    
                    }
            });

            await axios.get(process.env.VUE_APP_API_URL + '/api/lookup/parent/' + modelCode)
                .then(function(res) {
                    if(res.data.result === true) {
                        self.contacts[self.curIndex].carModel = res.data.items;
                        self.contacts[self.curIndex].valModel = "0";                   
                    }
            });
        },

        async loadData() {
            // ComboBOX DATALOAD
            let self = this;

            await axios.get(process.env.VUE_APP_API_URL + '/api/lookup/parent/1073')
                .then((response) => {
                    if(response.data.result === true) {
                        self.contacts[self.curIndex].inboundType = response.data.items;
                        console.log('[inboundType] : ', self.contacts[self.curIndex].inboundType);
                        self.contacts[self.curIndex].valInboundType = "0";
                    }
                });

            await axios.get(process.env.VUE_APP_API_URL + '/api/lookup/parent/1078')
                .then((response) => {
                    if(response.data.result === true) {
                        self.contacts[self.curIndex].carModel = response.data.items;
                        console.log('[carModel] : ', self.contacts[self.curIndex].carModel);
                        self.contacts[self.curIndex].valModel = "0";
                    }
                });

            await axios.get(process.env.VUE_APP_API_URL + '/api/lookup/parent/961')
                .then((response) => {
                    if(response.data.result === true) {
                        self.contacts[self.curIndex].callType = response.data.items;
                        self.contacts[self.curIndex].valCallType = "0";
                    }
                });

            await axios.get(process.env.VUE_APP_API_URL + '/api/lookup/parent/965')
                .then((response) => {
                    if(response.data.result === true) {
                        self.contacts[self.curIndex].callResult = response.data.items;
                        self.contacts[self.curIndex].valCallResult = "0";
                    }
                });

            await axios.get(process.env.VUE_APP_API_URL + '/api/lookup/parent/897')
                .then((response) => {
                    if(response.data.result === true) {
                       self.contacts[self.curIndex].cateTop = response.data.items;
                    }
                });
            console.log('[contacts] DATA : ', this.contacts);
        },
        saveContactData() {
            let self = this;

            this.$swal({
                text: '상담 결과를 저장하시겠습니까?',
                type: 'question',
                showCancelButton: true
            }).then((response) => {
                if(response.value) {
                    let contactData = [];
                    let idx = 0;

                    for(idx = 0; idx < self.contacts.length; idx++ ) {
                        console.log('Usrname : ');

                        contactData.push(
                            {
                                custseq: self.custseq,
                                detail: self.contacts[idx].valDetail,
                                mannerscore: 0,
                                result: self.contacts[idx].valCallResult,
                                catetop: self.contacts[idx].valCateTop,
                                catemid: self.contacts[idx].valCateMid,
                                catebot: self.contacts[idx].valCateBot,
                                catedet: self.contacts[idx].valModel,
                                col3: self.getInboundType(self.contacts[idx].valInboundType),
                                col4: self.contacts[idx].valInboundType,
                                col5: self.contacts[idx].valCallType,
                                col6: self.getCallTypeName(self.contacts[idx].valCallType),
                                col7: self.getCallResultName(self.contacts[idx].valCallResult),
                                col9: self.contacts[idx].valDetail,
                                tenantid: 3,
                            }                            
                        );

                        //통화성공 콜백
                        if(self.contacts[idx].valCallType === 964 && self.contacts[idx].valCallResult === 966) {
                            axios.get(process.env.VUE_APP_API_URL + '/api/callback/closecid/' + self.$store.state.callbacknumber.replace(/-/gi,"") + '/' + (self.$store.state.callinfo.contactid === '' ? ' ' : self.$store.state.callinfo.contactid) + '/' + self.$store.state.agent.agentseq)
                            .then(function() {
                            });
                        }
                    }

                    axios.post(process.env.VUE_APP_API_URL + '/api/contact', contactData)
                    // this.$http.post('http://localhost:8081/api/contact', contactData)
                    .then(function(res) {
                        if(res.data.result === true) {                    
                            self.valBoutique = '';
                            self.valMotive = '';
                            self.valSubmotive = '';
                            self.valCntsrc = '';
                            self.valSrcdetail = '';
                            self.valDetail = '';
                            self.mannerscore = 5;

                            self.initCate();    // 카테고리 초기화
                            self.$swal('저장완료','상담 결과가 정상적으로 저장되었습니다.','success')
                        } else {
                            self.$swal('저장실패','상담 결과 저장 오류 : ' + res.data.message,'error')
                        }
                    }, function() {
                    })
                }
            })
        },
        getInboundType: function (code) {
            let idx = 0;

            for(idx = 0; idx < this.contacts[this.curIndex].inboundType.length; idx++) {
                if(code === this.contacts[this.curIndex].inboundType[idx].codeseq) {
                    return this.contacts[this.curIndex].inboundType[idx].cdname;
                }
            }

            return '';
        },
        getCallTypeName: function (code) {
            let idx = 0;

            for(idx = 0; idx < this.contacts[this.curIndex].callType.length; idx++) {
                if(code === this.contacts[this.curIndex].callType[idx].codeseq) {
                    return this.contacts[this.curIndex].callType[idx].cdname;
                }
            }
            return '';
        },
        getCallResultName: function (code) {
            let idx = 0;

            for(idx = 0; idx < this.contacts[this.curIndex].callResult.length; idx++) {
                if(code === this.contacts[this.curIndex].callResult[idx].codeseq) {
                    return this.contacts[this.curIndex].callResult[idx].cdname;
                }
            }
            return '';
        },
        selectContact(index) {
            // 선택항목 포커스
            this.curIndex = index;
        },
        closeContact(idx) {
            // 상담답변 닫기.
            let self = this;

            if(this.contacts[idx].valCateTop !== "0" || this.contacts[idx].valCateMid !== "0" || this.contacts[idx].valDetail !== "") {
                self.$swal(
                    {title:'답변삭제확인',
                    text:'상담 답변 내용을 삭제하시겠습니까?',
                    type:'warning',
                    showCancelButton:true,
                    }
                ).then((result) => {
                    if(result.value) {
                        if(self.curIndex >= (self.contacts.length-2)) {
                            self.curIndex = self.contacts.length-2;
                        }
                        self.contacts.splice(idx,1);
                    }
                })
            } else {
                if(self.curIndex >= (self.contacts.length-2)) {
                    self.curIndex = self.contacts.length-2;
                }
                self.contacts.splice(idx,1);
            }
        },
        addContact() {
           console.log('[contacts] length : ', this.contacts.length);
           if((this.contacts.length >= 4) && (this.contacts.length < 5)) {
                this.$swal({ 
                    text:'상담답변을 더이상 추가할 수 없습니다.',
                    type:'warning',
                });
           }else {
            this.contacts.push({valCateTop:"0", valCateMid:"0", valProdTop:"0", valProdMid:"0", valDetail:"", cateTop: [], cateMid: [], prodTop: [], prodMid: []});
            this.curIndex = this.contacts.length-1;
            this.loadData();
           }
        },
        changeCateTop() {
            let self = this;
            axios.get(process.env.VUE_APP_API_URL+'/api/lookup/parent/' + this.contacts[this.curIndex].valCateTop)
            .then(function(res) {
                if(res.data.result === true) {
                    self.contacts[self.curIndex].cateMid = res.data.items;
                    self.contacts[self.curIndex].cateBot= [];
                    self.contacts[self.curIndex].valCateMid = "0";
                    self.contacts[self.curIndex].valCateBot = "0";
                }
            });
        },
        changeCateMid() {
            let self = this;

            axios.get(process.env.VUE_APP_API_URL+'/api/lookup/parent/' + this.contacts[this.curIndex].valCateMid)
            .then(function(res) {
                if(res.data.result === true) {
                    self.contacts[self.curIndex].cateBot = res.data.items;
                    self.contacts[self.curIndex].valCateBot = "0";
                }
            });
        },
        changeCateBot() {
            console.log('[changeCateBot] END ');
        },
    }
}
</script>

<style scoped>

.uni-mpcjob-contact {
    padding: 10px 10px;
    font-size:14px ;
    text-align:left;
}

.uni-mpcjob-contact table {
    width:100%;
}

.uni-mpcjob-contact table th {
    padding-left:10px;
    padding-right:10px;
    width:70px;
    font-size:12px ;
}

.uni-mpcjob-contact table td {
    padding-right:10px;
}

.uni-mpcjob-contact .uni-mpcjob-contact-col1 {
    width:200px;
}

.uni-mpcjob-contact textarea {
    width:100%;
    height:150px;    
    margin-top:10px;
}

.uni-mpcjob-contact .contact-select-menu {
    margin-bottom: 10px;
    display: flex;
}

.uni-mpcjob-contact .contact-select-item {
    background-color:#f7d97f;
    color:#b19e64 ;
    border-radius: 15px 15px;
    text-align:left;
    padding:2px 7px 2px 10px;
    font-size:12px ;
    margin-right:5px;
}

.uni-mpcjob-contact .contact-active-item {
    background-color:#f2b705 ;
    color:white ;
}

.uni-mpcjob-contact .contact-select-item button {
    background-color:rgba(0,0,0,0.50);    
    margin-left: 5px;
    border: none;
    border-radius: 15px 15px;
    color:#ffffff;
}

.uni-mpcjob-contact .contact-add-btn {
    background-color:#f7d97f;
    border:none;
    border-radius: 15px 15px;
    height:23px;
    width:23px;
    font-size:12px ;
    color:#b19e64;
    margin-left:0px;
    padding:0;
}
</style>