<template>
  <div v-if="tenantID !== null">
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
      },
      tambahOpsi: showOpsi,
      tambahHarga: showHarga,
      tambahKeyword: showKeyword
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
              Produk memiliki stok
            </b-form-checkbox>
          </b-col>
        </b-row>
        <div>
          <p>{{showOpsi}}</p>
        </div>
        <div class="clearfix">&nbsp;</div>
        <div class="clearfix">&nbsp;</div>

        <b-row>
          <b-col cols="12">
            <b-tabs no-fade>
              <b-tab title="Opsi" active>
                <TableOpsi v-on:SUCCESS="onFetchOpsi" class="mt-3"></TableOpsi>
              </b-tab>
              <b-tab title="Harga">
                <TableHarga v-on:SUCCESS="onFetchHarga" class="mt-3"></TableHarga>
              </b-tab>
              <b-tab title="Keyword">
                <TableKeyword v-on:SUCCESS="onFetchKeyword" class="mt-3"></TableKeyword>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>

        <!-- OPSI -->
        <!-- <b-card class="border-0" no-body="true">
          <div class='card-text p-0'>
            <b-form-checkbox id="checkboxOpsi"
              v-model="showOpsi"
              value="true"
              unchecked-value="false">
              <h5>Opsi</h5>
            </b-form-checkbox>
            <TableOpsi v-if="showOpsi === 'true'"></TableOpsi>
          </div>
        </b-card> -->
        <!-- END OPSI -->

        <!-- HARGA -->
        <!-- <b-card class="border-0" no-body="true">
          <div class='card-text p-0'>
            <b-form-checkbox id="checkboxHarga"
              v-model="showHarga"
              value="true"
              unchecked-value="false">
              <h5>Harga</h5>
            </b-form-checkbox>
            <TableOpsi v-if="showHarga === 'true'"></TableOpsi>
          </div>
        </b-card> -->
        <!-- END HARGA -->

        <!-- <div class="clearfix">&nbsp;</div>
        <hr/>
        <div class="clearfix">&nbsp;</div> -->

        <!-- KEYWORD -->
        <!-- <b-card class="border-0" no-body="true">
          <div class='card-text p-0'>
            <b-form-checkbox id="checkboxKeyword"
              v-model="showKeyword"
              value="true"
              unchecked-value="false">
              <h5>Keyword</h5>
            </b-form-checkbox>
            <TableOpsi v-if="showKeyword === 'true'"></TableOpsi>
          </div>
        </b-card> -->
        <!-- END KEYWORD -->

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
  </div>
  <div v-else>
    <b-row>
      <b-col cols="12">
        <div class="alert alert-info">Silahkan pilih toko terlebih dahulu</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TableOpsi from '~/components/katalog/produk/varian/table'
import TableHarga from '~/components/katalog/produk/harga/table'
import TableKeyword from '~/components/katalog/produk/keyword/table'
export default {
  components: { TableOpsi, TableHarga, TableKeyword },
  props: {
    tenantID: {
      type: String
    }
  },
  data () {
    return {
      showUpdate: false,
      showOpsi: [],
      showHarga: [],
      showKeyword: [],
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
    },
    onFetchOpsi (value) {
      this.showOpsi = value
    },
    onFetchHarga (value) {
      this.showHarga = value
    },
    onFetchKeyword (value) {
      this.showKeyword = value
    }
  }
}
</script>