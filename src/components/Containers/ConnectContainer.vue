<template>
  <div class="Container-Connect">
    <div style="width: 100%; display:flex; justify-content: center;">
      <div class="mt-2" style="font-weight:bold;">
        커넥트 관련 정보확인 
      </div>
    </div>
    <div class="mt-2" style="width: 100%; display:flex; justify-content: center;">
      <b-button id="btnShow" size="sm" variant="primary" @click="ShowConnect">커넥트</b-button>
      <b-button id="btnShow" size="sm" variant="primary" @click="ShowCurrnectCall" class="ml-2">현재응대현황</b-button>
    </div>
    <div class="mt-2" >
      <AwsConnect v-if="showPage==1"/>
      <CallCurrent v-if="showPage==2"/>
    </div>
  </div>
</template>

<script>
import CallCurrent from '@/components/ConnectDisplay/CallCurrent.vue';
import AwsConnect from '@/components/ConnectDisplay/AwsConnect.vue';

export default {
  data() {
    return {
      showPage:1
    }
  },
  components:{
    AwsConnect,
    CallCurrent
  },
  methods: {
    ShowConnect(){
      this.showPage=1;
    },
    ShowCurrnectCall() {
      this.showPage=2;
    }

  }
}
</script>

<style>

.Container-Connect {
  width: 100%;
  justify-content: center;
}
#btnShow.router-link-exact-active{
  color:#2793f2;
}

</style>