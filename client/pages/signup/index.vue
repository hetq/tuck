<template>
  <v-content>
    <v-card :loading="isLoading">
      <v-card-title>
        <h3 class="headline">
          Signup
        </h3>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <signup-form
          :is-loading="isLoading"
          @submit="submit"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions class="justify-center py-3">
        <span class="text--secondary px-2">
          Already have an account?
        </span>
        <v-btn text :to="{ name: 'login' }">
          Login
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar
      :value="hasError"
      color="error"
    >
      <strong> {{ errorMessage }} </strong>
      <v-btn icon color="white" @click="reset">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-content>
</template>

<script src="./main.js"></script>
