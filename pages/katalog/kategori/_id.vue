<template>
  <div class="container-fluid">
    <b-row align-h="between">
      <b-col cols="12" md="6">
        <b-button variant="primary mb-3 px-3" :to="'/katalog/kategori'">Kembali</b-button>
      </b-col>
    </b-row>
    <b-card title="Edit Kategori">
      <div class='card-text pt-4 box-shadow'>
        <b-form @submit="onSubmit" validated> <!-- @submit="onSubmit" --> 
          <div class="row">
            <div class="col-12 col-md-6">
              <b-form-group label="Nama">
                <b-form-input data-vv-name="Nama" v-validate="'required|min:3'" v-model="form.nama" :state="errors.has('Nama')" placeholder="Nama Plan"></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('Nama')">{{ errors.first('Nama') }}</b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-12 col-md-6">
              <b-form-group label="Kategori">
                <b-form-input data-vv-name="kategori" v-validate="'required|min:3'" v-model="form.kategori" :state="errors.has('kategori')" placeholder="kategori Plan"></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('kategori')">{{ errors.first('kategori') }}</b-form-invalid-feedback>
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
import KategoriQuery from '~/apollo/queries/query_group'
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
        tipe: 'kategori'
      },
      id: '',
      tenantID: ''
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
      var tenantTemp = []
      tenantTemp = Object.values(this.$route.query)
      this.tenantID = tenantTemp.join('')
      console.log(this.tenantID)

      queryVar.jalur = this.$route.params.id
      queryVar.tenant_id = this.tenantID

      this.$apollo.query(
        {
          query: KategoriQuery,
          variables: queryVar,
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        vm.form.nama = result.data.KATGrup[0].nama
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