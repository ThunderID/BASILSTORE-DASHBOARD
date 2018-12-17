<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="12" md="10">
        <b-row align-h="end">
          <b-col cols="12" md="12">
            <b-button variant="secondary" :to="{ name: 'katalog-produk' }">Kembali</b-button>
          </b-col>
        </b-row>
        <div class="clearfix">&nbsp;</div>
        <b-card title="Form Produk">
          <div class='card-text pt-4'>
            <FormProduk :tenantID="tenantData"></FormProduk>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SelectToko from '~/components/manajemen/toko/select'
import FormProduk from '~/components/katalog/produk/form'
export default {
  components: { SelectToko, FormProduk },
  data () {
    return {
      tenantData: (this.$route.query.tenantID) ? this.$route.query.tenantID : null
    }
  },
  computed: {
    Selected: function () {
      return this.tenantData
    }
  },
  methods: {
    SelectedToko (data) {
      if (data) {
        this.tenantData = data.id
      }
    },
    onUpdateCatalogSuccess (data) {
      console.log({'sukses': data})
      this.$nuxt.$router.replace('/katalog/produk')
    },
    onUpdateCatalogFail (data) {
      console.log({'gagal': data})
      // $nuxt.$router.replace('/')
    }
  }
}
</script>