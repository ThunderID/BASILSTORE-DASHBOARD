<template>
  <b-form @submit="onSubmit" validated>

    <b-form-group label="SKU">
      <b-form-input data-vv-name="SKU" v-validate="'required|min:3'" v-model="form.sku" :state="errors.has('SKU')"></b-form-input>
      <b-form-invalid-feedback :force-show="errors.has('SKU')">{{ errors.first('SKU') }}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Thumbnail">
      <b-form-input data-vv-name="Thumbnail" v-validate="'required|min:3'" v-model="form.thumbnail" :state="errors.has('Thumbnail')"></b-form-input>
      <b-form-invalid-feedback :force-show="errors.has('Thumbnail')">{{ errors.first('Thumbnail') }}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Nama">
      <b-form-input data-vv-name="Nama" v-validate="'required|min:3'" v-model="form.nama" :state="errors.has('Nama')"></b-form-input>
      <b-form-invalid-feedback :force-show="errors.has('Nama')">{{ errors.first('Nama') }}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Toko">
      <b-form-input data-vv-name="Toko" v-validate="'required|min:3'" v-model="form.toko" :state="errors.has('Toko')"></b-form-input>
      <b-form-invalid-feedback :force-show="errors.has('Toko')">{{ errors.first('Toko') }}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Harga">
      <b-form-input data-vv-name="Harga" v-validate="'required|min:3'" v-model="form.harga" :state="errors.has('Harga')"></b-form-input>
      <b-form-invalid-feedback :force-show="errors.has('Harga')">{{ errors.first('Harga') }}</b-form-invalid-feedback>
    </b-form-group>

    <b-button type="submit" variant="primary" block :disabled="isLoading">
      <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Register</span>
      <span v-else>Register</span>
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
        harga: ''
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