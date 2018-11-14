<template>
  <b-form @submit="onSubmit" validated>
    <b-card title="Tambah Toko">
      <hr />
      <div class='card-text pt-3 box-shadow'>
        <div class="row">
          <div class="col-12 col-md-5">
            <b-form-group label="Nama Toko">
              <b-form-input data-vv-name="nama" v-validate="'required|min:3'" v-model="form.nama" :state="errors.has('nama')" placeholder="Nama toko"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('nama')">{{ errors.first('nama') }}</b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 col-md-7">
            <b-form-group label="Jenis">
              <b-form-input data-vv-name="jenis" v-validate="'required|min:3'" v-model="form.jenis" :state="errors.has('jenis')" placeholder="Jenis"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('jenis')">{{ errors.first('jenis') }}</b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>

        <b-row>
          <b-col cols="12" md="12">
            <b-form-group label="Industri">
              <b-form-input data-vv-name="industri" v-validate="'required'" v-model="form.industri" :state="errors.has('industri')" placeholder="Industri"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('industri')">{{ errors.first('industri') }}</b-form-invalid-feedback>
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
import Subscribe from '~/apollo/mutations/Subscribe'

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
          mutation: Subscribe,
          variables: {
          }
        }).then(function (res) {
          console.log(res)
          if (res.data.UACSubscribing) {
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