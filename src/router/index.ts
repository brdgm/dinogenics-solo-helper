import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import SetupBot from '@/views/SetupBot.vue'
import RoundOpenSeason from '@/views/RoundOpenSeason.vue'
import RoundTurn from '@/views/RoundTurn.vue'
import RoundUpkeepPhase from '@/views/RoundUpkeepPhase.vue'
import EndOfGame from '@/views/EndOfGame.vue'

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
    path: '/round/:round/turn/:turn/location/:location',
    name: 'RoundTurnLocation',
    component: RoundTurn
  },
  {
    path: '/round/:round/turn/:turn/location/:location/outsource/:outsource',
    name: 'RoundTurnLocationOutsource',
    component: RoundTurn
  },
  {
    path: '/round/:round/upkeepPhase',
    name: 'RoundUpkeepPhase',
    component: RoundUpkeepPhase
  },
  {
    path: '/endOfGame',
    name: 'EndOfGame',
    component: EndOfGame
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')