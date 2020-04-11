<template>
  <v-card class="mx-auto text-center">
    <v-card-text>
      <v-sparkline
        :value="statPoints"
        :labels="statLabels"
        height="100"
        padding="24"
        stroke-linecap="round"
        smooth
      />
    </v-card-text>

    <v-divider />

    <v-card-actions class="align-start">
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="form.date"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="form.date"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          />
        </template>
        <v-date-picker v-model="form.date" scrollable>
          <v-spacer />
          <v-btn text color="primary" @click="modal = false">
            Cancel
          </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(form.date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>

      <v-spacer />

      <v-select
        v-model="form.city"
        :items="cities"
        prepend-icon="mdi-map"
        menu-props="auto"
        hide-details
        label="Select city"
        single-line
      />
    </v-card-actions>
  </v-card>
</template>

<script src="./main.js"></script>
