<template>
  <div>
    <h1 class='text-uppercase'>
      Daftar
    </h1>
    
    <p>Silakan masukkan data anda</p>
    
    <RegisterForm class='m-t-lg' @SUCCESS="onRegisterSuccess" @FAIL="onRegisterFail"></RegisterForm>
    
    <p class='mt-2'>
      <nuxt-link to="/">Login</nuxt-link> &nbsp;·&nbsp;
      <nuxt-link to="/forget-password">Lupa Password</nuxt-link>
    </p>
  </div>
</template>

<script>
import RegisterForm from '~/components/auth/form/register'
export default {
  components: { RegisterForm },
  methods: {
    onRegisterSuccess (data) {
      this.$nuxt.$router.replace('/')
    },
    onRegisterFail (data) {
      this.$nuxt.$router.replace('/register')
    }
  }
}
</script>