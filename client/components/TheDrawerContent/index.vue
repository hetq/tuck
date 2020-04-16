<template>
  <v-list dense>
    <user-item :value="session" />

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
import UserItem from '@/components/UserItem'

const props = {
  session: {
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
  components: {
    UserItem
  },
  props
}
</script>
