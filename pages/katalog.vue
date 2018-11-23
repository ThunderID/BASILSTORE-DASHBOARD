<template>
  <div>
    <b-container fluid class=''>
      <b-row>
        <b-col cols="12" md="3" xl="2" class="bg-white border-right border-bottom" style="height: 100vh">
          <b-nav vertical class="py-4">
            <b-nav-item :to="{ name: 'katalog-kategori' }" >Kategori</b-nav-item>
            <b-nav-item :to="{ name: 'katalog-produk' }" >Produk</b-nav-item>
            <b-nav-item :to="{ name: 'katalog-promo' }" >Stok Barang</b-nav-item>
            <b-nav-item >Promo</b-nav-item>
            <!-- <b-nav-item >Report</b-nav-item> -->
          </b-nav>
        </b-col>
        <b-col>
          <div class="clearfix">&nbsp;</div>
          <nuxt-child/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import SelectToko from '~/components/manajemen/toko/select_dropdown'
export default {
  layout: 'dashboard',
  components: { SelectToko },
  middleware: 'auth',
  data () {
    return {
      selectedStore: {label: 'BALIN DINOYO', value: 'BALINDINOYO'},
      options: [
        {label: 'PHD SUHAT', value: 'PHDSUHAT'}, // manufaktur
        {label: 'PHD BLIMBING', value: 'PHDBLIMBING'}, // manufaktur
        {label: 'PHD MATOS', value: 'PHDMATOS'}, // manufaktur
        {label: 'BALIN DINOYO', value: 'BALINDINOYO'}, // retail
        {label: 'KORAKA DINOYO', value: 'KORAKADINOYO'}, // retail
        {label: 'TOKOPEDIA', value: 'TOKPED'}, // retail
        {label: 'PLUIT VILLAGE', value: 'PLUITVILLAGE'},
        {label: 'PLAZA INDONESIA', value: 'PLAZAINDONESIA'},
        {label: 'LIPPO BOGOR', value: 'LIPPOBOGOR'}
      ]
    }
  }
}
</script>