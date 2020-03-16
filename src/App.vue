<template>
  <v-app>
    <v-app-bar
      app
      color="green"
      dense
      dark>
      <v-icon
        class="mx-4"
        large
        color="red darken-3"
      >
        mdi-progress-clock
      </v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title font-weight-light">POMODORO</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <Main class="ml-auto mr-auto"/>
    </v-content>
  </v-app>
</template>

<script>
import Main from './components/Main';

export default {
  name: 'App',
  computed: {
  },

  components: {
    Main,
  },

  data: () => ({
  }),
  methods: {
  }
};
</script>
