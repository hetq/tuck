<template>
  <v-content>
    <v-toolbar floating flat>
      <weather-date-input v-model="form.date" />
      <weather-city-input v-model="form.city" @input="update" />
    </v-toolbar>

    <v-row>
      <v-col cols="12" sm="6" md="5" lg="4">
        <v-card outlined :loading="isLoading">
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
              :time-series="timeSeriesFor('temperature')"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="7" lg="8">
        <v-card outlined :loading="isLoading">
          <v-toolbar flat dense>
            <v-toolbar-title>
              Timeline
            </v-toolbar-title>
            <v-spacer />
            <v-icon>mdi-book</v-icon>
          </v-toolbar>

          <v-divider />

          <v-card-text>
            <weather-timeline
              :is-loading="isLoading"
              :time-series="timeSeries"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script src="./main.js"></script>
