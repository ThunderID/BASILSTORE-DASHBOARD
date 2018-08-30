<template>
  <div>
    <b-button variant="primary mb-3 px-3" :to="'/catalog/product'">Kembali</b-button>
    <b-card title="">
      <b-container fluid>
        <b-row>
          <b-col>
            <b-img-lazy src="http://drive.thunder.id/file/public/4/10/2017/01/09/15/Arpisa-Front-xs.jpg" thumbnail/>
          </b-col>
          <b-col md="9">
            <h4>Batik Kris - 88GHMN00</h4>
            <h5 class="font-weight-light">IDR 300.000</h5>
            <div class="clearfix">&nbsp;</div>
            <div class="clearfix">&nbsp;</div>
            <p><strong>Kategori</strong></p>
            <div class="clearfix">&nbsp;</div>
            <p><strong>Varian</strong></p>
            <div class="clearfix">&nbsp;</div>
            <p><strong>Dijual ditoko</strong></p>
            <div class="clearfix">&nbsp;</div>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import CatalogQuery from '~/apollo/queries/query_catalog'

export default {
  props: {
    dataFilter: {
      type: Object,
      default: function () {
        return {}
      }
    },
    defaultData: {
      type: Array,
      default: function () {
        return []
      }
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
        filter: {
          skip: 0,
          take: 1,
          toko: 'KORAKADINOYO',
          kostumer: 'SAYA',
          waktu: 'today'
        }
      }
    }
  },
  mounted () {
    if (this.defaultData.length === 0) {
      this.fetch()
    } else {
      // this.table.data = this.defaultData
    }
  },
  methods: {
    fetch () {
      let vm = this
      vm.table.data = []
      let queryVar = {
        toko: vm.table.filter.toko,
        kostumer: vm.table.filter.kostumer,
        waktu: vm.table.filter.waktu,
        skip: vm.table.filter.skip,
        take: vm.table.filter.take
      }

      this.$apollo.query(
        {
          query: CatalogQuery,
          variables: queryVar,
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        vm.table.data = result.data.SalesKatalog
      }).catch(e => {
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