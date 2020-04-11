<template>
  <v-card class="mx-auto text-center">
    <v-card-text>
      <weather-chart :value="stats" />
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <weather-selector-form v-model="form" />
    </v-card-actions>
  </v-card>
</template>

<script src="./main.js"></script>
