<template>
  <v-list dense>
    <v-list-item two-line>
      <v-list-item-avatar color="primary">
        <v-icon>
          mdi-account-circle
        </v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          {{ user.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ user.email }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list-item
      v-for="(item, i) in navItems"
      :key="i"
      :to="item.to"
      router
      exact
    >
      <v-list-item-action>
        <v-icon>
          {{ item.icon }}
        </v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
const props = {
  user: {
    type: Object,
    required: true
  },
  navItems: {
    type: Array,
    default: () => []
  }
}

export default {
  name: 'TheDrawerContent',
  props
}
</script>
