<template>
  <v-app id="auth">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <user-login-form
                  @submit="login"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import UserLoginForm from '@/components/UserLoginForm'

const methods = {
  login (formData) {
    console.log('Login:', formData)
  }
}

export default {
  name: 'AuthPage',
  components: {
    UserLoginForm
  },
  methods
}
</script>
