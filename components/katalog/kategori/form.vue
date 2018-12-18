<template>
  <div>
    <ApolloMutation
      :mutation="require('@/apollo/mutations/AddUpdateGroup.gql')"
      :variables="{
        tenant_id: (tenantID) ? tenantID : null,
        updateGrup: {
          id,
          nama,
          tipe
        }
      }"
      @done="onDone">
      <template slot-scope="{mutate, loading, gqlError: error }">
        <b-row>
          <b-col cols="12">
            <b-form-group label="Nama">
              <b-form-input v-model="nama" ref="nama"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Tipe">
              <b-form-input v-model="tipe" readonly></b-form-input>
            </b-form-group>
          </b-col>
          <!-- <b-col cols="12" md="6">
            <b-form-group label="Parent">
              <b-form-input v-model="parentID"></b-form-input>
            </b-form-group>
          </b-col> -->
        </b-row>
        <div class="clearfix">&nbsp;</div>
        <div class="clearfix">&nbsp;</div>
        <div v-if="error" class="error">{{ error.message }}</div>
        <template v-if="!showUpdate">
          <b-button type="submit" variant="primary" block @click="mutate()">Tambah</b-button>
        </template>
        <template v-else>
          <b-button type="submit" variant="primary">Ubah</b-button>
        </template>
      </template>
    </ApolloMutation>
  </div>
</template>
<script>
export default {
  props: ['tenantID'],
  data () {
    return {
      showUpdate: false,
      tenant_id: this.tenantID ? this.tenantID : null,
      id: null,
      nama: '',
      tipe: 'kategori',
      parentID: 0
    }
  },
  methods: {
    onDone (result) {
      window.location.reload()
      if (result) {
        this.id = null
        this.nama = ''
        this.tipe = ''
        this.parentID = 0
      }
    }
  }
}
</script>