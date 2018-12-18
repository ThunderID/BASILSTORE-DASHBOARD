<template>
  <div v-if="tenantID !== null">
    <ApolloQuery :query="require('@/apollo/queries/query_order.gql')"
      :variables="{ take: 15, skip: 0, tenant_id: (tenantID) ? tenantID : null }">
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
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nomor Orderan</th>
                  <th>Pemesan</th>
                  <th>Status</th>
                  <th class="text-right">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-if="(data.SALListOrder !== null) && (data.SALListOrder.length !== 0)">
                <tr v-for="(item, index) in data.SALListOrder" :key="item.nomor">
                  <td>{{ index+1 }}</td>
                  <td>
                    <b-link :to="{ name: 'transaksi-order-id', params: { id: item.nomor }, query: { tenantID: tenantID }}">{{ item.nomor }}</b-link>
                  </td>
                  <td>{{ item.pemesan.nama }}</td>
                  <td class="text-uppercase">{{ item.list_track[item.list_track.length - 1].status }}</td>
                  <td class="text-right">
                    {{ item.total.currency }} {{ item.total.nominal | toCurrency }}
                  </td>
                  <td class="text-right">
                    <b-link href="#" class="text-primary"><i class="fas fa-edit"></i></b-link> &nbsp;
                    <b-link href="#" class="text-danger"><i class="fas fa-trash"></i></b-link>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr><td colspan="6" class="text-center">Belum ada data</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </ApolloQuery>
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
export default {
  props: {
    tenantID: {
      type: String
    }
  }
}
</script>
