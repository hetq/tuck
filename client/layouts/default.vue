<template>
  <v-app>
    <v-navigation-drawer
      v-if="isAuthenticated"
      v-model="hasOpenDrawer"
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
          <v-btn nuxt block color="error" @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="true" fixed app>
      <v-app-bar-nav-icon @click.stop="toggleDrawer" />

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
import { mapGetters, mapActions } from 'vuex'

import TheDrawerContent from '@/components/TheDrawerContent'

//

const noop = () => null

//

const computed = {
  isAuthenticated () {
    return this.user.cata({
      Nothing: () => false,
      Just: () => true
    })
  },
  ...mapGetters('session', {
    user: 'payload'
  })
}

const watch = {
  user (data) {
    data.cata({
      Nothing: () => this.onLogout(),
      Just: noop
    })
  }
}

const methods = {
  toggleDrawer () {
    this.hasOpenDrawer = !this.hasOpenDrawer
  },
  onLogout () {
    this.$router.push({ name: 'login' })
  },
  ...mapActions({
    logout: 'session/reset'
  })
}

const data = () => ({
  hasOpenDrawer: false,
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
  computed,
  watch,
  methods
}
</script>
