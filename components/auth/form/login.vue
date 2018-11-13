<template>
  <b-form @submit="onSubmit" validated>

    <b-form-group>
      <b-form-input novalidate type='email' required v-validate placeholder="email" v-model="form.username" name="email"></b-form-input>
    </b-form-group>

    <b-form-group>
      <b-form-input novalidate type='password' required v-validate placeholder="password" v-model="form.password" name="password"></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary" block :disabled="isLoading">
      <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Login</span>
      <span v-else>Login</span>
    </b-button>

  </b-form>
</template>

<script>
import Authenticate from '~/apollo/mutations/auth/authenticate'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    onSubmit (e) {
      let vm = this
      e.preventDefault()
      vm.isLoading = true
      if (vm.errors.count() === 0) {
        vm.transformedData = {
          input: {username: vm.form.username, password: vm.form.password}
        }
        vm.$apollo.mutate({
          mutation: Authenticate,
          variables: vm.transformedData
        }).then(function (res) {
          if (res.data.UACAuthenticating) {
            vm.$emit('SUCCESS', res.data.UACAuthenticating)
          } else {
            vm.$emit('FAIL', res)
          }
          vm.isLoading = false
        }).catch(function (e) {
          vm.$emit('FAIL', e)
          vm.isLoading = false
        })
      } else {
        vm.isLoading = false
      }
    }
  }
}
</script>