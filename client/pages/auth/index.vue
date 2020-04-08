<template>
  <v-col cols="12" sm="8" md="4">
    <v-snackbar
      v-model="hasVisibleError"
      color="error"
    >
      <strong> {{ errorMessage }} </strong>
      <v-btn icon color="white" @click="hideError">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-card :loading="isLoading">
      <v-tabs
        v-model="tab"
        :grow="true"
        @change="reset"
      >
        <v-tab> Login </v-tab>
        <v-tab> Signup </v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-items v-model="tab">
          <v-tab-item
            :transition="false"
            :reverse-transition="false"
          >
            <user-login-form
              :is-loading="isLoading"
              @submit="submitLogin"
            />
          </v-tab-item>

          <v-tab-item
            :transition="false"
            :reverse-transition="false"
          >
            <user-signup-form
              :is-loading="isLoading"
              @submit="submitSignup"
            />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<style scoped>
.padded {
  padding: 20px;
}
</style>

<script src="./main.js"></script>
