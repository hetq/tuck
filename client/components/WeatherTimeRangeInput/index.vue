<template>
  <v-menu
    v-model="isActive"
    :close-on-content-click="false"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="inputValue"
        readonly
        prepend-icon="mdi-calendar"
        v-on="on"
      />
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
