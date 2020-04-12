<template>
  <v-select
    :value="value"
    :items="options"
    prepend-icon="mdi-map"
    menu-props="auto"
    label="Select city"
    single-line
    @input="update"
  />
</template>

<script src="./main.js"></script>
