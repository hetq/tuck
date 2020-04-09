<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
      dark
    >
      <the-drawer-content
        :user="user"
        :nav-items="items"
      />

      <template v-slot:append>
        <div class="pa-2">
          <v-btn to="/auth/logout" nuxt block color="error">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="true" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import TheDrawerContent from '@/components/TheDrawerContent'

//

const computed = {
  ...mapGetters(['user'])
}

const data = () => ({
  drawer: false,
  items: [
    {
      icon: 'mdi-home',
      title: 'Welcome',
      to: '/',
      isExact: true
    },
    {
      icon: 'mdi-home-analytics',
      title: 'Dashboard',
      to: '/dashboard'
    }
  ],
  title: 'Tuck'
})

export default {
  components: {
    TheDrawerContent
  },
  data,
  computed
}
</script>
