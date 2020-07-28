import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/pages/Layout.vue'

import Contact from "@/views/serviceViews/Contact.vue";
import ContactHistory from "@/views/serviceViews/ContactHistory.vue";
import ContactSmsHistory from "@/views/serviceViews/ContactSmsHistory.vue";
import ContactCurrentProcess from "@/views/serviceViews/ContactCurrentProcess.vue";
import ContactQuestionTitle from "@/views/serviceViews/ContactQuestionTitle.vue";

import CatePrjReport from "@/views/reports/CatePrjReport.vue";
import SurveyReport from "@/views/reports/SurveyReport.vue";
import DailyReport from "@/views/reports/DailyReport.vue";
import MonthlyReport from "@/views/reports/MonthlyReport.vue";

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      name: "Layout",
      component: Layout,
      children: [
        {
          path: "contect",
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
        // {
        //   path: "prjcatereport",
        //   name: "PrjCateReport",
        //   component: PrjCateReport,
        // },
        {
          path: "cateprjreport",
          name: "CatePrjReport",
          component: CatePrjReport,
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
        // {
        //   path: "callhourreport",
        //   name: "CallHourReport",
        //   component: CallHourReport,
        // },
        // {
        //   path: "setup",
        //   name: "Setup",
        //   component: Setup,
        // },
        // {
        //   path: "holiday",
        //   name: "holiday",
        //   component: Holiday,
        // },
        // {
        //   path: "campaign",
        //   name: "campaign",
        //   component: CampaignView,
        // },
        // {
        //   path: "campaignRegistry",
        //   name: "campaignRegistry",
        //   component: CampaignRegistryView,
        // },
        // {
        //   path: "campaignConfirm",
        //   name: "campaignConfirm",
        //   component: CampaignConfirmView,
        // },
        // {
        //   path: "board",
        //   name: "board",
        //   component: Board,
        // },
        // {
        //   path: "boardAll",
        //   name: "boardAll",
        //   component: BoardAll,
        //   beforeEnter: requireAuth(["AGENT"]),
        // },
      ],
    },
  ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
