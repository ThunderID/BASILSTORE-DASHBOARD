<template>
  <div>
    <b-row>
      <b-col>
        <b-button variant="primary mb-3 px-3" :to="'/catalog/product/add'">Tambah Baru</b-button>
      </b-col>
      <b-col md="1">
        <h4 class="text-right"><i class="material-icons md-36">store</i></h4>
      </b-col>
      <b-col md="4">
        <v-select
          :options="options"
          class="bg-white ml-auto"
          @input="check">
        </v-select>
      </b-col>
    </b-row>
		
    <b-card title="Produk">
      <div class='card-text pt-4'>
        <TableProduct 
          ref="TableProduct" 
          :headers="['upc', 'thumbnail', 'nama', 'harga', 'varian']"
          :dataFilter="{
            take: 0,
            skip: 0,
            toko: selectedStore.value,
            kostumer: 'SAYA',
            waktu: 'today'
          }">
        </TableProduct>
      </div>
    </b-card>
  </div>
</template>

<script>
// import SelectDropdownStore from '~/components/store/select-dropdown'
import TableProduct from '~/components/catalog/product/table'
export default {
  components: { TableProduct },
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
  },
  computed: {
    storeChoice: function () {
      return this.selectedStore.value
    }
  },
  methods: {
    check (val) {
      this.selectedStore = val

      setTimeout(() => {
        this.$refs.TableProduct.fetch()
      }, 10)
    }
  }
}
</script>