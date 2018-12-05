<template>
  <div class="container-fluid">
    <b-row align-h="between">
      <b-col cols="12" md="6">
        <b-button variant="primary mb-3 px-3" :to="'/katalog/produk'">Kembali</b-button>
      </b-col>
    </b-row>
    <b-card>
      <b-media>
        <b-img-lazy v-if="this.gambar"  slot="aside" :src="`${this.gambar}`" :alt="table.data.nama" thumbnail fluid style="width:300px;height:300px;" height="auto" blank-color="#bbb"/>
        <b-img v-else blank slot="aside" :alt="table.data.nama" thumbnail fluid  blank-color="#bbb" width="230"/>
        <div class="p-3">
          <!-- <h4>{{ this.gambar}}</h4> -->
          <p class="font-weight-light">
            <span v-if="table.data.harga">{{ table.data.harga.currency }} {{ table.data.harga.nominal | toCurrency }}</span>
          </p>
          <div class="row">
            <div class="col-12 col-md-6">
              <b-form-group label="UPC">
                <b-form-input data-vv-name="UPC" v-validate="'required'" v-model="upc" :state="errors.has('UPC')" placeholder="UPC Produk"></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('UPC')">{{ errors.first('UPC') }}</b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-12 col-md-6">
              <b-form-group label="Nama Produk">
                <b-form-input data-vv-name="Nama Produk" v-validate="'required'" v-model="nama" :state="errors.has('Nama Produk')" placeholder="Nama Produk"></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('Nama Produk')">{{ errors.first('Nama Produk') }}</b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-12 col-md-6">
              <b-form-group label="URL Gambar">
                <b-form-input data-vv-name="URL Gambar" v-validate="'required'" v-model="gambar" :state="errors.has('URL Gambar')" placeholder="URL Gambar"></b-form-input>
                <b-form-valid-feedback :force-show="errors.has('URL Gambar')">{{ errors.first('URL Gambar') }}</b-form-valid-feedback>
              </b-form-group>
            </div>
          </div>
          <div v-if="table.data.list_grup">
            <b-badge class="mr-1" variant="primary" v-for="grup in table.data.list_grup">
              {{grup.keyword.substring(grup.keyword.lastIndexOf(",") + 1)}}
            </b-badge>
          </div>
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

          <!-- list harga -->
          <p v-if="table.data.list_harga && table.data.list_harga != 0"><strong>List Harga</strong></p>
          <div v-if="table.data.list_harga && table.data.list_harga != 0" >
            <b-card  header-tag="header" class="w-100">
              <b-table hover small
                show-empty
                empty-text="Belum ada list harga"
                class="text-capitalize"
                :fields="[
                  {key: 'harga', label: 'Harga', thClass: 'font-weight-bold border-top-0'}, 
                  {key: 'mulai', label: 'Berlaku Tgl', thClass: 'font-weight-bold border-top-0'}, 
                  {key: 'pengaturan', label: 'Satuan', thClass: 'font-weight-bold border-top-0'}
                ]"
                :items="table.data.list_harga">
                <template slot="harga" slot-scope="data">
                  <span v-if="data.item.harga">{{ data.item.harga.currency }} {{ data.item.harga.nominal | toCurrency }}</span>
                </template>

                <template slot="mulai" slot-scope="data">
                  <span v-if="data.item.mulai">{{ data.item.mulai.date | toDateTime }}</span>
                </template>

                <template slot="pengaturan" slot-scope="data">
                  <span v-if="data.item.pengaturan" class="text-uppercase">{{ data.item.pengaturan.penetapan.bundle }}   {{ data.item.pengaturan.penetapan.satuan }}</span>
                </template>
              </b-table>
            </b-card>
          </div>
          <div class="clearfix">&nbsp;</div>          
          <div class="clearfix">&nbsp;</div>
           <!-- keyword -->
          <p v-if="table.data.list_keyword && table.data.list_keyword.length != 0"><strong>Keyword</strong></p>
          <div v-if="table.data.list_keyword && table.data.list_keyword.length != 0">
            <b-card header-tag="header" class="w-100">
              <b-table hover small
                show-empty
                :empty-text="'Belum ada Keyword'"
                class="text-capitalize"
                :fields="[ 
                {key: 'word', label: 'Keyword', thClass: 'font-weight-bold border-top-0'}, 
                {key: 'tag', label: 'Tag', thClass: 'font-weight-bold border-top-0'}]"
                :items="table.data.list_keyword">
              </b-table>
            </b-card>
            <div class="clearfix">&nbsp;</div>
          </div>
          <div class="clearfix">&nbsp;</div>

        </div>
        <div class="clearfix">&nbsp;</div>
      </b-media>
    </b-card>
  </div>
</template>

<script>
import CatalogQuery from '~/apollo/queries/query_produk'

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
      },
      tenantID: '',
      gambar: '',
      upc: '',
      nama: ''
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      let vm = this
      vm.table.data = []
      let queryVar = {}
      var tenantTemp = []
      tenantTemp = Object.values(this.$route.query)
      this.tenantID = tenantTemp.join('')
      console.log(this.tenantID)
      queryVar.upc = this.$route.params.upc
      queryVar.tenant_id = this.tenantID

      this.$apollo.query(
        {
          query: CatalogQuery,
          variables: queryVar,
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        vm.gambar = result.data.KATListProduk[0].galeri.thumbnail
        vm.upc = result.data.KATListProduk[0].upc
        vm.nama = result.data.KATListProduk[0].nama
        vm.table.data = result.data.KATListProduk[0]
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