<template>
  <div class="container-fluid">
    <b-row align-h="between">
      <b-col cols="12" md="6">
        <b-button variant="primary mb-3 px-3" :to="'/manajemen/toko'">Kembali</b-button>
      </b-col>
    </b-row>
    <b-card title="Edit Toko">
      <div class='card-text pt-4 box-shadow'>
        <b-form @submit="onSubmit" validated> <!-- @submit="onSubmit" --> 

          <div class="row">
            <!-- <p>{{this.table.data}}</p> -->
            <div class="col-5 col-md-12">
              <b-form-group label="ID Toko :">
                <h1>{{id}}</h1>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <b-form-group label="Nama">
                <b-form-input data-vv-name="Nama" v-validate="'required|min:3'" v-model="form.nama" :state="errors.has('Nama')" placeholder="Nama Plan"></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('Nama')">{{ errors.first('Nama') }}</b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-12 col-md-6">
              <b-form-group label="Jenis">
                <b-form-input data-vv-name="jenis" v-validate="'required|min:3'" v-model="form.jenis" :state="errors.has('jenis')" placeholder="jenis Plan"></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('jenis')">{{ errors.first('jenis') }}</b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <b-form-group label="Industri">
                <b-form-input data-vv-name="industri" v-validate="'required|min:3'" v-model="form.industri" :state="errors.has('industri')" placeholder="industri Plan"></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('industri')">{{ errors.first('industri') }}</b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
          <b-row>
            <b-col cols="6">
              <slot name='action'></slot>
              <b-button type="submit" variant="primary" block :disabled="isLoading">
                <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Simpan</span>
                <span v-else>Simpan</span>
              </b-button>
            </b-col>
            <b-col cols="6">
            <slot name='action'></slot>
              <b-button type="button" variant="danger" block :disabled="isLoading" disabled> <!-- @click="onDelete" -->
                <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i>Hapus</span>
                <span v-else>Hapus</span>
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
import TokoQuery from '~/apollo/queries/query_toko'
import UpdateTenant from '~/apollo/mutations/UpdateTenant'

export default {
  props: {
    dataFilter: {
      type: Object,
      default: function () {
        return {}
      }
    },
    defaultData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
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
      table: {
        data: [],
        filter: {}
      },
      form: {
        nama: '',
        jenis: '',
        industri: ''
      },
      id: ''
    }
  },
  mounted () {
    this.fetch()
  },
  computed: {
    transformInput: function () {
      return {
        input: {
          id: this.formData.id
        }
      }
    }
  },
  methods: {
    fetch () {
      let vm = this
      vm.table.data = []
      let queryVar = {}

      queryVar.id = this.$route.params.id

      this.$apollo.query(
        {
          query: TokoQuery,
          variables: queryVar,
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        vm.table.data = result.data.MANListTenant[0]
        vm.id = result.data.MANListTenant[0].id
        vm.form.nama = result.data.MANListTenant[0].nama
        vm.form.jenis = result.data.MANListTenant[0].jenis
        vm.form.industri = result.data.MANListTenant[0].industri
      }).catch(e => {
        if (e.graphQLErrors && Array.isArray(e.graphQLErrors) && e.graphQLErrors.length) {
          e.graphQLErrors.forEach(function (error) {
            switch (error.code) {
              case 401:
                vm.$nuxt.$router.replace({ path: '/' })
                break

              default:
                vm.$emit('SUBMIT_FAIL', error.code)
                break
            }
          })
        } else if (e.networkError.message) {
          vm.$emit('SUBMIT_ERROR', 'Fail to connect to server')
        }
      })
    },
    onSubmit (e) {
      let vm = this
      e.preventDefault()
      vm.isLoading = true
      if (vm.errors.count() === 0) {
        vm.$apollo.mutate({
          mutation: UpdateTenant,
          variables: {
            id: vm.id,
            input: vm.form
          }
        }).then(function (res) {
          vm.$router.replace('/manajemen/toko')
          vm.isLoading = false
        }).catch(function (e) {
          vm.$emit('fail', e)
          vm.isLoading = false
        })
      } else {
        vm.isLoading = false
      }
    }
  }
}
</script>