<template>
  <b-form @submit="onSubmit" validated>
    <b-card title="Katalog" sub-title="pengaturan katalog">
      <hr />
      <div class='card-text pt-3 box-shadow'>
        <div class="row">
          <div class="col-12 col-md-5">
            <b-form-group label="UPC">
              <b-form-input data-vv-name="UPC" v-validate="'required|min:3'" v-model="form.upc" :state="errors.has('UPC')" placeholder="Upc"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('UPC')">{{ errors.first('UPC') }}</b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 col-md-7">
            <b-form-group label="Nama">
              <b-form-input data-vv-name="Nama" v-validate="'required|min:3'" v-model="form.nama" :state="errors.has('Nama')"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Nama')">{{ errors.first('Nama') }}</b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>

        <b-row>
          <b-col cols="12" md="12">
            <b-form-group label="Thumbnail">
              <b-form-input data-vv-name="Thumbnail" v-validate="'required'" v-model="form.thumbnail" :state="errors.has('Thumbnail')"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Thumbnail')">{{ errors.first('Thumbnail') }}</b-form-invalid-feedback>
            </b-form-group>
            <!-- <b-form-group label="Thumbnail">
              <b-form-file v-model="form.thumbnail" :state="Boolean(form.thumbnail)" placeholder="Pilih gambar"></b-form-file>
              <b-form-invalid-feedback :force-show="errors.has('Thumbnail')">{{ errors.first('Thumbnail') }}</b-form-invalid-feedback>
            </b-form-group> -->
          </b-col>
        </b-row>
      </div>
    </b-card>

    <div class="clearfix">&nbsp;</div>

    <b-card title="Kategori" sub-title="pengaturan kategori dari katalog">
      <hr />
      <div class="card-text pt-3 box-shadow">
        <b-row>
          <b-col cols="12">
            <b-form-group label="Kategori">
              <v-select multiple v-model="category" :options="listCategory" label="slug">
                <template slot="option" slot-scope="option">
                  {{ option.slug.substring(option.slug.lastIndexOf(",") + 1) }}
                </template>
              </v-select>
              <b-form-invalid-feedback :force-show="errors.has('Kategori')">{{ errors.first('Kategori') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </b-card>

    <div class="clearfix">&nbsp;</div>

    <b-card title="Opsi" sub-title="pengaturan opsi dari katalog">
      <hr />
      <div class="card-text pt-3 box-shadow">
        <b-row v-if="defaultOpsi.length > 0">
          <b-col cols="12">
            <table class="table" v-if="listOptions.length > 0">
              <tr v-for="(list, index) in listOptions">
                <td>{{list}}</td>
                <td>{{list.judul}}</td>
                <td>{{list.bundle}}</td>
                <td v-if="list.varian.length > 0">{{list.varian}}</td>
                <td v-else>tidak ada varian</td>
              </tr>
            </table>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-link class="text-info" v-b-modal.modalOpsi @click="addOpsi"><i class="fa fa-plus mr-1"></i> Opsi Baru</b-link>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <b-modal id="modalOpsi" title="Tambah Opsi Baru" size="lg" @ok="updateOpsi" ok-title="Simpan" no-close-on-backdrop>
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="6">
            <b-form-group label="Judul">
              <b-form-input data-vv-name="Judul" v-validate="'required|min:3'" :state="errors.has('Judul')" v-model="options.judul"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group label="Bundle">
              <b-form-input type="number"  data-vv-name="Bundle" v-validate="'required'" :state="errors.has('Bundle')" v-model="options.bundle"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Bundle')">{{ errors.first('Bundle') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <table class="table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Parameters</th>
                  <th>Value</th>
                  <th>Bundle</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(option, index) in defaultVarian">
                  <td>
                    <b-form-input type="text" placeholder="SKU" v-model="option.sku"></b-form-input>
                  </td>
                  <td>
                    <b-form-input type="text" placeholder="Parameters" v-model="option.parameters"></b-form-input>
                  </td>
                  <td>
                    <b-form-input type="text" placeholder="Value" v-model="option.value"></b-form-input>
                  </td>
                  <td>
                    <b-form-input type="text" placeholder="Budle" v-model="option.bundle"></b-form-input>
                  </td>
                  <td>
                    <b-button variant="link" class="text-danger" @click="removeVarian(index)"><i class="fa fa-times"></i></b-button>
                  </td>
                </tr>
                <tr v-if="defaultVarian.length == 0">
                  <td colspan="5" class="text-center text-secondary">Belum varian</td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
        <b-row class="pt-2">
          <b-col cols="12">
            <b-link class="text-info" @click="addVarian"><i class="fa fa-plus mr-1"></i> Varian Baru</b-link>
            <!-- <b-button variant="info px-3" size="sm" @click="addOpsi"><i class="fa fa-plus-circle mr-1"></i> Opsi Baru</b-button> -->
          </b-col>
        </b-row>
      </b-container>
      <!-- <div slot="modal-footer" class="w-100">
        <b-button variant="primary" class="float-right" @click="updateOpsi">Simpan</b-button>
      </div> -->
    </b-modal>
    
    <div class="clearfix">&nbsp;</div>

    <b-card title="Harga" sub-title="pengaturan harga dari katalog">
      <hr />
      <div class="card-text pt-3 box-shadow">
        <b-row>
          <b-col cols="12">
            <b-link class="text-info" v-b-modal.modalHarga><i class="fa fa-plus-circle mr-1"></i> Harga Baru</b-link>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <b-modal id="modalHarga" title="Tambah Harga Baru" size="xl" hide-footer no-close-on-backdrop>
      <b-row>
        <b-col cols="12">
          <FormHarga
            @Harga="getHarga">
          </FormHarga>
        </b-col>
      </b-row>
    </b-modal>
        <!-- <b-modal id="modalVarian">
          <b-form-group label="Kategori">
            <v-select multiple v-model="category" :options="listCategory" label="slug">
              <template slot="option" slot-scope="option">
                {{ option.slug.substring(option.slug.lastIndexOf(",") + 1) }}
              </template>
            </v-select>
            <b-form-invalid-feedback :force-show="errors.has('Kategori')">{{ errors.first('Kategori') }}</b-form-invalid-feedback>
          </b-form-group>
        </b-modal> -->


        <!-- <div class="clearfix">&nbsp;</div> -->
        <!-- <div class="clearfix">&nbsp;</div> -->

        <!-- <p class="mb-2"><strong>Daftar Harga</strong></p> -->

        <!-- <b-row v-for="(price, index) in prices" align-v="center">
          <b-col cols="12" md="12">
            <span>Harga {{ index + 1 }}</span>
            <b-link class="text-danger float-right" @click="removePrice(index)"><i class="fa fa-times-circle"></i> Hapus</b-link>
            <hr class="mt-1 mb-2"/>
          </b-col>
          <b-col cols="12" md="11">
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group label="Harga">
                  <b-form-input data-vv-name="Harga" v-validate="'required'" v-model="price.harga" :state="errors.has('Harga')"></b-form-input>
                  <b-form-invalid-feedback :force-show="errors.has('Harga')">{{ errors.first('Harga') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group label="Mulai">
                  <b-form-input data-vv-name="Mulai" v-validate="'required'" v-model="price.mulai" :state="errors.has('Mulai')"></b-form-input>
                  <b-form-invalid-feedback :force-show="errors.has('Mulai')">{{ errors.first('Mulai') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12" md="3">
                <b-form-group label="Satuan">
                  <b-form-input data-vv-name="Satuan" v-validate="'required'" v-model="price.penetapan.satuan" :state="errors.has('Satuan')"></b-form-input>
                  <b-form-invalid-feedback :force-show="errors.has('Satuan')">{{ errors.first('Satuan') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="3">
                <b-form-group label="Bundle">
                  <b-form-input type="number" data-vv-name="Bundle" v-validate="'required'" v-model="price.penetapan.bundle" :state="errors.has('Bundle')"></b-form-input>
                  <b-form-invalid-feedback :force-show="errors.has('Bundle')">{{ errors.first('Bundle') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group label="Berlaku">
                  <v-select v-model="price.berlaku" :options="['BALINDINOYO','KORAKA']" multiple></v-select>
                  <b-form-invalid-feedback :force-show="errors.has('Berlaku')">{{ errors.first('Berlaku') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <div class="clearfix">&nbsp;</div>
          <div class="clearfix">&nbsp;</div>
        </b-row> -->

        <!-- <b-row> -->
          <!-- <b-col cols="12"> -->
            <!-- <b-link class="text-info" @click="addPrice"><i class="fa fa-plus-circle mr-1"></i> Harga</b-link> -->
            <!-- <b-button variant="info px-3" size="sm" @click="addPrice"><i class="fa fa-plus-circle mr-1"></i> Harga</b-button> -->
          <!-- </b-col> -->
        <!-- </b-row> -->
      
        <!-- <div class="clearfix">&nbsp;</div> -->
        <!-- <div class="clearfix">&nbsp;</div> -->

        <!-- <b-form-group label="Toko">
          <b-form-input data-vv-name="Toko" v-validate="'required|min:3'" v-model="form.toko" :state="errors.has('Toko')"></b-form-input>
          <b-form-invalid-feedback :force-show="errors.has('Toko')">{{ errors.first('Toko') }}</b-form-invalid-feedback>
        </b-form-group> -->

        <!-- <div class="clearfix">&nbsp;</div> -->

        <!-- <b-form-group label="Promo">
          <b-form-input data-vv-name="Promo" v-validate="'required|min:3'" v-model="form.promo" :state="errors.has('Promo')"></b-form-input>
          <b-form-invalid-feedback :force-show="errors.has('Promo')">{{ errors.first('Promo') }}</b-form-invalid-feedback>
        </b-form-group> -->
      </div>
    </b-card>

    <div class="clearfix">&nbsp;</div>
    
    <b-row>
      <b-col cols="12">
        <slot name='action'></slot>
        <b-button type="submit" variant="primary" block :disabled="isLoading">
          <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Simpan</span>
          <span v-else>Simpan</span>
        </b-button>
        <b-button  block to="/catalog/product/">
          <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Batal</span>
          <span v-else>Batal</span>
        </b-button>
      </b-col>
    </b-row>

    <div class="clearfix">&nbsp;</div>
    <div class="clearfix">&nbsp;</div>
  </b-form>
</template>

<script>
// apollo
import GrupQuery from '~/apollo/queries/query_group'
import AddCatalog from '~/apollo/mutations/AddCatalog'

// component
import FormVarian from '~/components/catalog/product/form/opsi'
import FormHarga from '~/components/catalog/product/form/harga'

export default {
  props: {
    defaultData: {
      type: Array,
      default: function () {
        return []
      }
    },
    ownerID: {
      type: String,
      required: true
    },
    productUPC: {
      type: String,
      default: null
    },
    defaultOpsi: {
      type: Array,
      default: function () {
        return []
      }
    },
    defaultVarian: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: { FormVarian, FormHarga },
  apollo: {
    // -----------------------------------------------------------------------------------------------------------------------
    // TO MODIFY
    // -----------------------------------------------------------------------------------------------------------------------
    $client: 'customer'
    // -----------------------------------------------------------------------------------------------------------------------
    // END TO MODIFY
    // -----------------------------------------------------------------------------------------------------------------------
  },
  data () {
    return {
      form: {
        upc: '',
        thumbnail: '',
        nama: '',
        kode_owner: ''
      },
      prices: [],
      category: [],
      listCategory: [],
      options: [],
      varian: [],
      isLoading: false,
      isCounter: 0
    }
  },
  watch: {
    // options: this.defaultOpsi
    // listOptions: function () {
    //   return this.defaultOpsi
    // }
  },
  mounted () {
    this.loadCategory()
  },
  computed: {
    transformInput: function () {
      return {
        input: {
          upc: this.formData.upc
        }
      }
    },
    listOptions: function () {
      return this.varian[0]
    }
  },
  methods: {
    addVarian () {
      this.options.varian.push({
        sku: '',
        parameters: '',
        value: '',
        bundle: ''
      })
    },
    removeVarian (index) {
      this.options.splice((index - 1), 1)
    },
    addOpsi () {
      this.options.push({
        judul: '',
        bundle: '',
        varian: []
      })
    },
    updateOpsi (evt) {
      // evt.preventDefault()
      if (this.options.judul !== '') {
        console.log({1: this.options[0], 2: this.varian})
        this.varian.push({
          judul: this.options[0].judul,
          bundle: this.options[0].bundle,
          varian: this.options[0].varian
        })
        // this.defaultOpsi = this.options[0]
        // this.defaultOpsi.varian.push(this.defaultVarian)
        this.options = []
        this.$root.$emit('close')
        console.log({1: this.options[0], 2: this.varian})
      } else {
      }
    },
    getHarga (data) {
      console.log(data)
    },
    addPrice () {
      this.prices.push({
        harga: '',
        mulai: '',
        penetapan: {
          satuan: '',
          bundle: ''
        }
      })
    },
    removePrice (index) {
      this.prices.splice((index - 1), 1)
    },
    loadCategory () {
      let vm = this
      vm.listCategory = []
      this.$apollo.query(
        {
          query: GrupQuery,
          variables: {
            owner: vm.ownerID
          },
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        var newListCategory = []
        result.data.pengaturanGrup.forEach(function (i, k) {
          newListCategory[k] = {slug: i.slug, berlaku: ['BALINDINOYO']}
        })
        vm.listCategory = newListCategory
      })
    },
    onSubmit (e) {
      let vm = this

      e.preventDefault()
      console.log(vm)
      vm.isLoading = true
      vm.$validator.validateAll()

      if (vm.errors.count() === 0) {
        vm.form.kode_owner = 'BALIN'
        vm.$apollo.mutate({
          mutation: AddCatalog,
          variables: {
            input: vm.form,
            tambahGrup: vm.category,
            tambahOpsi: vm.options,
            tambahHarga: vm.prices
          }
        }).then(function (res) {
          console.log(res)
          if (res.data.updateBarang) {
            vm.$emit('SUCCESS', res)
          } else {
            vm.$emit('FAIL', res)
          }
          vm.isLoading = false
        }).catch(function (e) {
          console.log(e)
          vm.$emit('FAIL', e)
          vm.isLoading = false
        })
      } else {
        vm.isLoading = false
      }
    }
  }
}
</script>