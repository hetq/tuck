<template>
  <v-menu
    v-model="isActive"
    :close-on-content-click="false"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <div class="clamp">
        <v-text-field
          :value="inputValue"
          :loading="scope.isLoading()"
          :disabled="!scope.isSuccess()"
          readonly
          prepend-inner-icon="mdi-calendar"
          v-on="on"
        />
      </div>
    </template>

    <v-date-picker
      v-model="isoPair"
      :min="isoMin"
      :max="isoMax"
      range
    />
  </v-menu>
</template>

<script src="./main.js"></script>

<style scoped>
.clamp {
  width: 220px
}
</style>
