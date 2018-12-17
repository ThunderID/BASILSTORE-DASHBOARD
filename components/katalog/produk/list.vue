<template>
  <div v-if="((tenantID !== null) && (tenantID !== ''))">
    <ApolloQuery 
      :query="require('@/apollo/queries/query_produk_sellable.gql')"
      :variables="{ takes: 15, tenant_id: (tenantID) ? tenantID : '' }" 
      :fetchPolicy="'no-cache'">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading">
          <div class="fa-3"><i class="fas fa-circle-notch fa-spin"></i></div>
        </div>
        <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-else-if="data">
          <div v-if="(data.KATProduk !== null) && (data.KATProduk.length !== 0)">
            <b-list-group>
              <b-list-group-item v-for="(item, index) in data.KATProduk" :key="item.upc"
                v-b-modal="link" @click="emitProduk(item)" href="#" class="flex-column align-items-start border-left-0 border-right-0">
                <b-row>
                  <b-col>
                    <b-img slot="aside" :src="item.galeri.thumbnail" width="54" height="50" alt="placeholder" fluid />
                  </b-col>
                  <b-col cols="10">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mt-0 mb-1">{{ item.nama }}</h5>
                      <p class="mb-1">{{ item.harga.harga.currency }} {{ item.harga.harga.nominal | toCurrency }} / {{ item.harga.pengaturan.penetapan.bundle }} <span class="text-lowercase">{{ item.harga.pengaturan.penetapan.satuan }}</span></p>
                    </div>
                    <small class="text-uppercase text-secondary">{{ item.upc }}</small>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </div>
          <div v-else>
            <p class="mb-1">
              Belum ada data
            </p>
          </div>
        </div>
      </template>
    </ApolloQuery>
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
export default {
  props: {
    tenantID: {
      type: String
    },
    link: {
      type: String
    }
  },
  methods: {
    emitProduk (upc) {
      this.$emit('SELECTED_PRODUK', upc)
    }
  }
}
</script>
