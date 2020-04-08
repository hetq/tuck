<template>
  <v-col cols="12" sm="8" md="4">
    <v-tabs
      v-model="tab"
      :grow="true"
      @change="reset"
    >
      <v-tab> Login </v-tab>
      <v-tab> Signup </v-tab>
    </v-tabs>

    <v-card :loading="isLoading">
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

<script src="./main.js"></script>
