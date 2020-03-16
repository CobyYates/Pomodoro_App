<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>
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
    //
  }),
};
</script>
