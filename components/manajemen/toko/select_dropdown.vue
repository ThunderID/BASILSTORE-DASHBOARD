<template>
	<div>
		<ApolloQuery :query="require('@/apollo/queries/query_store.gql')"
      :variables="{ takes: 0 }">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading">Loading...</div>
				<div v-else-if="error" class="alert alert-danger">An error occured</div>
				<select name="" id="" class="form-control">
					<option value="">test</option>
				</select>
				<b-form-select v-else-if="data">
					<option v-for="item in data.MANListTenant" :value-field="item.nama">{{ item.nama }}</option>
				</b-form-select>
      </template>
		</ApolloQuery>
	</div>
</template>
