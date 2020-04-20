<template>
  <v-content>
    <v-card :loading="isLoading" ma-4>
      <v-card-title>
        <h3 class="headline">
          Login
        </h3>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <login-form :is-loading="isLoading" @submit="login" />
      </v-card-text>

      <v-divider />

      <v-card-actions class="justify-center py-3">
        <span class="text--secondary px-2">
          Don't have an account?
        </span>
        <v-btn text :to="{ name: 'signup' }">
          Signup
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar :value="isAfterSignupSuccess" color="info">
      <strong class="font-weight-medium"> Successfully signed up. </strong>
      <v-icon color="white">
        mdi-account-check-outline
      </v-icon>
    </v-snackbar>

    <v-snackbar :value="hasError" color="error">
      <strong> {{ errorMessage }} </strong>
      <v-btn icon color="white" @click="reset">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-content>
</template>

<script src="./main.js"></script>
