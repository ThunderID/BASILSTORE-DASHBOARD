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

    <!-- = COMPONENNT KATEGORI KATALOG ======================= -->
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

    <!-- = COMPONENNT OPSI KATALOG ======================= -->
    <b-card title="Opsi" sub-title="pengaturan opsi dari katalog">
      <hr />
      <div class="card-text box-shadow">
        <b-row v-if="listOptions.length > 0">
          <b-col cols="12">
            <table class="table">
              <tr>
                <th class="text-dark border-top-0 border-bottom"><strong>Judul</strong></th>
                <th class="text-dark border-top-0 border-bottom"><strong>Bundle</strong></th>
                <th class="text-dark border-top-0 border-bottom"><strong>Varians</strong></th>
                <th class="text-dark border-top-0 border-bottom"></th>
              </tr>
              <tr v-for="(field, index) in listOptions" class="border-bottom" v-if="">
                <td class="border-0">{{ field.judul }}</td>
                <td class="border-0">{{ field.bundle ? field.bundle : '-' }}</td>
                <td class="border-0" v-if="field.varian.length > 0">
                  <table v-for="(value, key) in field.varian" class="w-100 pt-1" :class="{'border-bottom' : (field.varian.length - 1) !== key}">
                    <tr v-for="(value2, key2) in value">
                      <td class="border-0 p-1">{{ key2 }}</td>
                      <td class="border-0 p-1">: {{ value2 }}</td>
                    </tr>
                  </table>
                </td>
                <td class="border-0" v-else>-</td>
                <td class="border-0 text-right" style="width: 15%">
                  <b-button variant="link" size="sm" class="text-info" @click="removeOpsi(index)" disabled><i class="fa fa-edit"></i></b-button>
                  <b-button variant="link" size="sm" class="text-danger" @click="removeOpsi(index)"><i class="fa fa-times"></i></b-button>
                </td>
              </tr>
            </table>
          </b-col>
        </b-row>
        <b-row class="pt-3">
          <b-col cols="12">
            <b-link class="text-info" v-b-modal.modalOpsi @click="addOpsi"><i class="fa fa-plus mr-1"></i> Opsi Baru</b-link>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <!-- = MODAL OPSI ======================= -->
    <b-modal id="modalOpsi" title="Tambah Opsi Baru" size="lg" @ok="updateOpsi" ok-title="Simpan" no-close-on-backdrop no-close-on-esc>
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="6">
            <b-form-group label="Judul">
              <b-form-input data-vv-name="Judul" v-model="optionsTemp.judul"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group label="Bundle">
              <b-form-input type="number"  data-vv-name="Bundle" v-model="optionsTemp.bundle"></b-form-input>
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
                <tr v-for="(varian, index) in variansTemp">
                  <td><b-form-input type="text" placeholder="SKU" v-model="varian.sku"></b-form-input></td>
                  <td><b-form-input type="text" placeholder="Parameters" v-model="varian.parameter"></b-form-input></td>
                  <td><b-form-input type="text" placeholder="Value" v-model="varian.value"></b-form-input></td>
                  <td><b-form-input type="text" placeholder="Budle" v-model="varian.bundle"></b-form-input></td>
                  <td><b-button variant="link" class="text-danger" @click="removeVarian(index)"><i class="fa fa-times"></i></b-button></td>
                </tr>
                <tr v-if="variansTemp.length == 0">
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
    </b-modal>
    
    <div class="clearfix">&nbsp;</div>

    <!-- = COMPONENNT HARGA KATALOG ======================= -->
    <b-card title="Harga" sub-title="pengaturan harga dari katalog">
      <hr />
      <div class="card-text box-shadow">
        <b-row v-if="listPrices.length > 0">
          <b-col cols="12">
            <table class="table">
              <tr>
                <th class="text-dark border-top-0 border-bottom"><strong>Harga</strong></th>
                <th class="text-dark border-top-0 border-bottom text-center"><strong>Mulai</strong> - <strong>Berakhir</strong></th>
                <th class="text-dark border-top-0 border-bottom text-center"><strong>Satuan (Bundle)</strong></th>
                <th class="text-dark border-top-0 border-bottom"><strong>Berlaku</strong></th>
                <th class="text-dark border-top-0 border-bottom"></th>
              </tr>
              <tr v-for="(field, index) in listPrices" class="border-bottom">
                <td class="border-0">{{field.harga.currency}} {{field.harga.nominal}}</td>
                <td class="border-0 text-center">{{field.mulai}} - {{field.hingga}}</td>
                <td class="border-0 text-center">{{field.penetapan.satuan}} ({{field.penetapan.bundle}})</td>
                <td class="border-0">
                  <span v-for="(field2, index2) in field.berlaku">{{field2}}, </span>
                </td>
                <td class="border-0 text-right" style="width: 15%">
                  <b-button variant="link" size="sm" class="text-info" @click="removePrice(index)" disabled><i class="fa fa-edit"></i></b-button>
                  <b-button variant="link" size="sm" class="text-danger" @click="removePrice(index)"><i class="fa fa-times"></i></b-button>
                </td>
              </tr>
            </table>
          </b-col>

        </b-row>
        <b-row class="pt-3">
          <b-col cols="12">
            <b-link class="text-info" v-b-modal.modalHarga @click="showModalHarga"><i class="fa fa-plus mr-1"></i> Harga Baru</b-link>
          </b-col>
        </b-row>
      </div>
    </b-card>
    
    <b-modal ref="modalHarga" id="modalHarga" title="Tambah Harga Baru" hide-footer no-close-on-backdrop no-close-on-esc body-class="px-0" ok-title="Simpan" :showModal="showModalHarga">
      <ModalHarga v-on:HARGA="getHarga" @HIDE="hideModalHarga" :showModal="showModal"></ModalHarga>
    </b-modal>

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
import ModalHarga from '~/components/catalog/product/form/harga'

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
  components: { FormVarian, ModalHarga },
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
      category: [],
      listCategory: [],
      options: [],
      optionsTemp: [],
      prices: [],
      varians: [],
      variansTemp: [],
      isLoading: false,
      isCounter: 0,
      showModal: false
    }
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
      return this.options
    },
    listPrices: function () {
      return this.prices
    }
  },
  methods: {
    hideModalHarga () {
      this.$refs.modalHarga.hide()
      this.showModal = false
    },
    showModalHarga () {
      this.showModal = true
    },
    addVarian () {
      this.variansTemp.push({
        sku: '',
        parameter: '',
        value: '',
        bundle: ''
      })
    },
    removeVarian (idx) {
      this.variansTemp.splice((idx - 1), 1)
    },
    addOpsi () {
      this.optionsTemp.push({
        judul: '',
        bundle: '',
        varian: []
      })
    },
    editOpsi (idx) {
    },
    updateOpsi (evt) {
      let vm = this
      // evt.preventDefault()
      if (vm.optionsTemp.judul !== '') {
        this.options.push({
          judul: this.optionsTemp.judul,
          bundle: this.optionsTemp.bundle,
          varian: this.variansTemp
        })
        this.optionsTemp = []
        this.variansTemp = []
      }
    },
    removeOpsi (idx) {
      this.options.splice((idx - 1), 1)
    },
    getHarga (data) {
      if (data && data.length !== 0) {
        this.prices.push(data)
        this.$refs.modalHarga.hide()
        // console.log({1: data, 2: this.prices})
      }
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
      vm.isLoading = true
      vm.$validator.validateAll()
      if (vm.errors.count() === 0) {
        console.log('yes submit')
        vm.form.kode_owner = 'ninja@basil.id'
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
        console.log('gagal submit')
        console.log(vm.errors)
        vm.isLoading = false
      }
    }
  }
}
</script>