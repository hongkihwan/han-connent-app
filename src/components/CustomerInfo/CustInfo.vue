<template>
  <div style="width:100%;height:100%;" >
    <div style="display:flex;margin-top:5px;">
        <div style="width:70%;text-align:left;margin-top:10px;margin-left:10px;">
            <div class="form-control-group" style="display:flex;height:30px;">
                <label style="width:100px;text-align:right;margin-top:7px;margin-right:10px;">고객명</label>
                <div style="display:flex;width:100%;margin:0;padding:0;">
                    <input v-model="c_Name" type="text" class="form-control"  style="height:100%;">
                </div>
            </div>
            <div class="form-control-group" style="margin-top:3px;margin-bottom:3px;display:flex;height:30px;">
                <label style="width:100px;text-align:right;margin-top:7px;margin-right:10px;">전화번호</label>
                <div style="display:flex;width:100%;margin:0;padding:0;">
                    <input v-model="c_PhoneNumber" type="text" class="form-control" style="width:80%;height:100%;">
                    <div style="margin-left:6px;margin-right:2px;margin-top:4px;cursor:pointer;">
                        <i class="fas fa-phone-volume fa-lg" style="height:100%;"/>
                    </div>
                </div>
            </div>
            <div class="form-control-group" style="display:flex;height:30px;">
                <label style="width:100px;text-align:right;margin-top:7px;margin-right:10px;">차대번호</label>
                <div style="display:flex;width:100%;margin:0;padding:0;">
                    <input v-model="c_IdentificationNum" type="text" class="form-control" max="10" style="height:100%;">
                </div>
            </div>
        </div>

        <div  style="margin-left: 10px;margin-top:10px;width:100px;margin-right:5px;">
            <button  @click="customerSearch" class="btn btn-primary" type="button" style="height:100%;">고객검색</button>
        </div>
    </div>    
    <div style="margin-top:5px;font-size:12pt;display:flex;float:left;margin-left:27px;">
      <label >CopyNumber : </label>
      <label style="cursor:pointer;" >{{ c_PhoneNumber }}</label>
      <div @click="copyData(c_PhoneNumber)">&nbsp;<i class="far fa-copy" style="margin-left:3px;margin-right:6px;margin-top:2px;cursor:pointer;"/></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            c_Name:'',
            c_PhoneNumber:'',
            c_IdentificationNum:'',
        }
    },
    methods: {
        copyData: function(value) {
            let dummy = document.createElement("textarea");

            document.body.appendChild(dummy);
            dummy.value = value;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
        },
        customerSearch() {

            let idx = 0;
            let val = '';

            for(idx = 0; idx < this.c_PhoneNumber.length; idx++) {
                if(this.c_PhoneNumber.substring(idx,idx+1) >= '0' && this.c_PhoneNumber.substring(idx,idx+1) <= '9') {
                    val = val + this.c_PhoneNumber.substring(idx,idx+1);
                }
            }

            this.c_PhoneNumber = val;
            console.log('name/c_PhoneNumber/extkey2: ', this.c_Name, this.c_PhoneNumber, this.c_IdentificationNum);

            if(this.c_Name == '' && this.c_PhoneNumber == '' && this.c_IdentificationNum == ''){
                Swal.fire({
                    icon: 'error',
                    width: 300,
                    text: '정보를 입력해주세요.',
                });
            }else {
                this.loadCustomer(this.c_Name, this.c_PhoneNumber, this.c_IdentificationNum, 0);
            }
        },
        loadCustomer(name, phoneNumber, identification, sequence) {
            let url = process.env.VUE_APP_API_URL+'/api/customer/';

            console.log('[Components-CustInfo] loadCustomer : ', name, phoneNumber, identification, sequence);

            if(sequence != 0){
                url = url + 'search/custseq/' + sequence;
            }else if(name != '' && phoneNumber == "" && sequence == 0) {
                url = url + 'search/name/' + name;
            }else if(name == "" && phoneNumber != "" && sequence == 0) {
                url = url + 'search/extkey1/' + phoneNumber;
            }else if(name != "" && phoneNumber != "" && sequence == 0) {
                url = url + 'search/extkey1/' + phoneNumber;
            }else {
                url = url + 'search/extkey2/' + identification;
            }
            
            console.log('[Components-CustInfo] URL : ', url );
            
            axios.get(url)
                .then((response) => {
                    if(response.data.result === true) {
                        this.c_Name = response.data.customer.name;
                        this.c_PhoneNumber = response.data.customer.extkey1;
                        this.c_IdentificationNum = response.data.customer.extkey2;
                    }else {
                        this.name = '';
                        this.c_PhoneNumber = '';
                        this.c_IdentificationNum = '';
                        this.$swal('조회실패','고객 정보 조회 오류 : ' + response.data.message,'error')
                    }
                })

        }
    }
}
</script>

<style>

</style>