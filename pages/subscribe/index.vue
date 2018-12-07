<template>
	<div>
		<h1 class='text-center'>Pilih Plan Anda</h1>
		<div style="display: flex; text-align: center;" class="v-step-1">
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
    <!-- <v-tour name="myTour" :steps="steps" :callbacks="tourCallBacks"></v-tour> -->
    <v-tour name="myTour" :steps="steps">
      <template slot-scope="tour">
        <transition name="fade">
          <v-step
            class="bg-white text-dark text-left"
            v-if="tour.currentStep === index"
            v-for="(step, index) of tour.steps"
            :key="index"
            :step="step"
            :previous-step="tour.previousStep"
            :next-step="tour.nextStep"
            :stop="tour.stop"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
          >
            <template v-if="tour.currentStep === 0">
              <div slot="actions">
                <b-button @click="tour.stop" variant="outline-secondary" size="sm">&nbsp;Tidak&nbsp;</b-button>
                &nbsp;
                <b-button @click="tour.nextStep" variant="outline-primary" size="sm" :disabled="nomor !== ''">&nbsp;Lanjut&nbsp;</b-button>
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
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
      },
      steps: [
        {
          target: '.v-step-1',
          content: 'Selamat datang,<br/>silahkan anda memilih plan anda sesuai dengan kebutuhan anda, untuk melanjutkan step selanjutnya'
        },
        {
          target: '.v-step-2',
          content: 'Selamat datang,<br/>silahkan anda memilih plan anda sesuai dengan kebutuhan anda, untuk melanjutkan step selanjutnya'
        }
      ],
      tourCallBacks: {
        onNextStep: this.customNextStep
      }
    }
  },
  mounted () {
    this.$tours['myTour'].start(0)
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
    },
    customNextStep (currentStep) {
      console.log(currentStep)
      if (currentStep === 0) {
        this.$nuxt.$router.replace({ path: '/manajemen/toko' })
        // this.$router.push('manajemen/toko')
      }
    }
  }
}
</script>