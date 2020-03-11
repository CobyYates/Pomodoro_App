<template>
  <v-container class="text-center pt-0">
    <h1 class="text-center py-6 font-weight-light">Pomodoro Tasks</h1>
    <div>
      <section id="app" class="hero is-info is-fullheight is-bold">
        <div class="hero-body">
          <div class="container has-text-centered">
            <div id="timer" class="display-3 font-weight-regular">
              <span id="minutes">{{ getMinutes() }}</span>
              <span id="middle">:</span>
              <span id="seconds">{{ getSeconds() }}</span>
            </div>

            <div id="buttons">
              <button id="start" v-if="!timer" @click="playPause()">
                <v-icon x-large color="green">mdi-play-circle-outline</v-icon>
              </button>

              <button id="stop" v-if="timer" @click="pause()">
                <v-icon x-large color="green">mdi-pause-circle-outline</v-icon>
              </button>

              <button id="reset" @click="reset()">
                <v-icon x-large color="orange">mdi-undo-variant</v-icon>
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
            <v-btn dark class="mb-2 test" width="150" v-on="on">
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
                    v-model="editedItem.todo"
                    label="Task"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" @click="save" dark>Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-data-table
          :headers="headers"
          :items="clients"
          :sort-by="['approval']"
          :sort-desc="[true, false]"
          :hide-default-footer="true"
          class="elevation-3 mx-12 my-6 pl-0 ml-0"
        >
          <template v-slot:item.checkbox="{ item }">
            <v-btn color="success" @click="playPause(item.count)"
              >Start {{ item.start }}</v-btn
            >
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon
              small
              class="mr-5 title"
              @click="editItem(item)"
              color="blue"
            >
              mdi-pencil-outline
            </v-icon>
            <v-icon small class="title" @click="deleteItem(item)" color="red">
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
    time: 0,
    timer: null,
    headers: [
      { text: "", value: `checkbox`, sortable: false },
      { text: "Todo", value: "todo", sortable: false },
      { text: "Count", value: "count", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    clients: [],
    editedIndex: -1,
    dateTime: null,
    editedItem: {
      todo: ""
    },
    defaultItem: {
      todo: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === "Approve client";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
    this.time = this.defaultTime;
    // this.$vuetify.theme.blue = true
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
    playPause(id) {
      console.log(id);
      if (!this.timer) {
        this.play();
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
      this.time = this.defaultTime;
    },
    getPlayState() {
      return !!this.timer;
    },
    initialize() {
      this.clients = [
        {
          todo: "As a user I want to be able to add and remove tasks.",
          count: 0,
        },
        {
          todo:
            "As a user I want to be able to select a task and start a Pomodoro timer.",
          count: 0,
        },
        {
          todo: "As a user I want to be able to pause the timer.",
          count: 0,
        },
        {
          todo: "As a user I want to be able to reset the timer.",
          count: 0,
        },
        {
          todo:
            "As a user I want to know how many pomodoros have been completed for a selected task.",
          count: 0,
        },
        {
          todo:
            "As a user I want to be able to take a 5 min break after a Pomodoro.",
          count: 0,
        },
        {
          todo:
            "As a user I want to be able to take a 20 min break after 4 pomodoros.",
          count: 0,
        }
      ];
    },
    editItem(item) {
      this.editedIndex = this.clients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.clients.indexOf(item);
      confirm("Are you sure you want to delete this task?") &&
        this.clients.splice(index, 1);
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
    save(test) {
      this.editedItem.approval = test;
      if (this.editedIndex > -1) {
        Object.assign(this.clients[this.editedIndex], this.editedItem);
      } else {
        this.clients.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style>
v-container {
  background-color: #666!important;
}
.test {
  border-radius: 30px;
  background: linear-gradient(145deg, #5bc6ff, #4da7db);
  box-shadow: 5px 5px 14px #479aca, -5px -5px 14px #63d8ff;
}
</style>
