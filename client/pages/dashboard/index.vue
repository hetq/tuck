<template>
  <v-content fluid>
    <v-container>
      <v-toolbar flat>
        <time-range-input
          v-model="form.timeRange"
          :scope="timeScope"
        />

        <v-spacer />

        <weather-city-input
          v-model="form.city"
          :options="locationOptions"
          @input="update"
        />
      </v-toolbar>

      <v-divider />

      <v-row>
        <v-col cols="12" sm="6" md="5" lg="4">
          <v-card
            v-for="metric in metrics"
            :key="metric.key"
            class="my-5"
            outlined
          >
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

        <v-col cols="12" sm="6" md="7" lg="8">
          <weather-timeline
            :data="focusData"
            :metrics="metrics"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script src="./main.js"></script>
