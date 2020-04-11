<template>
  <v-select
    :value="value"
    :items="options"
    prepend-icon="mdi-map"
    menu-props="auto"
    hide-details
    label="Select city"
    single-line
    @input="update"
  />
</template>

<script src="./main.js"></script>
