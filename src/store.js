import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pomodoroCount: 0,
        totalPomodoros: 0,
        pomos: [
        {
          todo: "As a user I want to be able to add and remove tasks.",
          count: 0,
          complete: false
        },
        {
          todo:
            "As a user I want to be able to select a task and start a Pomodoro timer.",
          count: 0,
          complete: false
        },
        {
          todo: "As a user I want to be able to pause the timer.",
          count: 0,
          complete: false
        },
        {
          todo: "As a user I want to be able to reset the timer.",
          count: 0,
          complete: false
        },
        {
          todo:
            "As a user I want to know how many pomodoros have been completed for a selected task.",
          count: 0,
          complete: false
        },
        {
          todo:
            "As a user I want to be able to take a 5 min break after a Pomodoro.",
          count: 0,
          complete: false
        },
        {
          todo:
            "As a user I want to be able to take a 20 min break after 4 pomodoros.",
          count: 0,
          complete: false
        }
      ]
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