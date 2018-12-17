<template>
  <div>
    <b-alert :show="dismissCountDown"
             dismissible
             variant="danger"
             @dismissed="dismissCountDown=0">
      <p>{{alert.data.en}}. Need more space ?? <a :href="'/my-account/plansaya'"> Upgrade</a></p>
    </b-alert>
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" md="10">
          <div class="clearfix">&nbsp;</div>
          <FormToko class='m-t-lg'
            ref="FormToko"
            @SUCCESS="onUpdateCatalogSuccess" 
            @FAIL="onUpdateCatalogFail">
          </FormToko>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FormToko from '~/components/manajemen/toko/form'

export default {
  components: { FormToko },
  data () {
    return {
      alert: {
        data: {
          en: ''
        }
      },
      dismissSecs: 20,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  methods: {
    onUpdateCatalogSuccess (data) {
      console.log({'sukses': data})
      this.$nuxt.$router.replace('/manajemen/toko')
    },
    onUpdateCatalogFail (data) {
      console.log({data: data.graphQLErrors[0]})
      this.alert = {data: data.graphQLErrors[0]}
      this.showAlert()
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>