<template>
  <div>
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" md="10">
          <div class="clearfix">&nbsp;</div>
          <FormUpgrade class='m-t-lg'
            ref="FormUpgrade"
            @SUCCESS="onUpdateCatalogSuccess" 
            @FAIL="onUpdateCatalogFail">
          </FormUpgrade>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FormUpgrade from '~/components/my-account/plan/upgrade/form'

export default {
  components: { FormUpgrade },
  methods: {
    onUpdateCatalogSuccess (data) {
      console.log({'sukses': data})
      // this.$nuxt.$router.replace('/catalog/product')
    },
    onUpdateCatalogFail (data) {
      console.log({'gagal': data})
      // $nuxt.$router.replace('/')
    }
  }
}
</script>