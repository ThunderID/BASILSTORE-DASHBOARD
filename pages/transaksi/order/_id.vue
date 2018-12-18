<template>
  <ApolloQuery
    :query="require('@/apollo/queries/query_order.gql')"
    :variables="{ take: 1, skip: 0, tenant_id: (tenantID) ? tenantID : null, nomor: (nomor) ? nomor: null }">
    <template slot-scope="{ result: { loading, error, data } }">
      <div v-if="loading">
        <div class="fa-3"><i class="fas fa-circle-notch fa-spin"></i></div>
      </div>
      <div v-else-if="error">
          <b-row>
          <b-col cols="12">
            <div class="alert alert-danger">{{ error.message }}</div>
          </b-col>
        </b-row>
      </div>
      <div v-else-if="data">
        <b-container fluid>
          <b-row class="justify-content-center">
            <b-col cols="12">
              <b-row align-h="start">
                <b-col cols="12" md="12">
                  <b-button variant="secondary" :to="{ name: 'transaksi-order', query: { tenantID: tenantID }}">Kembali</b-button>
                </b-col>
              </b-row>
              <div class="clearfix">&nbsp;</div>
              <div v-for="(item, index) in data.SALListOrder" :key="item.nomor">
                <b-card title="Detail Orderan">
                  <hr/>
                  <div class='card-text pt-3'>
                    <b-row>
                      <b-col>
                        <b-form-group class="mb-1"
                          label="Nomor Invoice"
                          label-for="exampleInput1"
                          label-class="pb-0 text-secondary"
                          description="">
                          <p class="text-dark">{{ nomor }}</p>
                        </b-form-group>
                      </b-col>
                      <b-col>
                        <b-form-group class="mb-1"
                          label="Status Orderan"
                          label-class="pb-0 text-secondary"
                          description="">
                          <p class="text-dark text-capitalize">{{ item.list_track[item.list_track.length - 1].status }}</p>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <b-form-group class="mb-1"
                          label="Pemesan"
                          label-for="exampleInput1"
                          label-class="pb-0 text-secondary"
                          description="">
                          <p class="text-dark">{{ item.pemesan.nama }}</p>
                        </b-form-group>
                      </b-col>
                      <b-col>
                        <b-form-group class="mb-1"
                          label="Penyedia"
                          label-class="pb-0 text-secondary"
                          description="">
                          <p class="text-dark text-capitalize">{{ item.penyedia.nama }}</p>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <b-form-group class="mb-1"
                          label="Batas Checkout"
                          label-class="pb-0 text-secondary"
                          description="">
                          <p class="text-dark text-capitalize">{{ item.kadaluarsa.date | toDateTime }}</p>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <div class="clearfix">&nbsp;</div>
                    <table class="table">
                      <thead>
                        <tr>
                          <th class="font-weight-bold text-center">Daftar Produk</th>
                          <th class="font-weight-bold text-center">Harga Produk</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in item.detail">
                          <td>
                            <p class="mb-0">{{ item.nama }}</p>
                            <p class="mb-2">{{ item.jumlah.kuantitas }} {{ item.jumlah.satuan }} x {{ item.harga.currency }} {{ item.harga.nominal | toCurrency }}</p>
                            <p class="text-secondary">{{ item.item[item.item.length - 1].nama }}</p>
                          </td>
                          <td class="text-info text-right">{{ item.harga.currency }} {{ (item.harga.nominal * item.jumlah.kuantitas) | toCurrency }}</td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold text-right">Total</td>
                          <td class="text-info text-right font-weight-bold">{{ item.total.currency }} {{ item.total.nominal | toCurrency }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </template>
    <div class="clearfix">&nbsp;</div>
  </ApolloQuery>
</template>
<script>
export default {
  data () {
    return {
      tenantID: (this.$route.query.tenantID) ? this.$route.query.tenantID : null,
      nomor: (this.$route.params.id) ? this.$route.params.id : null
    }
  }
}
</script>
