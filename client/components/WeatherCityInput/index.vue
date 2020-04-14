<template>
  <div class="clamp">
    <v-select
      :value="value"
      :items="options"
      prepend-inner-icon="mdi-map"
      menu-props="auto"
      label="Select city"
      single-line
      width="200px"
      @input="update"
    />
  </div>
</template>

<script src="./main.js"></script>

<style scoped>
.clamp {
  width: 220px
}
</style>
