<template>
  <div v-if="tenantID !== null">
    <ApolloQuery :query="require('@/apollo/queries/query_group.gql')"
      :variables="{ takes: 15, tenant_id: (tenantID) ? tenantID : null }">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="halo">Loading...</div>
        <div v-else-if="error">
          <b-row>
            <b-col cols="12">
              <div class="alert alert-info">{{ error.message }}</div>
            </b-col>
          </b-row>
        </div>
        <div v-else-if="data">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th class="text-left">Nama</th>
                  <th class="text-left">Slug</th>
                  <th class="text-center">Tipe</th>
                  <th class="text-center">Jalur</th>
                  <th class="text-center">Parent</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-if="(data.KATGrup !== null) && (data.KATGrup.length !== 0)">
                <tr v-for="(item, index) in data.KATGrup">
                  <td>{{ index+1 }}</td>
                  <td>{{ item.nama }}</td>
                  <td>{{ item.slug }}</td>
                  <td class="text-center">{{ item.tipe }}</td>
                  <td class="text-center">{{ item.jalur }}</td>
                  <td class="text-center">{{ item.parent_id }}</td>
                  <td><b-link :to="{ name: 'katalog-kategori-add', query: { tenant: tenantID, id: item.id } }" disabled class="btn btn-link">Edit</b-link></td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr><td colspan="7" class="text-center">Belum ada data</td></tr>
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