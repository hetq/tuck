<template>
  <div class="clamp">
    <v-select
      :value="value"
      :items="options"
      prepend-inner-icon="mdi-map"
      menu-props="auto"
      label="Select location"
      single-line
      width="200px"
      @input="update"
    />
  </div>
</template>

<style scoped>
.clamp {
  width: 220px
}
</style>

<script src="./main.js"></script>
