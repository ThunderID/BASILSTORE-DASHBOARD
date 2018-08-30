<template>
  <b-form @submit="onSubmit" validated>

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

    <b-form-group label="Thumbnail">
      <b-form-file v-model="form.thumbnail" :state="Boolean(form.thumbnail)" placeholder="Pilih gambar"></b-form-file>
      <b-form-invalid-feedback :force-show="errors.has('Thumbnail')">{{ errors.first('Thumbnail') }}</b-form-invalid-feedback>
    </b-form-group>

    <div class="row">
      <div class="col-12 col-md-5">
        <b-form-group label="Kategori">
          <!-- <b-form-input data-vv-name="Kategori" v-validate="'required|min:3'" v-model="form.kategori" :state="errors.has('Kategori')"></b-form-input> -->
          <!-- <v-select multiple v-model="selected" class="rounded-0"></v-select> -->
          <v-select multiple v-model="form.kategori" :options="['Batik','Kemeja']"></v-select>
          <b-form-invalid-feedback :force-show="errors.has('Kategori')">{{ errors.first('Kategori') }}</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div class="col-12 col-md-7">
        <b-form-group label="Samakan harga dengan toko lainnya ">
          <toggle-button :value="true"
            name="phone"
            class="mb-0"
            :labels="{checked: '&nbsp;&nbsp;Ya', unchecked: 'Tidak&nbsp;&nbsp;'}"
            :color="{checked: '#7DCE94', unchecked: '#6c757d'}"
            :width="80"
            :height="35" />
          <!-- <b-form-input data-vv-name="Harga" v-validate="'required|min:3'" v-model="form.harga" :state="errors.has('Harga')"></b-form-input> -->
          <b-form-invalid-feedback :force-show="errors.has('Harga')">{{ errors.first('Harga') }}</b-form-invalid-feedback>
        </b-form-group>
      </div>
    </div>

    <div class="clearfix">&nbsp;</div>

    <p class="mb-0"><u><strong>Varian katalog ini</strong></u></p>
    <b-form-group label="Varian">
      <b-form-input data-vv-name="Varian" v-validate="'required|min:3'" v-model="form.varian" :state="errors.has('Varian')"></b-form-input>
      <b-form-invalid-feedback :force-show="errors.has('Varian')">{{ errors.first('Varian') }}</b-form-invalid-feedback>
    </b-form-group>

    <div class="clearfix">&nbsp;</div>

    <p class="mb-0"><u><strong>Toko yang menjual katalog ini</strong></u></p>
    <b-form-group label="Nama Toko">
      <b-form-input data-vv-name="Toko" v-validate="'required|min:3'" v-model="form.toko" :state="errors.has('Toko')"></b-form-input>
      <b-form-invalid-feedback :force-show="errors.has('Toko')">{{ errors.first('Toko') }}</b-form-invalid-feedback>
    </b-form-group>

    <div class="clearfix">&nbsp;</div>

    <p class="mb-0"><u><strong>Promo terkait katalog ini</strong></u></p>
    <b-form-group label="Promo">
      <b-form-input data-vv-name="Promo" v-validate="'required|min:3'" v-model="form.promo" :state="errors.has('Promo')"></b-form-input>
      <b-form-invalid-feedback :force-show="errors.has('Promo')">{{ errors.first('Promo') }}</b-form-invalid-feedback>
    </b-form-group>

    <b-button type="submit" variant="primary" block :disabled="isLoading">
      <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Simpan</span>
      <span v-else>Simpan</span>
    </b-button>
    
  </b-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        sku: '',
        thumbnail: '',
        nama: '',
        toko: '',
        harga: '',
        kategori: '',
        varian: '',
        promo: ''
      },
      isLoading: false
    }
  },
  methods: {
    onSubmit (e) {
      let vm = this

      e.preventDefault()

      vm.isLoading = true
      vm.$validator.validateAll()
    }
  }
}
</script>