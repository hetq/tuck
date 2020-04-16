<template>
  <v-list-item
    v-if="user"
    two-line
  >
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
</template>

<script>
const props = {
  value: {
    type: Object,
    required: true
  }
}

const computed = {
  user () {
    return this.value
      .getOrElse(null)
  }
}

export default {
  name: 'UserItem',
  props,
  computed
}
</script>
