<template>
  <v-card :loading="isLoading">
    <v-card-title>
      Signup
    </v-card-title>

    <v-divider />

    <v-card-text>
      <signup-form
        :is-loading="isLoading"
        @submit="submit"
      />
    </v-card-text>

    <v-snackbar
      :value="errorMessage"
      color="error"
    >
      <strong> {{ errorMessage }} </strong>
      <v-btn icon color="white" @click="reset">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script src="./main.js"></script>
