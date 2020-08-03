<template>
  <div class="Container-QuestionTitle">
    <div class="col-lg-14">
      <div class="card m-b-30" style="padding: 10px;">
        <div class="card-header">
          <span style="font-weight: bold;">공통코드관리</span>
        </div>
        <div class="row">
          <div class="Container-list-Group-Main mt-3">
            <b-card-group deck>
              <b-card header="대분류">
                <b-list-group flush v-for="(item, index) in 1" :key="index">
                  <b-list-group-item button >Cras justo odio
                    <b-badge class="mr-3" variant="primary" pill>14</b-badge>
                    <span @click="mainPart(index)"><i class="fa fa-chevron-down" aria-hidden="true"></i></span>
                      <!-- <template v-if="list.length <= 0">
                        <b-list-group-item>NO DATA</b-list-group-item>
                      </template> -->
                    <b-list-group flush>
                      <b-list-group-item>Morbi leo risus</b-list-group-item>
                      <b-list-group-item>Morbi leo risus</b-list-group-item>
                      <b-list-group-item>Morbi leo risus</b-list-group-item>
                    </b-list-group>
                  </b-list-group-item>
                </b-list-group>
              </b-card>
              <div class="ml-3 mr-3">
                <b-list-group-item class="list-group font-weight-bold text-white text-center">중분류</b-list-group-item>
                <b-list-group v-for="index in 5" :key="index">
                  <!-- <template v-if="list.length <= 0">
                    <b-list-group-item>NO DATA</b-list-group-item>
                  </template> -->
                  
                  <b-list-group-item>Morbi leo risus</b-list-group-item>
                </b-list-group>
              </div>
              <div>
                <b-list-group-item class="list-group font-weight-bold text-white text-center">소분류</b-list-group-item>
                <b-list-group v-for="index in 5" :key="index">
                  <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
                </b-list-group>
              </div>
            </b-card-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  methods: {
    mainPart(index){
      alert('titleNumber : ', index);
    }
  }
}
</script>

<style scoped>
.list-group {
  background-color: #303f9f;
}
.Container-list-Group-Main {
  display: flex;
  /* justify-content: center; */
}
.Container-QuestionTitle {
  height: 780px;
  overflow-y: auto;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>