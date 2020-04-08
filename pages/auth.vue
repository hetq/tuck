<template>
  <v-app id="auth">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-tabs
              v-model="tab"
              :grow="true"
              @change="reset"
            >
              <v-tab> Login </v-tab>
              <v-tab> Signup </v-tab>
            </v-tabs>

            <v-card>
              <v-card-subtitle v-if="hasVisibleError">
                <v-alert
                  v-model="hasVisibleError"
                  type="error"
                  dismissible
                >
                  {{ errorMessage }}
                </v-alert>
              </v-card-subtitle>
              <v-card-text>
                <v-tabs-items v-model="tab">
                  <v-tab-item
                    :transition="false"
                    :reverse-transition="false"
                  >
                    <user-login-form @submit="submitLogin" />
                  </v-tab-item>
                  <v-tab-item
                    :transition="false"
                    :reverse-transition="false"
                  >
                    <user-signup-form @submit="submitSignup" />
                  </v-tab-item>
                </v-tabs-items>
              </v-card-text>

              <v-overlay :value="isLoading" absolute>
                <v-progress-circular indeterminate />
              </v-overlay>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import UserLoginForm from '@/components/UserLoginForm'
import UserSignupForm from '@/components/UserSignupForm'

import { statuses } from '@/store/auth'

//

const data = () => ({
  tab: null,
  hasVisibleError: false,
  errorMessage: null
})

const computed = {
  hasStatus () {
    return status => this.status === status
  },
  isLoading () {
    return this.hasStatus(statuses.PENDING)
  },
  redirectUrl () {
    const { origin } = this.$route.query
    return origin || '/'
  },
  ...mapState('auth', ['status', 'token'])
}

const watch = {
  status () {
    this.reset()
  }
}

const methods = {
  displayError (err) {
    this.errorMessage = err.message
    this.hasVisibleError = true
  },
  hideError () {
    this.errorMessage = null
    this.hasVisibleError = false
  },
  submitLogin (formData) {
    this
      .login(formData)
      .catch(err => this.displayError(err))
      .then(() => this.callback())
  },
  submitSignup (formData) {
    this
      .signup(formData)
      .catch(err => this.displayError(err))
      .then(() => this.callback())
  },
  reset () {
    this.hideError()
  },
  callback () {
    this.$router.push(this.redirectUrl)
  },
  ...mapActions('auth', ['login', 'signup'])
}

//

export default {
  name: 'AuthPage',
  components: {
    UserLoginForm,
    UserSignupForm
  },
  data,
  computed,
  watch,
  methods
}
</script>
