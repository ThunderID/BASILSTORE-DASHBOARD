<template>
  <div>
    <ApolloQuery :query="require('@/apollo/queries/query_store.gql')"
      :variables="{ takes: 15 }">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading">Loading...</div>
        <b-list-group v-else-if="data">
          <b-list-group-item v-for="toko in data.MANListTenant">
            <b-media>
              <i class="fas fa-store-alt fa-4x text-secondary mr-2" slot="aside" src="..." alt="Media Aside" /></i>
              <h5><b-badge variant="light" class="float-right">{{ toko.jenis }}</b-badge></h5>
              <h4 class="mb-1">{{ toko.nama }}</h4>
              <p class="text-secondary mb-1">{{ toko.industri }}</p>
            </b-media>
          </b-list-group-item>
        </b-list-group>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
}
</script>