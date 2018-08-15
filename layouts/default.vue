<template>
  <v-app class='grey lighten-3'>
    <v-navigation-drawer :mini-variant.sync="menubar.mini" v-model="menubar.drawer" stateless hide-overlay fixed app>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar size="15">
              <v-btn icon nuxt to="/me"><v-icon>chevron_left</v-icon></v-btn>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-if="$store.state.authentication.org">{{ $store.state.authentication.org.name.substring(0, 25) }} {{ $store.state.authentication.org.name.length > 25 ? '...' : '' }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="menubar.mini = !menubar.mini"><v-icon>list</v-icon></v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in menubar.items" :key="item.name" nuxt :to="`/dashboard/${$route.params.company_id}/${item.href}`">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    apollo: {
      $client: 'customer'
    },
    mounted () {
    },
    data: () => ({
      menubar: {
        mini: false,
        drawer: true,
        items: [
          { icon: 'dashboard', text: 'Dashboard', href: '', scope: '*' },
          { icon: 'money', text: 'Penjurnalan', href: `jurnal`, scope: 'transaksi' },
          { icon: 'show_chart', text: 'Laporan', href: `laporan`, scope: 'laporan' },
          { icon: 'settings', text: 'Konfigurasi', href: `konfigurasi/perusahaan`, scope: 'configuration' }
        ]
      },
      dialog: false,
      snackbar: null
    })
  }
</script>