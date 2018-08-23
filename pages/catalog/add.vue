<template>
  <div>
    <b-card title="Tambah Katalog">
      <div class='card-text pt-4'>
        <FormCatalog class='m-t-lg' @SUCCESS="onUpdateCatalogSuccess" @FAIL="onUpdateCatalogFail"></FormCatalog>
      </div>
    </b-card>
  </div>
</template>
<script>
import FormCatalog from '~/components/catalog/form'
export default {
  components: { FormCatalog },
  methods: {
    onUpdateCatalogSuccess (data) {
      // $nuxt.$router.replace('/dashboard')
    },
    onUpdateCatalogFail (data) {
      // $nuxt.$router.replace('/')
    }
  }
}
</script>