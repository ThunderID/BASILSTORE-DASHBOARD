<template>
  <div class="container-fluid">
    <b-row align-h="between">
      <b-col>
        <b-button variant="primary mb-3 px-3" :to="'/manajemen/toko/add'">Tambah Toko</b-button>
      </b-col>
    </b-row>
		
    <b-card title="Toko Saya">
      <div class='card-text pt-4'>
        <TableToko 
          ref="TableToko" 
          :headers="['nama', 'jenis', 'industri']">
        </TableToko>
      </div>
    </b-card>
  </div>
</template>

<script>
import TableToko from '~/components/manajemen/toko/table'

export default {
  components: { TableToko },
  data () {
    return {
    }
  },
  methods: {
    check (val) {
      this.selectedStore = val

      setTimeout(() => {
        this.$refs.TableToko.fetch()
      }, 10)
    // },
    // catalogClicked (catalogUPC) {
    //   this.$nuxt.$router.replace({path: '/manajemen/toko/' + catalogUPC, query: this.dataFilter})
    }
  }
}
</script>