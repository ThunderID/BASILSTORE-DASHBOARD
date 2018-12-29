<template>
  <div v-if="tenantID !== null">
    
    <ApolloQuery :query="require('@/apollo/queries/query_stock.gql')"
    :variables="{ tenant_id: (tenantID) ? tenantID : null }" :fetchPolicy="'no-cache'" >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- <div>
          {{data}}
        </div> -->
        <div v-if="loading">Loading...</div>
        <div v-else-if="error" class="alert alert-danger">An error occured</div>
        <div v-else-if="data">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th class="text-left">UPC</th>
                  <th class="text-left">Nama</th>
                  <th class="text-center">Thumbnail</th>
                  <th class="text-center">Stok</th>
                </tr>
              </thead>
              <tbody v-if="(data.INVListStok !== null) && (data.INVListStok.length !== 0)">
                <tr v-for="(item, index) in data.INVListStok" @click="rowClicked(item, tenantID)">
                  <td>{{ index+1 }}</td>
                  <td>{{ item.upc }}</td>
                  <td>{{ item.nama }}</td>
                  <td class="text-center"><b-img style="width:150px;height:150px;" :src="`${item.galeri.thumbnail}`" fluid alt="Responsive image" /></td>
                  <td v-if="item.pengaturan.is_stok" class="text-center">Tersedia</td>
                  <td v-else class="text-center">Kosong</td>
                </tr>
              <!-- <b-pagination align="right" :total-rows="data.KATListProduk.length" :per-page="5" v-model="currentPage"></b-pagination> -->
              </tbody>
              <tbody v-else>
                <tr><td colspan="6" class="text-center">Belum ada data</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </ApolloQuery>
    <!-- <b-table hover 
      :fields="computedHeaders"
      :items="dataTable"
      @row-clicked="rowClicked"
      empty-text="Tidak ada data">
      <template slot="thumbnail" slot-scope="data">
        <b-img-lazy v-if="data.value" :src="data.value" width="75" blank-color="#bbb"/>
        <b-img v-else blank width="75" blank-color="#bbb" tes/>
      </template>
      <template slot="harga" slot-scope="data">
        <span v-if="data.value">{{ data.value.currency }} {{ data.value.nominal | toCurrency }}</span>
      </template>
    </b-table> -->
  </div>
  <div v-else>
    <b-row>
      <b-col cols="12">
        <div class="alert alert-info">Silahkan pilih toko terlebih dahulu</div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
// import CatalogQuery from '~/apollo/queries/query_catalog'

export default {
  props: {
    tenantID: {
      type: String
    }
    // headers: {
    //   type: Array,
    //   default: function () {
    //     return []
    //   }
    // },
    // dataFilter: {
    //   type: Object,
    //   default: function () {
    //     return {}
    //   }
    // },
    // defaultData: {
    //   type: Array,
    //   default: function () {
    //     return []
    //   }
    // }
  },
  computed: {
    // computedHeaders: function () {
    //   let temp = this
    //   let tmp = []
    //   temp.headers.forEach(function (item) {
    //     for (let i = 0; i < temp.table.availableHeaders.length; i++) {
    //       if (temp.table.availableHeaders[i].key === item) {
    //         tmp.push(temp.table.availableHeaders[i])
    //       }
    //     }
    //   })

    //   return tmp
    // },
    // dataTable: function () {
    //   let data = this.table.data
    //   return data
    // }
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
      tenantID: '',
      currentPage: 1,
      perPage: 5
    }
  },
  mounted () {
    // if (this.defaultData.length === 0) {
    //   this.fetch()
    // } else {
    //   this.table.data = this.defaultData
    // }
  },
  methods: {
  //   fetch () {
  //     let vm = this
  //     vm.table.data = []
  //     let queryVar = {}

  //     for (let key in this.dataFilter) {
  //       if (this.dataFilter.hasOwnProperty(key)) {
  //         queryVar[key] = this.dataFilter[key]
  //       }
  //     }
  //     this.$apollo.query(
  //       {
  //         query: CatalogQuery,
  //         variables: queryVar,
  //         fetchPolicy: 'no-cache'
  //       }
  //     ).then(function (result) {
  //       vm.table.data = result.data.pengaturanBarang
  //     }).catch(e => {
  //       console.log('gagal')
  //       if (e.graphQLErrors && Array.isArray(e.graphQLErrors) && e.graphQLErrors.length) {
  //         e.graphQLErrors.forEach(function (error) {
  //           switch (error.code) {
  //             case 401:
  //               vm.$nuxt.$router.replace({ path: '/' })
  //               break

  //             default:
  //               vm.$emit('SUBMIT_FAIL', error.code)
  //               break
  //           }
  //         })
  //       } else if (e.networkError.message) {
  //         vm.$emit('SUBMIT_ERROR', 'Fail to connect to server')
  //       }
  //     })
  //   },
    rowClicked (record, tenant, index) {
      let vm = this
      console.log(record + tenant)
      vm.$nuxt.$router.replace({path: '/katalog/produk/' + record.upc, query: tenant})
    }
  }
}
</script>