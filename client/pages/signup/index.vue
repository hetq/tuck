<template>
  <v-col cols="12" sm="8" md="4">
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
    </v-card>

    <v-snackbar
      :value="errorMessage"
      color="error"
    >
      <strong> {{ errorMessage }} </strong>
      <v-btn icon color="white" @click="reset">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-col>
</template>

<script src="./main.js"></script>
