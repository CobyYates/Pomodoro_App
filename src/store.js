import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pomodoroCount: 0,
    totalPomodoros: 0,
    activePomo: null,
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
      },
      {
        todo:
          "As a user I want to know how many pomodoros I have worked for task.",
        count: 0,
        complete: false
      },
      {
        todo:
          "As a user I want to know how many total pomodoros I have competed.",
        count: 0,
        complete: false
      }
    ]
  }
});
