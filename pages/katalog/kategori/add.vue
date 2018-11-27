<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="12" md="10">
        <b-row align-h="end">
          <b-col cols="12" md="7">
            <b-button variant="secondary" :to="{ name: 'katalog-kategori' }">Kembali</b-button>
          </b-col>
          <b-col cols="12" md="5">
            <SelectToko @SELECTED="SelectedToko"></SelectToko>
          </b-col>
        </b-row>
        <div class="clearfix">&nbsp;</div>
        <b-card title="Form Kategori">
          <div class='card-text pt-4'>
            <FormKategori :tenantID="tenantData"></FormKategori>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SelectToko from '~/components/manajemen/toko/select'
import FormKategori from '~/components/katalog/kategori/form'
export default {
  data () {
    return {
      tenantData: (this.$route.query.tenantID) ? this.$route.query.tenantID : null
    }
  },
  components: { SelectToko, FormKategori },
  methods: {
    SelectedToko (data) {
      if (data) {
        this.tenantData = data.id
        return this.tenantData
      } else if (this.$route.query.tenantID) {
        return this.tenantData
      }
    }
  }
}
</script>