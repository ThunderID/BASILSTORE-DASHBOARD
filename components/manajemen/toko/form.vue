<template>
  <b-form @submit="onSubmit" validated>
    <b-card title="Tambah Toko">
      <hr />
      <div class='card-text pt-3 box-shadow'>
        <div class="row">
          <div class="col-12 col-md-5">
            <b-form-group label="Nama Toko">
              <b-form-input data-vv-name="nama" v-validate="'required|min:2'" v-model="form.nama" :state="errors.has('nama')" placeholder="Nama toko"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('nama')">{{ errors.first('nama') }}</b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 col-md-7">
            <b-form-group label="Jenis">
              <b-form-input data-vv-name="jenis" v-validate="'required|min:2'" v-model="form.jenis" :state="errors.has('jenis')" placeholder="Jenis"></b-form-input>
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
      <div class="clearfix">&nbsp;</div>
      <b-row>
      <b-col cols="12">
        <slot name='action'></slot>
        <b-button type="submit" variant="primary" block :disabled="isLoading">
          <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Simpan</span>
          <span v-else>Simpan</span>
        </b-button>
        <b-button  block to="/manajemen/toko/">
          <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Batal</span>
          <span v-else>Batal</span>
        </b-button>
      </b-col>
    </b-row>
    </b-card>
    <div class="clearfix">&nbsp;</div>
    <div class="clearfix">&nbsp;</div>
  </b-form>
</template>

<script>
// apollo
import AddTenant from '~/apollo/mutations/UpdateTenant'

export default {
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
        nama: '',
        jenis: '',
        industri: ''
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
      if (vm.errors.count() === 0) {
        vm.transformedData = {
          input: {nama: vm.form.nama, jenis: vm.form.jenis, industri: vm.form.industri}
        }
        console.log('yes submit')
        vm.$apollo.mutate({
          mutation: AddTenant,
          variables: vm.transformedData
        }).then(function (res) {
          console.log(res)
          vm.isLoading = false
          vm.$nuxt.$router.replace({ path: '/manajemen/toko' })
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