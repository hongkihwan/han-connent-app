import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/pages/Layout.vue'

import Contact from "@/views/serviceViews/Contact.vue";
import ContactHistory from "@/views/serviceViews/ContactHistory.vue";
import ContactSmsHistory from "@/views/serviceViews/ContactSmsHistory.vue";
import ContactCurrentProcess from "@/views/serviceViews/ContactCurrentProcess.vue";
import ContactQuestionTitle from "@/views/serviceViews/ContactQuestionTitle.vue";

import SurveyReport from "@/views/reports/SurveyReport.vue";
import DailyReport from "@/views/reports/DailyReport.vue";
import MonthlyReport from "@/views/reports/MonthlyReport.vue";

import Campaign from '@/views/campaign/Campaign.vue';
import CampaignRegister from "@/views/campaign/CampaignRegister.vue";
import CampaignConfirm from "@/views/campaign/CampaignConfirm.vue";

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      name: "Layout",
      component: Layout,
      children: [
        {
          path: "contact",
          name: "Contact",
          component: Contact,
        },
        {
          path: "contacthistory",
          name: "ContactHistory",
          component: ContactHistory,
        },
        {
          path: "contactSmsHistory",
          name: "contactSmsHistory",
          component: ContactSmsHistory,
        },
        {
          path: "dailyreport",
          name: "DailyReport",
          component: DailyReport,
        },
        {
          path: "monthlyreport",
          name: "MonthlyReport",
          component: MonthlyReport,
        },
        {
          path: "contactCurrentProcess",
          name: "ContactCurrentProcess",
          component: ContactCurrentProcess,
        },
        {
          path: "surveyreport",
          name: "Surveyreport",
          component: SurveyReport,
        },
        {
          path: "contactQuestionTitle",
          name: "ContactQuestionTitle",
          component: ContactQuestionTitle,
        },
        {
          path: "campaign",
          name: "campaign",
          component: Campaign,
        },
        {
          path: "campaignConfirm",
          name: "campaignConfirm",
          component: CampaignConfirm,
        },
        {
          path: "campaignRegister",
          name: "campaignRegister",
          component: CampaignRegister,
        },
      ],
    },
  ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
