<template>
  <v-app id="auth">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
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

const computed = {
  ...mapGetters(['isAuthenticated', 'user'])
}

const watch = {
  isAuthenticated (is) {
    if (is) {
      this.onLogin()
    }
  }
}

const methods = {
  onLogin () {
    const url = this.$route.query.targetUrl || process.env.rootUrl
    this.$router.push(url)
  }
}

export default {
  computed,
  watch,
  methods
}
</script>
