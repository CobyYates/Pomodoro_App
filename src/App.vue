<template>
  <v-app>
    <v-app-bar
      app
      color="green darken-1"
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
    <v-footer
      v-bind="localAttrs"
      padless
    >
      <v-card
        flat
        tile
        width="100%"
        class="green darken-3 text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon.i"
            class="mx-4"
            icon
          >
            <v-icon color="white" size="35px">{{ icon.icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — Made by Coby Yates
        </v-card-text>
      </v-card>
    </v-footer>
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
    icons: [
        {icon: 'mdi-github', color: '', to: 'https://github.com/CobyYates/Pomodoro_App'},
        {icon: 'mdi-at', color: '', to: 'http://coberapps.com'},
        {icon: 'mdi-linkedin', color: '', to: 'https://www.linkedin.com/in/coby-yates/'},
        {icon: 'mdi-delete', color: '', to: ''},
      ],
  }),
  methods: {
  }
};
</script>
