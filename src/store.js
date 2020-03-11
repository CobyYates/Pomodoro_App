import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pomodoroCount: 0,

    },
    getters: {
        // carsList: state => {
        //     return state.selectedCars;
        // },
    }
})