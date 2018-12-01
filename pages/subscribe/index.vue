<template>
	<div>
		<h1 class='text-center'>
      		Pilih Plan Anda
    	</h1>
		<div style="display: flex; text-align: center;">
			<b-card title="FREE TRIAL"
			        tag="article"
			        style="max-width: 20rem;"
			        class="mb-2">
			  <p class="card-text">
			    Some quick example text to build on the card title and make up the bulk of the card's content.
			  </p>
			  <b-button type="button" @click="onSelect" variant="primary">Pilih</b-button>
			</b-card>
			<b-card title="BASIC PLAN"
			        tag="article"
			        style="max-width: 20rem; float: right;"
			        class="mb-2">
			  <p class="card-text">
			    Some quick example text to build on the card title and make up the bulk of the card's content.
			  </p>
			  <b-button type="button" @click="onSelect" variant="primary" disabled>Pilih</b-button>
			</b-card>
		</div>   
	</div>
</template>
<script>
import Subscribe from '~/apollo/mutations/Subscribe'

export default {
  middleware: 'auth',
  apollo: {
    // -----------------------------------------------------------------------------------------------------------------------
    // TO MODIFY
    // -----------------------------------------------------------------------------------------------------------------------
    $client: 'customer'
    // -----------------------------------------------------------------------------------------------------------------------
    // END TO MODIFY
    // -----------------------------------------------------------------------------------------------------------------------
  },
  data () {
    return {
      data: {
        nomor: '',
        kode: '',
        input: []
      }
    }
  },
  methods: {
    onSelect (e) {
      console.log('select')
      let vm = this
      e.preventDefault()
      vm.isLoading = true
      if (vm.errors.count() === 0) {
        vm.transformedData = {
          kode: 'FREETRIAL',
          upgradePlan: vm.input
        }
        vm.$apollo.mutate({
          mutation: Subscribe,
          variables: vm.transformedData
        }).then(function (res) {
          vm.$nuxt.$router.replace({ path: '/manajemen/toko' })
          vm.isLoading = false
        }).catch(function (e) {
          console.log('fail')
          vm.isLoading = false
        })
      } else {
        vm.isLoading = false
      }
    }
  }
}
</script>