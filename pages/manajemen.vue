<template>
  <div>
    <b-container fluid class=''>
      <b-row>
        <b-col cols="12" md="3" xl="2" class="bg-white border-right border-bottom" style="height: 100vh">
          <b-nav vertical class="py-4">
            <b-nav-item :to="{ name: 'manajemen-toko' }" ><i class="fas fa-ribbon mr-2"></i>Toko Saya</b-nav-item>
            <!-- <b-nav-item :to="{ name: 'catalog-product' }" ><i class="fas fa-box  mr-2"></i> Produk</b-nav-item>
            <b-nav-item :to="{ name: 'catalog-promo' }" ><i class='fas fa-ribbon mr-2'></i> Promo</b-nav-item>
            <b-nav-item ><i class='fas fa-cog mr-2'></i> Settings</b-nav-item> -->
            <b-nav-item >
              <i class='fas fa-file mr-2'></i> Report
            </b-nav-item>
          </b-nav>
        </b-col>
        <b-col>
          <div class="clearfix">&nbsp;</div>
          <nuxt-child/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: 'dashboard'
}
</script>