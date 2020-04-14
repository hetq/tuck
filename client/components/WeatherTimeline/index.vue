<template>
  <v-timeline v-if="data.isSuccess()" dense>
    <v-timeline-item
      v-for="item in data.value"
      :key="Number(item.time)"
      right
      small
    >
      <v-card outlined dense>
        <v-card-text class="text-center">
          <em> {{ labelOf(item) }} </em>
        </v-card-text>

        <v-row>
          <v-col
            v-for="metric in metrics"
            :key="metric.key"
          >
            <v-list-item two-line>
              <v-list-item-icon>
                <v-icon> mdi-{{ metric.icon }} </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.data[metric.key] }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ metric.key }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script src="./main.js"></script>
