<template>
  <v-progress-circular
    indeterminate
    color="primary"
  />
</template>

<script>
// helpers

// hard reload
// a pragmatic way of cleaning up the state
const redirect = () =>
  window.location.replace('/auth')

//

export default {
  name: 'LogoutPage',
  layout: 'auth',
  fetch ({ router, store }) {
    return store
      .dispatch('auth/logout')
      .then(redirect)
  }
}

</script>
