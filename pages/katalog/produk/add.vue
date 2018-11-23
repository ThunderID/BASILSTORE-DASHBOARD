<template>
  <div>
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" md="10">
          <div class="clearfix">&nbsp;</div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
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