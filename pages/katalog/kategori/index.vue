<template>
  <div class="container-fluid">
     <b-row align-h="end">
      <b-col cols="12" md="1"><h4 class="text-right"><i class="material-icons md-36">store</i></h4></b-col>
      <b-col cols="12" md="3">
       <SelectToko></SelectToko>
      </b-col>
    </b-row>
    <b-row align-h="between">
      <b-col>
        <b-button variant="primary mb-3 px-3" :to="'/catalog/product/add?owner=ninja@basil.id'">Tambah Baru</b-button>
      </b-col>
    </b-row>
     <b-card title="Produk">
      <div class='card-text pt-4'>
        <TableKategori></TableKategori>
      </div>
    </b-card>
  </div>
</template>
<script>
import SelectToko from '~/components/manajemen/toko/select_dropdown'
import TableKategori from '~/components/katalog/kategori/table'
export default {
  components: { SelectToko, TableKategori }
}
</script>
