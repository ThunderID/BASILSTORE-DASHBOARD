<template>
  <div>
    <h2>Example heading <b-badge>New</b-badge></h2>
  </div>
</template>
<script>

import MyplanQuery from '~/apollo/queries/query_myplan'

export default {
  apollo: {
    // -----------------------------------------------------------------------------------------------------------------------
    // TO MODIFY
    // -----------------------------------------------------------------------------------------------------------------------
    $client: 'customer'
    // -----------------------------------------------------------------------------------------------------------------------
    // END TO MODIFY
    // -----------------------------------------------------------------------------------------------------------------------
  },
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      let vm = this
      let queryVar = {}

      this.$apollo.query(
        {
          query: MyplanQuery,
          variables: queryVar,
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        vm.data = result.data.UACSubscription
      }).catch(e => {
        console.log('gagal')
        if (e.graphQLErrors && Array.isArray(e.graphQLErrors) && e.graphQLErrors.length) {
          e.graphQLErrors.forEach(function (error) {
            switch (error.code) {
              case 401:
                vm.$nuxt.$router.replace({ path: '/' })
                break

              default:
                vm.$emit('SUBMIT_FAIL', error.code)
                break
            }
          })
        } else if (e.networkError.message) {
          vm.$emit('SUBMIT_ERROR', 'Fail to connect to server')
        }
      })
    }
  }
}
</script>