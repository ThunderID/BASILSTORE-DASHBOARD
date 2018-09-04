<template>
  <div>
    <b-button variant="primary mb-3 px-3" :to="'/catalog/product'">Kembali</b-button>
    <b-card>
      <b-media>
        <b-img-lazy v-if="table.data.thumbnail"  slot="aside" :src="`${table.data.thumbnail}`" :alt="table.data.nama" thumbnail fluid  blank-color="#bbb"/>
        <b-img v-else blank slot="aside" :alt="table.data.nama" thumbnail fluid  blank-color="#bbb" width="230"/>
        <div class="p-3">
          <h4>{{ table.data.nama }} - {{ table.data.upc }}</h4>
          <p class="font-weight-light">
            <span v-if="table.data.harga">{{ table.data.harga.currency }} {{ table.data.harga.nominal | toCurrency }}</span>
          </p>
          <div class="clearfix">&nbsp;</div>
          <p><strong>Kategori</strong></p>
          <div class="clearfix">&nbsp;</div>

          <!-- varian -->
          <p v-if="table.data.opsi && table.data.opsi.length != 0"><strong>Opsi</strong></p>
          <div v-if="table.data.opsi && table.data.opsi.length != 0" v-for="opsi in table.data.opsi">
            <b-card :header="opsi.judul" header-tag="header" class="w-100">
              <b-table hover small
                show-empty
                :empty-text="'Belum ada ' + opsi.judul"
                class="text-capitalize"
                :fields="[
                {key: 'parameter', label: 'Jenis', thClass: 'font-weight-bold border-top-0'}, 
                {key: 'value', label: 'Nilai', thClass: 'font-weight-bold border-top-0'}, 
                {key: 'sku', label: 'SKU', thClass: 'font-weight-bold border-top-0'}]"
                :items="opsi.varian">
              </b-table>
            </b-card>
            <div class="clearfix">&nbsp;</div>
          </div>
          <div class="clearfix">&nbsp;</div>

          <!-- promo  -->
          <b-card header="Promo" header-tag="header" class="w-100">
            <b-table hover small
              show-empty
              empty-text="Belum ada promo"
              :fields="[{key: 'judul', label: 'Judul', thClass: 'font-weight-bold border-top-0'}, {key: 'deskripsi', label: 'Deskripsi', thClass: 'font-weight-bold border-top-0'}]"
              :items="table.data.promo">
            </b-table>
          </b-card>
        </div>
        <div class="clearfix">&nbsp;</div>
      </b-media>
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
        filter: {}
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
      let queryVar = this.$route.query

      queryVar.upc = this.$route.params.upc

      this.$apollo.query(
        {
          query: CatalogQuery,
          variables: queryVar,
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        vm.table.data = result.data.SalesKatalog[0]
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