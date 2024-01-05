import { RouteRecordRaw } from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import createRouter from 'brdgm-commons/src/util/router/createRouter'
import { name } from '@/../package.json'
import SetupGame from '@/views/SetupGame.vue'
import SetupBot from '@/views/SetupBot.vue'
import RoundOpenSeason from '@/views/RoundOpenSeason.vue'
import RoundTurn from '@/views/RoundTurn.vue'
import RoundUpkeepPhase from '@/views/RoundUpkeepPhase.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/setupBot',
    name: 'SetupBot',
    component: SetupBot
  },
  {
    path: '/round/:round/openSeason',
    name: 'RoundOpenSeason',
    component: RoundOpenSeason
  },
  {
    path: '/round/:round/turn/:turn',
    name: 'RoundTurn',
    component: RoundTurn
  },
  {
    path: '/round/:round/upkeepPhase',
    name: 'RoundUpkeepPhase',
    component: RoundUpkeepPhase
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter(routes, LOCALSTORAGE_KEY, 'AppHome')