<template>
  <v-app id="auth">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-tabs
              v-model="tab"
              :grow="true"
            >
              <v-tab> Login </v-tab>
              <v-tab> Signup </v-tab>
            </v-tabs>

            <v-card>
              <v-card-text>
                <v-tabs-items v-model="tab">
                  <v-tab-item
                    :transition="false"
                    :reverse-transition="false"
                  >
                    <user-login-form @submit="login"/>
                  </v-tab-item>
                  <v-tab-item
                    :transition="false"
                    :reverse-transition="false"
                  >
                    <user-signup-form @submit="signup" />
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
import UserLoginForm from '@/components/UserLoginForm'
import UserSignupForm from '@/components/UserSignupForm'

const data = () => ({
  tab: null,
  isLoading: false
})

const methods = {
  load () {
    this.isLoading = true

    setTimeout(() => { this.isLoading = false }, 2000)
  },
  login (formData) {
    console.log('Login:', formData)

    this.load()
  },
  signup (formData) {
    console.log('Signup:', formData)

    this.load()
  }
}

export default {
  name: 'AuthPage',
  components: {
    UserLoginForm,
    UserSignupForm
  },
  data,
  methods
}
</script>
