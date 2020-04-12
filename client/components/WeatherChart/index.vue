<template>
  <v-skeleton-loader
    :loading="isLoading"
    height="100"
    type="image"
  >
    <v-sparkline
      :value="value"
      :labels="labels"
      height="100"
      padding="24"
      stroke-linecap="round"
      smooth
    />
  </v-skeleton-loader>
</template>

<script src="./main.js"></script>
