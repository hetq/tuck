<template>
  <v-skeleton-loader
    :loading="isLoading"
    transition="fade-scale"
    height="100"
    type="image"
  >
    <v-timeline dense>
      <v-timeline-item
        v-for="dataPoint in timeSeries"
        :key="Number(dataPoint.time)"
        right
      >
        <v-card outlined dense>
          <v-card-title>
            {{ dataPoint.time }}
          </v-card-title>
          <v-card-text>
            <pre>{{ dataPoint.data }}</pre>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-skeleton-loader>
</template>

<script src="./main.js"></script>
