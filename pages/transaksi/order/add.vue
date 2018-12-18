<template>
  <b-container fluid>
    <b-row class="justify-content-center">
      <b-col cols="12" md="12">
        <b-row align-h="end">
          <b-col cols="12" md="7">
            <b-button variant="secondary" :to="{ name: 'transaksi-order', query: { tenantID: tenantID }}">Kembali</b-button>
          </b-col>
          <b-col cols="12" md="5">
            <SelectToko @SELECTED_TOKO="SelectedToko"></SelectToko>
          </b-col>
        </b-row>
        <div class="clearfix">&nbsp;</div>
        <b-row>
          <b-col>
            <b-card title="Katalog">
              <div class='card-text pt-4'>
                <b-form-input type="text" placeholder="Cari katalog" class="mb-3"></b-form-input>
                <ListKatalog :tenantID="tenantData" :link="'produkDetail'" @SELECTED_PRODUK="selectedProduk"></ListKatalog>
                <b-modal id="produkDetail" 
                  :title="(produkSelected.nama) ? produkSelected.nama : ''" 
                  size="lg"
                  ok-title="Pesan"
                  cancel-title="Batal"
                  @show="modalKatalogHide"
                  @ok="modalKatalogOk">
                  <div v-for="(item, index) in produkSelected.opsi" :key="item.id">
                    <p class="font-weight-bold mb-2">{{ item.judul }}</p>
                    <table class="table w-100">
                      <thead>
                        <tr>
                          <th>Varian</th>
                          <th>SKU</th>
                          <th style="width: 15%;">Jumlah</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <b-form-select v-model="temp.varian" @change.native="selectVarian" placeholder="Pilih Varian" :data-opsi-id="item.id">
                              <template slot="first">
                                <option :value="null" disabled>Pilih Varian</option>
                              </template>
                              <option v-for="(item2, index2) in item.varian" 
                                :key="item2.sku" 
                                :value="item2.value" 
                                :data-sku="item2.sku" 
                                :data-bundle-satuan="item2.bundle.satuan"
                                :data-bundle-kuantitas="item2.bundle.kuantitas">{{ item2.value }}</option>
                            </b-form-select>
                          </td>
                          <td>
                            <b-form-input type="text" v-model="temp.sku" readonly></b-form-input>
                          </td>
                          <td>
                            <b-form-input type="number" min="0" v-model="temp.jumlah"></b-form-input>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-modal>
              </div>
            </b-card>
          </b-col>
          <b-col cols="12" md="4">
            <b-card title="Cart List">
              <div class='card-text pt-4'>
                <b-list-group>
                  <b-list-group-item v-if="(cart.length !== 0)"
                    v-for="(item, index) in cart" :key="index" class="border-0 px-1 py-2">
                    <hr class="mt-1 mb-3"/>
                    <p class="mb-0 font-weight-bold">{{ item.nama }}</p>
                    <div class="d-flex w-100 justify-content-between">
                      <p class="mb-1">
                        Jumlah : <br/>
                        <b-form-input size="sm" :value="item.jumlah" type="number" class="w-50 d-inline" @change.native="sumItem" :data-harga="item.harga.harga.nominal" :data-id="index"></b-form-input>
                      </p>
                      <p class="mb-1"><br/>x</p>
                      <p class="mb-1"><br/>{{ item.harga.harga.currency }} {{ item.harga.harga.nominal | toCurrency }}</p>
                    </div>
                    <div class="text-right">
                      <b-link class="text-danger" @click="removeItemCart(index)"><i class="fas fa-trash"></i></b-link>
                    </div>
                  </b-list-group-item>
                  <b-list-group-item v-else>
                    belum ada item
                  </b-list-group-item>
                  <b-list-group-item class="border-left-0 border-right-0 border-bottom-0 px-1 py-2">
                    <div class="d-flex w-100 justify-content-between">
                      <p class="font-weight-bold text-uppercase">SubTotal</p>
                      <p class="text-right font-weight-bold">IDR {{ subTotal | toCurrency }}</p>
                    </div>
                  </b-list-group-item>
                </b-list-group>
                <hr/>
                <div class="d-flex w-100 justify-content-between">
                  <ApolloMutation
                    :mutation="require('@/apollo/mutations/Order.gql')"
                    :variables="{
                      tenant_id: (tenantData) ? tenantData : null,
                      tambahDetail: cartTemp
                    }"
                    @done="onDone">
                    <template slot-scope="{mutate, loading, gqlError: error }">
                      <b-button variant="primary" block @click="mutate()">Order</b-button>
                    </template>
                  </ApolloMutation>
                </div>
              </div>
            </b-card>
            <div class="clearfix">&nbsp;</div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import SelectToko from '~/components/manajemen/toko/select'
