<template>
	<v-app class='grey lighten-4'>
    <v-container class="py-5">
      <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg6 offset-lg3 xl4 offset-xl4 class="text-xs-center">
          <nuxt-link to='/'><img src="/l.png"></nuxt-link>
          <v-container grid-list-md class='text-xs-left'>
            <nuxt/>
            <v-layout class="my-1 red--text" justify-space-around>
              <v-flex xs10 sm10 justify-center class="mb-3 text-xs-center">
                <span v-for="msg in this.$store.state.ui.alerts.error">{{ msg }}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
	</v-app>
</template>

<script>
  export default {
    mounted () {
    }
  }
</script>