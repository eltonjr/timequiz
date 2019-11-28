import Vue from 'vue'
import Router from 'vue-router'

import ScoreboardList from '@/components/ScoreboardList.vue'
import Form from '@/components/Form.vue'

Vue.use(Router)

export default new Router({
  // mode: 'abstract',
  routes: [
    {
      path: '/',
      redirect: '/scores'
    },
    {
      path: '/scores',
      name: 'scores',
      component: ScoreboardList
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    // },
    // {
    //   path: '/quiz',
    //   name: 'quiz',
    //   component: Quiz
    // },
    // {
    //   path: '/final',
    //   name: 'final',
    //   component: Final
    }
  ]
})