import ListKatalog from '~/components/katalog/produk/list'
import FormOrder from '~/components/transaksi/sales/form'
export default {
  data () {
    return {
      tenantData: (this.$route.query.tenantID) ? this.$route.query.tenantID : '',
      produkSelected: '',
      cart: [],
      cartTemp: [],
      temp: {
        sku: '',
        varian: '',
        jumlah: 0,
        opsiID: '',
        bundle: {
          kuantitas: 0,
          satuan: ''
        }
      },
      item: [],
      itemTotal: {},
      subTotal: 0
    }
  },
  components: { SelectToko, FormOrder, ListKatalog },
  watched: {
    sumCoba (event) {
      this.itemTotal[event.target.attributes['data-id'].value] = event.target.value * event.target.attributes['data-harga'].value
      this.sumTotal()
    }
  },
  methods: {
    SelectedToko (data) {
      if (data) {
        this.tenantData = data.id
        return this.tenantData
      } else if (this.$route.query.tenantID) {
        return this.tenantData
      }
    },
    selectedProduk (data) {
      this.produkSelected = data
    },
    selectVarian (event) {
      this.temp.sku = event.target.options[event.target.selectedIndex].attributes['data-sku'].value
      this.temp.varian = event.target.options[event.target.selectedIndex].value
      this.temp.opsiID = event.target.attributes['data-opsi-id'].value
      this.temp.bundle.satuan = event.target.options[event.target.selectedIndex].attributes['data-bundle-satuan'].value
      this.temp.bundle.kuantitas = event.target.options[event.target.selectedIndex].attributes['data-bundle-kuantitas'].value
    },
    modalKatalogHide () {
      this.temp.sku = ''
      this.temp.varian = null
      this.temp.jumlah = 0
      this.temp.bundle.kuantitas = 0
      this.temp.bundle.satuan = ''
      this.item = []
    },
    modalKatalogOk () {
      this.item.push({
        opsi_id: this.temp.opsiID,
        sku: this.temp.sku,
        jumlah: {
          kuantitas: this.temp.bundle.kuantitas,
          satuan: this.temp.bundle.satuan
        }
      })
      this.cart.push({
        upc: this.produkSelected.upc,
        nama: this.produkSelected.nama,
        jumlah: this.temp.jumlah,
        item: this.item,
        harga: this.produkSelected.harga
      })
      this.cartTemp.push({
        upc: this.produkSelected.upc,
        jumlah: {
          kuantitas: this.temp.jumlah,
          satuan: this.temp.bundle.satuan
        },
        item: this.item
      })
      this.sumItemAll()
      this.sumTotal()
    },
    sumItem (event) {
      this.itemTotal[event.target.attributes['data-id'].value] = event.target.value * event.target.attributes['data-harga'].value
      this.cartTemp[event.target.attributes['data-id'].value].jumlah = event.target.value
      this.sumTotal()
    },
    sumItemAll () {
      for (var i in this.cart) {
        this.itemTotal[i] = this.cart[i].jumlah * this.cart[i].harga.harga.nominal
      }
    },
    sumTotal () {
      let tempCalc = 0
      for (var i in this.itemTotal) {
        tempCalc += this.itemTotal[i]
      }
      this.subTotal = tempCalc
    },
    removeItemCart (idx) {
      this.cart.splice((idx), 1)
      this.cartTemp.splice((idx), 1)
    },
    onDone () {
      console.log({1: this.cart, 2: this.cartTemp})
      this.modalKatalogHide()
    }
  }
}
</script>
