<template>
  <v-content>
    <v-toolbar flat dense>
      <weather-city-input v-model="form.city" @input="update" />
      <v-spacer />
      <weather-time-range-input
        v-if="timeScope.isSuccess()"
        v-model="form.timeRange"
        :min="timeScope.value.min"
        :max="timeScope.value.max"
      />
    </v-toolbar>

    <v-row>
      <v-col cols="12" sm="6" md="5" lg="4">
        <v-card outlined :loading="data.isLoading()">
          <v-toolbar flat dense>
            <v-toolbar-title>
              Temperature
            </v-toolbar-title>
            <v-spacer />
            <v-icon>mdi-temperature-celsius</v-icon>
          </v-toolbar>

          <v-divider />

          <v-card-text>
            <weather-chart :data="seriesFor('temperature')" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="7" lg="8">
        <v-card outlined :loading="data.isLoading()">
          <v-toolbar flat dense>
            <v-toolbar-title>
              Timeline
            </v-toolbar-title>
            <v-spacer />
            <v-icon>mdi-book</v-icon>
          </v-toolbar>

          <v-divider />

          <v-card-text>
            <weather-timeline :data="data" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script src="./main.js"></script>
