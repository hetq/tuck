<template>
  <v-skeleton-loader
    :loading="data.isLoading()"
    transition="fade-transition"
    height="100"
    type="image"
  >
    <v-sparkline
      v-if="value"
      :value="value"
      height="100"
      padding="24"
      stroke-linecap="round"
      smooth
    />
    <v-alert v-else type="warning">
      Not available
    </v-alert>
  </v-skeleton-loader>
</template>

<script src="./main.js"></script>
