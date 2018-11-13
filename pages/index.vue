<template>
  <div>
    <h1 class='text-uppercase'>
      Login
    </h1>
    
    <p>Silakan masukkan email dan password anda</p>
    
    <LoginForm class='m-t-lg' @SUCCESS="onLoginSuccess" @FAIL="onLoginFail"></LoginForm>
    
    <p class='mt-2'>
      <nuxt-link to="/register">Daftar</nuxt-link> &nbsp;·&nbsp;
      <nuxt-link to="/forget-password">Lupa Password</nuxt-link>
    </p>
  </div>
</template>

<script>
import LoginForm from '~/components/auth/form/login'
export default {
  components: { LoginForm },
  methods: {
    onLoginSuccess (data) {
      this.$store.dispatch('authentication/login', {user: ['ardian', '1234'], token: data.UACauthenticating})
      this.$nuxt.$router.replace('/dashboard')
    },
    onLoginFail (data) {
      this.$nuxt.$router.replace('/')
    }
  }
}
</script>