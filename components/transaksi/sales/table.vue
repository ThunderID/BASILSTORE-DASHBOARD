<template>
  <div v-if="tenantID !== null">
    <ApolloQuery :query="require('@/apollo/queries/query_sales.gql')"
      :variables="{ take: 15, skip: 0, tenant_id: (tenantID) ? tenantID : null }">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="halo">Loading...</div>
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
                  <th class="text-right">total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-if="(data.SALListOrder !== null) && (data.SALListOrder.length !== 0)">
                <tr v-for="(item, index) in data.SALListOrder">
                  <td>{{ index+1 }}</td>
                  <td>{{ item.nomor }}</td>
                  <td>{{ item.pemesan.nama }}</td>
                  <td class="text-right">{{ item.total.currency }} {{ item.total.nominal }}</td>
                  <th></th>
                </tr>
              </tbody>
              <tbody v-else>
                <tr><td colspan="5" class="text-center">Belum ada data</td></tr>
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
