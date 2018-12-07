<template>
  <div>
    <h1 class='text-uppercase'>
      Login
    </h1>
    <b-alert :show="dismissCountDown"
             dismissible
             variant="danger"
             @dismissed="dismissCountDown=0">
      <p>Username atau password salah</p>
    </b-alert>
    <p>Silakan masukkan email dan password anda</p>
    
    <LoginForm class='m-t-lg v-step-1' @SUCCESS="onLoginSuccess" @FAIL="onLoginFail"></LoginForm>
    
    <p class='mt-2'>
      <nuxt-link to="/register">Daftar</nuxt-link> &nbsp;·&nbsp;
      <nuxt-link to="/forget-password">Lupa Password</nuxt-link>
    </p>
    
    <v-tour name="myTour" :steps="steps"></v-tour>
  </div>
</template>

<script>
import LoginForm from '~/components/auth/form/login'
import MyplanQuery from '~/apollo/queries/query_myplan'
export default {
  components: { LoginForm },
  data () {
    return {
      data: {
        nomor: '',
        kode: ''
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  methods: {
    onLoginSuccess (data) {
      console.log('SUCCESS')
      this.$store.dispatch('authentication/login', {user: data.user, token: data.token})
      this.fetch()
    },
    onLoginFail (data) {
      this.$nuxt.$router.replace('/')
      this.showAlert()
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    fetch () {
      let vm = this
      let queryVar = {}

      this.$apollo.query(
        {
          query: MyplanQuery,
          variables: queryVar,
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        console.log('QUERY')
        if (result.data.UACSubscription[0]) {
          console.log('Has Plan')
          vm.$nuxt.$router.replace({ path: '/dashboard' })
        } else {
          console.log('No Plan')
          vm.$nuxt.$router.replace({ path: '/subscribe' })
        }
      }).catch(e => {
        console.log('catch')
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
    }
  }
}
</script>