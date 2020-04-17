<template>
  <v-content fluid>
    <v-container>
      <v-toolbar flat>
        <time-range-input
          v-model="form.timeRange"
          :scope="timeScope"
        />

        <v-spacer />

        <location-input
          v-model="form.location"
          :options="cityNames"
          @input="update"
        />
      </v-toolbar>

      <v-row my-5 py-5>
        <v-col
          v-for="metric in metrics"
          :key="metric.key"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card outlined>
            <v-card-actions>
              <v-icon> mdi-{{ metric.icon }} </v-icon>
              <v-spacer />
              <v-btn text disabled>
                {{ metric.key }}
              </v-btn>
            </v-card-actions>

            <v-card-text>
              <weather-chart :data="seriesFor(metric.key)" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-divider />

      <weather-timeline
        :data="focusData"
        :metrics="metrics"
      />
    </v-container>
  </v-content>
</template>

<script src="./main.js"></script>
