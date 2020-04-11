<template>
  <v-row justify="space-between">
    <v-col cols="12" md="4" lg="3" class="py-0">
      <weather-date-input v-model="dateValue" />
    </v-col>
    <v-col cols="12" md="8" lg="9" class="py-0">
      <weather-city-input v-model="cityValue" />
    </v-col>
  </v-row>
</template>

<script src="./main.js"></script>
