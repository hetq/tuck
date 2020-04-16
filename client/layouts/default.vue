<template>
  <v-app>
    <v-navigation-drawer
      v-model="hasOpenDrawer"
      clipped
      fixed
      app
      dark
    >
      <v-list dense>
        <user-item :value="session" />

        <v-divider />

        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon> {{ item.icon }} </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

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

import UserItem from '@/components/UserItem'

//

const noop = () => null

//

const computed = {
  ...mapGetters('session', {
    session: 'payload'
  })
}

const watch = {
  session (auth) {
    auth.cata({
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
  navItems: [
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
    UserItem
  },
  data,
  computed,
  watch,
  methods
}
</script>
