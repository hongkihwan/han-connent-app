<template>
  <div>
    <Header/>
    <div class="Container-Body">
      <div class="Container-Aside">
        <div class="Container-Connect">
          <ConnectContainer/>
        </div>
        <div class="Container-Sms">
          <SmsContainer/>
        </div>
      </div>
      <div class="Container-ViewContainer">
        <router-view/>
      </div>
    </div>
    <div class="Container-footer">
      <div>
        <span class="text-white">&copy; 2020 HanKookCorporation</span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Containers/Header.vue'
import ConnectContainer from '@/components/Containers/ConnectContainer.vue'
import SmsContainer from '@/components/Containers/SmsContainer.vue'

export default {
  components:{
    Header,
    ConnectContainer,
    SmsContainer
  }
}
</script>

<style scoped>

.Container-Layout {
 height: 100%;
}
.Container-Body {
 display: flex;
 height: 785px;
 background-color: rgb(182, 182, 240);
}
.Container-Aside {
  width: 300px;
  /* flex-shrink: 0; */
  height: 100%;
  background-color: rgb(67, 46, 255);

}
.Container-ViewContainer {
  /* width:100%; */
  width: calc(100% - 300px);
  background-color: #eceff1;
}
.Container-Connect {
  background-color: #8aacc8;
  height: 405px;
  width:100%;
}
.Container-Sms {
  background-color: #8aacc8;
  height: 380px;
  width:100%;
}
.Container-footer {
  height: 30px;
  background-color: #000051;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>