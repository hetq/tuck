<template>
  <v-sparkline
    :value="statPoints"
    :labels="statLabels"
    height="100"
    padding="24"
    stroke-linecap="round"
    smooth
  />
</template>

<script src="./main.js"></script>
