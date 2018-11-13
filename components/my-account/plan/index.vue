<template>
  <div>
    <h3>Saat ini anda menggunakan plan <b-badge>New</b-badge></h3>
    <br>
    <b-row>
      <b-col cols="12">
        <b-button :to="'/my-account/plansaya/upgrade'" type="button" variant="primary" block :disabled="isLoading">
          <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Upgrade Sekarang</span>
          <span v-else>Upgrade Sekarang</span>
        </b-button>
      </b-col>
    </b-row>
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
  },
  onUpgrade () {
  }
}
</script>