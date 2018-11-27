<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="3" xl="2" class="bg-white border-right border-bottom" style="height: 100vh">
          <b-nav vertical class="py-4">
            <b-nav-item :to="{ name: 'katalog-kategori' }" class="text-secondary" >Kategori</b-nav-item>
            <b-nav-item :to="{ name: 'katalog-produk' }" >Produk</b-nav-item>
            <b-nav-item :to="{ name: 'catalog-promo' }" >Promo</b-nav-item>
            <b-nav-item >Settings</b-nav-item>
            <b-nav-item >Report</b-nav-item>
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
  layout: 'dashboard',
  middleware: 'auth'
}
</script>