<template>
  <v-skeleton-loader
    :loading="data.isLoading()"
    transition="fade-scale"
    height="100"
    type="image"
  >
    <v-timeline dense>
      <v-timeline-item
        v-for="item in timeSeries"
        :key="Number(item.time)"
        right
      >
        <v-card outlined dense>
          <v-card-title>
            <small> {{ labelOf(item) }} </small>
          </v-card-title>

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
  </v-skeleton-loader>
</template>

<script src="./main.js"></script>
