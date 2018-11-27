<template>
  <b-container fluid>
    <b-row class="justify-content-center">
      <b-col cols="12" md="10">
        <b-row align-h="end">
          <b-col cols="12" md="1"><h4 class="text-right"></h4></b-col>
          <b-col cols="12" md="5">
            <SelectToko @SELECTED="SelectedToko"></SelectToko>
          </b-col>
        </b-row>
        <b-row align-h="between">
          <b-col>
            <b-button variant="primary mb-3 px-3" :to="{ name: 'katalog-produk-add', query: { tenantID: tenantData }}">Tambah Baru</b-button>
          </b-col>
        </b-row>
        <b-card title="Produk">
          <div class='card-text pt-4'>
            <TableProduk :tenantID="tenantData"></TableProduk>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SelectToko from '~/components/manajemen/toko/select'
import TableProduk from '~/components/katalog/produk/table'
export default {
  components: { SelectToko, TableProduk },
  data () {
    return {
      tenantData: null
    }
  },
  computed: {
    storeChoice: function () {
      return this.selectedStore.value
    },
    Selected: function () {
      return this.tenantData
    }
  },
  methods: {
    SelectedToko (data) {
      if (data) {
        this.tenantData = data.id
      }
    },
    check (val) {
      this.selectedStore = val

      setTimeout(() => {
        this.$refs.TableProduct.fetch()
      }, 10)
    // },
    // catalogClicked (catalogUPC) {
    //   this.$nuxt.$router.replace({path: '/catalog/product/' + catalogUPC, query: this.dataFilter})
    }
  }
}
</script>