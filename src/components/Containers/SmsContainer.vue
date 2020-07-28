<template>
  <div class="Container-SMS">
    <div class="sms-title">
        <div style="display: flex;align-items: center;">
            <span class="text-white">SMS 보내기</span>
        </div>
        <div style="display: flex;align-items: center;">
            <button @click="carType = '2R'" v-bind:class="{'car-type-select-active': carType==='2R', 'car-type-select': carType==='4R'}" style="margin-right:5px;">2R</button>
            <button @click="carType = '4R'" v-bind:class="{'car-type-select-active': carType==='4R', 'car-type-select': carType==='2R'}">4R</button>
        </div>      
    </div>
    <div>
        <div class="pl-2 pr-2">
            <select style="width:100%;height:30px;" @change="selectItem" v-model="selectedTemplate">
                <option value="-1">템플릿 미적용</option>
                <option v-for="(item, index) in template" :key="index" :value="index">{{item.title}}</option>
            </select>
        </div>
        <div class="pt-3 pl-2 pr-2 pb-1">
            <textarea style="resize: none;width:100%;height:250px;" class="sms_text" v-model="msg"/>
        </div>

        <div class="pl-2 pr-2" style="display: flex;">
            <input class="sms_phone" type="text" v-model="phone" style="width: 100%; padding-left:5px;">
            <b-button class="ml-2" variant="primary" size="sm" style="width: 30%;" @click="sendSMS">전송</b-button>
        </div>
    </div>
  </div>

       
</template>

<script>

export default {
    data: function () {
        return {
            msg:"",
            callback:"", /*01077252782*/
            phone:"",
            carType:"2R",
            template: [],
            selectedTemplate: -1,
            agentseq:1,
        }
    },
    methods: {
        selectItem() {
            if(this.selectedTemplate >= 0) {
                this.msg = this.template[this.selectedTemplate].content;
            } else {
                this.msg = '';
            }
        },
        sendSMS() {
            let self = this;
            let reqObj= {
                callback:self.callback,
                phone:self.phone.trim(),
                msg:self.msg.trim(),
                agentseq: self.agentseq
            };
            console.log('[SmsContainer]reqObj : ', reqObj);
            let type='success';
            let message = 'TEST MESSAGE';
            // let htmlMessage = `<div class="text-white" style="width:150px;height:40px;display:flex;justify-content:center;align-items:center;"><p class="font-weight-bold h5">TEST MESSAGE</p></div>`;
            this.makeToast(type, message);
        },
        makeToast(type, htmlMessage) {
            // Message 처리.
            let self =this;
            self.$toast.open({
                type: type,
                position: 'top-right',
                message: htmlMessage, 
                duration: 3000,
                dismissible: true
        });
    },
    }
}
</script>

<style>
.sms-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    padding: 5px 5px 0px 15px;
}
.Container-SMS {
    width: 100%;
}
.Container-SMS .car-type-select-active {
    width: 40px;
    height: 25px;
    background-color:#1A237E;
    border: 1px solid #ffffff;
    outline: none;
    color: white;
    border-radius: 10px 10px 10px 10px;
}

.Container-SMS .car-type-select {
    width: 40px;
    height: 25px;
    background-color:#f7d97f;
    border: none;
    color: #b19e64;
    border-radius: 10px 10px 10px 10px;
}
</style>