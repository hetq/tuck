<template>
  <v-content>
    <v-toolbar floating flat>
      <weather-date-input v-model="form.date" />
      <weather-city-input v-model="form.city" />
    </v-toolbar>

    <v-row v-if="timeSeries">
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-toolbar flat dense>
            <v-toolbar-title>
              Temperature
            </v-toolbar-title>
            <v-spacer />
            <v-icon>mdi-temperature-celsius</v-icon>
          </v-toolbar>

          <v-divider />

          <v-card-text>
            <weather-chart
              :is-loading="isLoading"
              :time-series="statsFor('temperature')"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <cite> Under construction </cite>
      </v-col>
    </v-row>
  </v-content>
</template>

<script src="./main.js"></script>
