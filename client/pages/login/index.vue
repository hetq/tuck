<template>
  <v-card :loading="isLoading">
    <v-card-title>
      Login
    </v-card-title>

    <v-divider />

    <v-card-text>
      <login-form
        :is-loading="isLoading"
        @submit="login"
      />
    </v-card-text>

    <v-snackbar :value="hasError" color="error">
      <strong> {{ errorMessage }} </strong>
      <v-btn icon color="white" @click="reset">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script src="./main.js"></script>
