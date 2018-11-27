<template>
  <ApolloMutation :mutation="require('@/apollo/mutations/updateProduk.gql')"
    :variables="{
      tenant_id: (tenantID) ? tenantID : null,
      upc,
      updateBarang: { 
        nama,
        galeri: {
          thumbnail
        },
        pengaturan: {
          is_stok: isStok
        }
      }
    }"
    @done="onDone">
     <template slot-scope="{mutate, loading, gqlError: error }"> 
        <b-row>
          <b-col cols="12" md="4">
            <b-form-group label="UPC">
              <b-form-input v-model="upc" ref="upc"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="8">
            <b-form-group label="Nama">
              <b-form-input v-model="nama"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Thumbnail">
              <b-form-input v-model="thumbnail"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-checkbox id="checkbox1"
              v-model="isStok"
              value="true"
              unchecked-value="false">
              Stok ada
            </b-form-checkbox>
          </b-col>
        </b-row>
        <div class="clearfix">&nbsp;</div>
        <hr/>
        <div class="clearfix">&nbsp;</div>

        <!-- OPSI -->
        <b-card sub-title="Opsi Produk" class="border-0" no-body="true">
          <div class='card-text p-0'>
            <h5>Opsi</h5>
            <TableOpsi></TableOpsi>
          </div>
        </b-card>
        <!-- END OPSI -->

        <div class="clearfix">&nbsp;</div>
        <div class="clearfix">&nbsp;</div>
        
        <div v-if="error" class="error">{{ error.message }}</div>
        <template v-if="!showUpdate">
          <b-button type="submit" variant="primary" block @click="mutate()">Tambah</b-button>
        </template>
        <template v-else>
          <b-button type="submit" variant="primary" block @click="mutate()">Ubah</b-button>
        </template>
      </template>
  </ApolloMutation>
</template>

<script>
import TableOpsi from '~/components/katalog/produk/varian/table'
export default {
  components: { TableOpsi },
  props: {
    tenantID: {
      type: String
    }
  },
  data () {
    return {
      showUpdate: false,
      tenant_id: this.tenantID ? this.tenantID : null,
      upc: '',
      nama: '',
      thumbnail: '',
      isStok: false
    }
  },
  methods: {
    onDone () {
      this.upc = ''
      this.nama = ''
      this.thumbnail = ''
      this.isStok = false
    }
  }
}
</script>