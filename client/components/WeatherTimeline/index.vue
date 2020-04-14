<template>
  <v-skeleton-loader
    :loading="data.isLoading()"
    transition="fade-scale"
    height="100"
    type="image"
  >
    <v-timeline dense>
      <v-timeline-item
        v-for="item in timeSeries"
        :key="Number(item.time)"
        right
      >
        <v-card outlined dense>
          <v-card-title>
            <small> {{ labelOf(item) }} </small>
          </v-card-title>

          <v-card-text>
            <pre>{{ item.data }}</pre>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-skeleton-loader>
</template>

<script src="./main.js"></script>
