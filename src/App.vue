<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>
    </v-app-bar>

    <v-content>
      <Main/>
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
