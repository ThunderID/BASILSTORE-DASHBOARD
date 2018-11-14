<template>
  <div>
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