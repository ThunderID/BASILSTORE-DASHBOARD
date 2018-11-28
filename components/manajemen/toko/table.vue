<template>
  <div>
    <ApolloQuery :query="require('@/apollo/queries/query_store.gql')"
      :variables="{ takes: 15 }">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading">Loading...</div>
				<div v-else-if="error" class="alert alert-danger">An error occured</div>
				<div class="table-responsive" v-else-if="data">
					<table class="table">
						<thead>
							<tr>
								<th>#</th>
								<th class="text-left">Nama Toko</th>
								<th class="text-center">Jenis</th>
								<th>Bidang Industri</th>
								<th></th>
							</tr>
							<tr v-for="(toko, index) in data.MANListTenant">
								<td>{{ index+1 }}</td>
								<td class="text-left">{{ toko.nama }}</td>
								<td class="text-center"><b-badge variant="light">{{ toko.jenis }}</b-badge></td>
								<td>{{ toko.industri }}</td>
								<td></td>
							</tr>
						</thead>
					</table>

				</div>
				<table>

				</table>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
}
</script>