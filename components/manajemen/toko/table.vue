<template>
  <div>
    <b-table hover 
      :fields="computedHeaders"
      :items="dataTable"
      @row-clicked="rowClicked"
      empty-text="Tidak ada data">
    </b-table>
  </div>
</template>
<script>

import TokoQuery from '~/apollo/queries/query_toko'

export default {
  props: {
    headers: {
      type: Array,
      default: function () {
        return []
      }
    },
    defaultData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    computedHeaders: function () {
      let temp = this
      let tmp = []
      temp.headers.forEach(function (item) {
        for (let i = 0; i < temp.table.availableHeaders.length; i++) {
          if (temp.table.availableHeaders[i].key === item) {
            tmp.push(temp.table.availableHeaders[i])
          }
        }
      })

      return tmp
    },
    dataTable: function () {
      let data = this.table.data
      return data
    }
  },
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
      table: {
        data: [],
        availableHeaders: [
          { key: 'nama', label: 'Nama', sortable: true },
          { key: 'jenis', label: 'Jenis', sortable: true },
          { key: 'industri', label: 'Industri', sortable: false }
        ]
      }
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      let vm = this
      vm.table.data = []

      this.$apollo.query(
        {
          query: TokoQuery,
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        vm.table.data = result.data.MANListTenant
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
    },
    rowClicked (record, index) {
      let vm = this
      // console.log(vm.dataFilter)
      vm.$nuxt.$router.replace({path: '/catalog/product/' + record.upc, query: vm.dataFilter})
    }
  }
}
</script>