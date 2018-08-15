<template>
  <v-layout class="my-4" justify-space-around>
    <v-flex xs12 justify-center>
      <!-- LOGIN FORM -->
      <v-card flat class='b-1'>
        <v-card-title class='headline mb-2'>Account Login</v-card-title>
        <v-card-text>
          <FormLogin 
            ref="FormLogin" 
            @SUBMIT_ERROR="SUBMIT_ERROR" 
            @SUBMIT_FAIL="SUBMIT_FAIL" 
            @SUBMIT_SUCCESS="LOGIN_SUCCESS" >
          </FormLogin>
        </v-card-text>

        <v-divider></v-divider>
        
        <v-card-text>
          <v-layout wrap>
            <v-flex xs6><nuxt-link to="/forget-password">Lupa Password</nuxt-link></v-flex>
            <!-- <v-flex xs6 text-xs-right><nuxt-link to="/register">Daftar</nuxt-link></v-flex> -->
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import FormLogin from '~/components/auth/form/login'

export default {
  layout: 'auth',
  components: { FormLogin },
  asyncData ({store}) {
    store.dispatch('authentication/logout')
  },
  methods: {
    LOGIN_SUCCESS (data) {
      this.$store.dispatch('authentication/login', {user: data.user, token: data.token})
      this.$nuxt._router.replace('/me')
    },
    SUBMIT_ERROR (data) {
      alert('Connection error')
    },
    SUBMIT_FAIL (data) {
      switch (data) {
        case 1000:
          this.$store.dispatch('ui/alert', {error: 'Kombinasi email dan password anda tidak cocok'})
          break
      }
    }
  }
}
</script>