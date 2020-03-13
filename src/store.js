import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pomodoroCount: 0,
        totalPomodoros: 0,
    },
    getters: {

    },
    //how the store is influenced by the action
    //
    mutations: {
        addEmployee: (store, employee) => {
            store.employees.push(employee)//add employee to the store
        }
    },
    //how you interact with your store
    //
    actions: {
        // context and the item you want to send
        addEmployee({ commit}, employee){
            try {
                commit('addEmployee', employee)
            }catch(e) {
                console.log(e)
            }   
        }
    }
})