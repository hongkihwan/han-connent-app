<template>
  <div class="Container-QuestionTitle">
    <div class="col-lg-14">
      <div class="card m-b-30" style="padding: 10px;">
        <div class="card-header">
          <span style="font-weight: bold;">공통코드관리</span>
        </div>
        <div class="row">
          <div class="Container-list-Group-Main mt-3">
            <div>
              <b-list-group v-for="(mainItem) in mainItems" :key="mainItem.codeseq">
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  {{ mainItem.cdname }} ({{ mainItem.codeseq }})
                  <b-badge class="ml-4 mr-2" variant="primary" pill>showCountData({{ mainItem.codeseq }})</b-badge>
                  <span style="cursor:pointer;" ><i class="fa fa-caret-down"></i></span>
                </b-list-group-item>
              </b-list-group>
            </div>
            <!-- @click="largePart(mainItem)" <div>
              <b-list-group style="padding-left: 30px;" v-for="(mediumItem) in mediumItems" :key="mediumItem.codeseq">
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  {{ mediumItem.cdname }} ({{ mediumItem.codeseq }})
                  <b-badge class="ml-4 mr-2" variant="primary" pill>{{ smallItems.length}}</b-badge>
                  <span style="cursor:pointer;" @click="mediumPart(mediumItem)"><i class="fa fa-caret-down"></i></span>
                </b-list-group-item>
              </b-list-group>
            </div>
            <div>
              <b-list-group style="padding-left: 30px;" v-for="(smallItem) in smallItems" :key="smallItem.codeseq">
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                {{ smallItem.cdname }} ({{ smallItem.codeseq }})
                <b-badge class="ml-4 mr-2" variant="primary" pill>{{ smallItem.length}}</b-badge>
                </b-list-group-item>
              </b-list-group>
            </div> -->
          </div>
        </div>
      </div>
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
      lookups: [
        {cdname: "코드관리", codeseq: 0, parentseq: 0, child: [], reserved: 'Y'},
      ],
      mainItems: [],
      largeItems: [],
      mediumItems: [],
      smallItems: [],
    }
  },
  methods: {
    async loadData() {
      let self = this;

      await axios.get(process.env.VUE_APP_API_URL + '/api/lookup/tenantid/3')
            .then((response) => {
              if(response.data.result === true) {
                self.lookups = response.data.items;
                console.log('[components-ContactQuestionTitle-loadData] lookups: ',  this.lookups);
              }
            });

      for (let index = 0; index < this.lookups.length; index++) {
        if(this.lookups[index].parentseq === 0) {
          this.mainItems.push(this.lookups[index]);
        }
      }
      console.log('[Components-ContactQuestionTitle-loadData] MainItems data : ', this.mainItems);

      let itemObj = JSON.parse(JSON.stringify(this.mainItems));

      console.log('[Components-ContactQuestionTitle-loadData] MainItems JSONObject data :', itemObj);

    },
    async showCountData(codeseq) {
      // 해당 데이터의 갯수를 보여준다. 
      let count;
        await axios.get(process.env.VUE_APP_API_URL + '/api/lookup/parent/' + codeseq)
              .then((response) => {
                console.log('[components-ContactQuestionTitle-largePart] response : ', response);
                if(response.data.result === true) {
                  count = response.data.items.length;
                  console.log('[components-ContactQuestionTitle-largePart] mediumItems: ',  this.mediumItems);
                }
              });

      return count;
      }
    // async largePart(item) {
    //   this.mediumItems=[];
    //   this.smallItems=[];

    //   let itemObj = JSON.parse(JSON.stringify(item));
    //   let self = this;
      
    //   console.log('[components-ContactQuestionTitle] largePart : ', itemObj);
    //   await axios.get(process.env.VUE_APP_API_URL + '/api/lookup/parent/' + itemObj.codeseq)
    //               .then((response) => {
    //                 console.log('[components-ContactQuestionTitle-largePart] response : ', response);
    //                 if(response.data.result === true) {
    //                   self.mediumItems = response.data.items;
    //                   console.log('[components-ContactQuestionTitle-largePart] mediumItems: ',  this.mediumItems);
    //                 }
    //               });
    // },
    // async mediumPart(item) {
    //   this.smallItems=[];
    //   let itemObj = JSON.parse(JSON.stringify(item));
    //   let self = this;

    //   console.log('[components-ContactQuestionTitle] mediumPart : ', itemObj);
    //   await axios.get(process.env.VUE_APP_API_URL + '/api/lookup/parent/' + itemObj.codeseq)
    //               .then((response) => {
    //                 console.log('[components-ContactQuestionTitle-mediumPart] response : ', response);
    //                 if(response.data.result === true) {
    //                   self.smallItems = response.data.items;
    //                   console.log('[components-ContactQuestionTitle-mediumPart] smallItems: ',  this.smallItems);
    //                 }
    //               });
    }
}
</script>

<style scoped>
.card-body {
  padding:0px;
}

.Container-list-Group-Main {
  display: flex;
  overflow-y: auto;
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