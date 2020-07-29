<template>
  <div class="Contact-Memo-timeline">
    <div v-for="(item, index) in contacts" :key="index" class="Contact-timeline" :class="{'timeline-start':index === 0, 'timeline-center':index > 0 && index < (contacts.length-1), 'timeline-end':index === (contacts.length-1)}">
        <div class="timeline-profile">
            <div class="timeline-profile-img">
                <img :src="item.profile_url">
            </div>
            <div class="timeline-agentname">
                {{item.agentname === '' ? '오토브레인' : item.agentname}}
            </div>
        </div>
        <div class="timeline-content" @click="selectContact(index)" style="overflow:hidden;">
            <div style="width:100%;padding:2px 5px;border-bottom:2px solid #fcfcfd;">
                <div class="timeline-category" style="display:flex;margin-bottom:7px;">
                    <span style="font-weight:norm0l;margin-right:10px;background-color:#2793f2;font-weight: bold;font-size: 13px; color:white;padding:3px 7px 3px 7px;border-radius:15px 15px;">
                        {{item.col4 == '1074' ? '2R' : '4R'}}
                    </span>
                    <div v-if="item.cateDet !== ''" style="background-color:#2793f2;font-size: 13px;color:white;padding:3px 7px 3px 7px;border-radius:15px 15px;">{{item.cateDet}}</div>

                    <div style="margin-left:10px;font-weight:700;font-size:10pt;margin-top:4px;">
                        <div v-if="item.cateTop !== ''">{{item.cateTop}} > {{item.cateMid}} > {{item.cateBot}}</div>
                    </div>
                </div>
            </div>

            <div class="timeline-detail" style="margin-top:10px;">
                <p style="margin-bottom:-5px;">{{item.detail}}</p>
            </div>
            <div class="timeline-calldt">
                <span>{{item.callDt}}</span>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    this.loadHistory();
  },
  data() {
    return {
        contacts: []   
    }
  },
  methods: {
    selectContact(index) {
        console.log('[Contact DATA] Contact : ', index);
    },
    loadHistory() {
        let self = this;

        self.contacts = [];
        axios.get(process.env.VUE_APP_API_URL + '/api/contact/cust/500/18990101/29991230/3')
        .then(function(res) {
            if(res.data.result === true) {                    
                let idx = 0;
                let profile = "'/bg/prof1.jpg'";
                self.contacts = [];

                console.log(res.data.contacts);

                for(;idx < res.data.contacts.length; idx++) {
                    if(res.data.contacts[idx].agentseq === 2) {
                        profile = '/bg/pitucatch.gif';
                    }
                    if(res.data.contacts[idx].agentseq === 3) {
                        profile = '/bg/dbpituchui.gif';
                    }
                    if(res.data.contacts[idx].agentseq === 4) {
                        profile = '/bg/pituplayband.gif';
                    }
                    if(res.data.contacts[idx].agentseq === 1) {
                        profile = '/bg/prof1.jpg';
                    }
                    if(res.data.contacts[idx].agentseq >= 5 && res.data.contacts[idx].agentseq <= 20) {
                        profile = '/bg/honda_ci.jpg';
                    }

                    self.contacts.push({
                        contseq: res.data.contacts[idx].contseq,
                        custseq: res.data.contacts[idx].custseq,
                        agentseq: res.data.contacts[idx].agentseq,                                
                        cateTop: res.data.contacts[idx].catetopName, 
                        cateMid: res.data.contacts[idx].catemidName, 
                        cateBot: res.data.contacts[idx].catebotName, 
                        cateDet: res.data.contacts[idx].catedetName,
                        usrname: res.data.contacts[idx].col1,
                        mobile: res.data.contacts[idx].col2,
                        project: res.data.contacts[idx].col3,
                        col4: res.data.contacts[idx].col4,
                        callType: res.data.contacts[idx].col6,
                        callResult: res.data.contacts[idx].col7,
                        callDt: res.data.contacts[idx].contdt, 
                        agentname:res.data.contacts[idx].agentname, 
                        profile_url:profile, 
                        detail: (res.data.contacts[idx].detail)
                    });
                }
            } else {
                console.log(res.data);
            }
        })
    }
  }
}
</script>

<style>
.Contact-Memo-timeline{
  margin-top: 10px;
  justify-content: center;
  margin-bottom: 10px;
  overflow: auto;
}
.Contact-timeline {
  display: flex;
  margin-left: 20px;
  width: 95%;
}

.timeline-profile {
    width:80px;
    background-color:rgb(245, 245, 247);
    border-radius: 10px 0 0 10px;
    margin-bottom: 10px;
}
.timeline-profile-img {
    display: flex;
    justify-content: center;
}
.timeline-profile-img > img {
    width:50px;
    height:50px;
    border-radius: 25px 25px;
    border: 3px solid white;
    margin-bottom: 5px;
}

.timeline-agentname {
    display: flex;
    justify-content: center;
    font-size:15px;
}

.timeline-content {
    border-radius: 0 10px 10px 0;
    background-color:#f0f0f2;
    /*background-color:#e3f6fc;*/
    width:100%;
    margin-bottom:10px;
    /*margin-left:-40px;*/
    padding:5px 5px;
    text-align:left;
}

.timeline-category {
    margin-left:10px;
    font-size:11px;
}

.timeline-calldt {
    float:right;
    margin-right:10px;
    margin-top:5px;
    font-size:11px;
}

.timeline-detail {
    margin:5px 5px;
    font-size:13px;    
}
</style>