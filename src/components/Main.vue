<template>
  <v-container fluid class="text-center pt-0 ml-auto mr-auto">
    <h1 class="text-center pt-6 mb-0 pb-0 font-weight-light">Pomodoro Tasks</h1>
    <p class="mt-0 pt-0">Completed Pomodoros today {{this.$store.state.totalPomodoros}}</p>
    <div>
      <section id="app" class="hero is-info is-fullheight is-bold">
        <div class="hero-body">
          <div class="container has-text-centered">
            <span id="type" class="display-1"> {{ getType() }}</span>
            <div id="timer" class="display-3 font-weight-regular">
              <span id="minutes">{{ getMinutes() }}</span>
              <span id="middle">:</span>
              <span id="seconds">{{ getSeconds() }}</span>
            </div>
            

            <div id="buttons" width="200px">
              <button
                id="start"
                class="mx-3 my-3"
                v-if="!timer"
                @click="playPause()"
              >
                <v-icon x-large color="green">mdi-play-circle-outline</v-icon>
              </button>

              <button id="stop" class="mx-3 my-3" v-if="timer" @click="pause()">
                <v-icon x-large color="green">mdi-pause-circle-outline</v-icon>
              </button>

              <button id="reset" class="mx-3 my-3" @click="reset()">
                <v-icon x-large color="orange">mdi-undo-variant</v-icon>
              </button>

              <button id="reset" class="mx-3 my-3" @click="complete()">
                <v-icon x-large color="red">mdi-clock-end</v-icon>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <v-row>
      <v-col cols="12">
        <v-dialog v-model="dialog" max-width="500px" persistent>
          <template v-slot:activator="{ on }">
            <v-btn dark x-large class="mb-2 elevation-6" color="primary" width="150" v-on="on">
              Add Task
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">New Task</span>
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                  solo
                    v-model="editedItem.todo"
                    label="Pomodoro"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" @click="save" dark>Update List</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-data-table
          :headers="headers"
          :items="pomos"
          :sort-by="['approval']"
          :sort-desc="[true, false]"
          class="elevation-10 my-6 pl-0 ml-4 mr-4"
        >
          <template v-slot:item.checkbox="{ item }">
            <v-btn 
              color="success" 
              @click="playPause(item)">
                Start {{ item.start }}
            </v-btn>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon
              medium
              class="mr-5"
              @click="editItem(item)"
              color="blue"
            >
              mdi-pencil-outline
            </v-icon>
            <v-icon medium @click="deleteItem(item)" color="red">
              mdi-trash-can-outline
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    defaultTime: 60 * 25,
    defaultBreak: 60 * 5,
    pomodoro: true,
    longBreak: 60 * 20,
    break: false,
    breakStart: false,
    pomodoroCount: 0,
    time: 0,
    completeTime: 0,
    timer: null,
    pomos: [],
    editedIndex: -1,
    dateTime: null,
    headers: [
      { text: "Start Task", value: `checkbox`, sortable: false },
      { text: "Todo", value: "todo", sortable: false },
      { text: "Pomodoro's", value: "count", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    editedItem: {
      todo: "",
      count: 0
    },
    defaultItem: {
      todo: "",
      count: 0
    }
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
    this.time = this.defaultTime;
  },
  methods: {
    formatNumber(num) {
      return (num < 10 ? "0" : "") + num.toString();
    },
    getMinutes() {
      return this.formatNumber(Math.floor(this.time / 60));
    },
    getSeconds() {
      return this.formatNumber(this.time % 60);
    },
    getType() {
      return this.pomodoro ? "Task" : "Break";
    },
    playPause(item) {
      // console.log(`Count: ${item.count} | ID: ${item}`)
      // console.log(item)
      this.$store.state.activePomo = this.pomos.indexOf(item)
      console.log(this.$store.state.activePomo)
      if (!this.timer) {
        this.play(item.count);
      } else {
        this.pause();
      }
    },
    play() {
      if (this.time <= 0) this.time = this.defaultTime;
      this.timer = setInterval(() => {
        this.time -= 1;
        if (this.time <= 0) this.playPause();
      }, 1000);
    },
    pause() {
      clearInterval(this.timer);
      this.timer = null;
    },
    reset() {
      !this.pomodoro
        ? (this.time = this.defaultBreak)
        : (this.time = this.defaultTime)
        this.playPause();
    },
    complete() {
      this.pomodoro = !this.pomodoro;
      if(!this.pomodoro) {
        this.$store.state.pomodoroCount++
        this.$store.state.totalPomodoros++
        this.$store.state.pomos[`${this.$store.state.activePomo}`].count++
      }
      if (this.$store.state.pomodoroCount === 4) {
        this.time = 60 * 20;
        this.$store.state.pomodoroCount = 0;
      } else {
        this.pomodoro
          ? (this.time = this.defaultTime)
          : (this.time = this.defaultBreak)
      }
      this.pause()
    },
    getPlayState() {
      return !!this.timer;
    },
    // get data from the store
    initialize() {
      this.pomos = this.$store.state.pomos
    },
    editItem(item) {
      this.editedIndex = this.pomos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.pomos.indexOf(item);
      confirm("Are you sure you want to delete this task?") &&
        this.pomos.splice(index, 1);
    },
    addLabel(label) {
      this.item.label.push(label);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.pomos[this.editedIndex], this.editedItem);
      } else {
        this.pomos.push(this.editedItem);
      }
      this.close();
    },
  }
};
</script>

<style>
.v-data-table-header {
  background-color: #666!important;
}
.v-data-table-header span {
  color: rgb(233, 233, 233)!important;
}
</style>
