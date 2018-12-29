<template>
  <div>
    <ApolloQuery :query="require('@/apollo/queries/query_group.gql')"
      :variables="{ tenant_id: tenantTemp.join('')}" :fetchPolicy="'no-cache'" > 
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error" class="alert alert-danger">An error occured 1</div>
        <div v-else-if="data">
          <b-form inline class="bg-white box-shadow border rounded">
            &nbsp;&nbsp;
            <b-form-group style="width: 90%;">
              <v-select :clearable="false" no-data-text :value="selected" :options="data.KATGrup" label="nama" @input="getValue" class="w-100"></v-select>
            </b-form-group>
          </b-form>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tenantTemp: Object.values(this.$route.query)
    }
  },
  methods: {
    getValue (data) {
      this.$emit('SELECTED', data)
      // this.$router.push({query: { tenantID: data.id }})
    }
  }
}
</script>