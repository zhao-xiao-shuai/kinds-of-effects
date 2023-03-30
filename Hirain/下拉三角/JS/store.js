import Vue from 'vue'
import Vuex from 'vuex'
import CreateIssueModule from './CreateIssue'
Vue.use(Vuex)
const store = new Vuex.Store({
    //父Store中可以有自己的state/mutations/actions/gettters等
    state:{
    },
    mutations:{
    },
    actions:{
    },
    modules:{
        CreateIssue:CreateIssueModule,
    },
})
export default store