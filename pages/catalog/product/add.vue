<template>
  <div>
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" md="10">
          <div class="clearfix">&nbsp;</div>
          <FormCatalog class='m-t-lg'
            ref="FormCatalog"
            :productUPC="$route.query.upc"
            ownerID="ninja@basil.id"
            @SUCCESS="onUpdateCatalogSuccess" 
            @FAIL="onUpdateCatalogFail">
          </FormCatalog>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FormCatalog from '~/components/catalog/form'

export default {
  components: { FormCatalog },
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