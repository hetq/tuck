<template>
  <v-app id="auth">
    <v-content>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5" lg="4" xl="3">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

//

const noop = () => null

//

const computed = {
  ...mapGetters({
    session: 'session/payload'
  })
}

const watch = {
  session (auth) {
    auth.cata({
      Nothing: noop,
      Just: () => this.onLogin()
    })
  }
}

const methods = {
  onLogin () {
    this.$router.push({ name: 'dashboard' })
  }
}

export default {
  computed,
  watch,
  methods
}
</script>
