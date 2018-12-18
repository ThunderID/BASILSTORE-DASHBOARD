<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="12" md="10">
        <b-row align-h="end">
          <b-col cols="12" md="1"><h4 class="text-right"></h4></b-col>
          <b-col cols="12" md="5">
            <SelectToko @SELECTED_TOKO="SelectedToko"></SelectToko>
          </b-col>
        </b-row>
        <b-row align-h="between">
          <b-col v-if="tenantData !== null">
            <b-button variant="primary mb-3 px-3" :to="{ name: 'katalog-kategori-add', query: { tenantID: tenantData }}">Tambah Baru</b-button>
          </b-col>
        </b-row>
        
        <b-card title="Kategori">
          <div class='card-text pt-4'>
            <TableKategori :tenantID="tenantData"></TableKategori>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SelectToko from '~/components/manajemen/toko/select'
import TableKategori from '~/components/katalog/kategori/table'
export default {
  data () {
    return {
      tenantData: null
    }
  },
  components: { SelectToko, TableKategori },
  methods: {
    SelectedToko (data) {
      if (data) this.tenantData = data.id
    }
  },
  computed: {
    Selected: function () {
      return this.tenantData
    }
  }
}
</script>