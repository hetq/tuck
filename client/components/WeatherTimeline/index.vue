<template>
  <v-timeline v-if="data.isSuccess()">
    <v-timeline-item
      v-for="item in data.value"
      :key="Number(item.time)"
      right
      small
    >
      <v-chip
        slot="opposite"
        color="primary"
        outlined
      >
        <v-icon left small>
          mdi-clock
        </v-icon>
        <time :datetime="item.time.toISOString()">
          {{ labelOf(item) }}
        </time>
      </v-chip>

      <v-card outlined dense>
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
