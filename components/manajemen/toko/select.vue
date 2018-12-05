<template>
  <div>
    <ApolloQuery :query="require('@/apollo/queries/query_toko.gql')"
      :variables="{ takes: 0 }" :fetchPolicy="'no-cache'" > 
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error" class="alert alert-danger">An error occured</div>
        <div v-else-if="data">
          <b-form inline class="bg-white box-shadow border rounded p-2">
            <i class="fas fa-store-alt fa-lg"></i>&nbsp;&nbsp;
            <b-form-group style="width: 80%;">
              <v-select no-data-text :value="selected" :options="data.MANListTenant" label="nama" @input="getValue" class="w-100"></v-select>
            </b-form-group>
          </b-form>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  methods: {
    getValue (data) {
      this.$emit('SELECTED', data)
      this.$router.push({query: { tenantID: data.id }})
    }
  }
}
</script>