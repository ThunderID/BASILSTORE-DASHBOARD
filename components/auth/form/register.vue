<template>
  <b-form @submit="onSubmit" validated>

    <b-form-group>
      <b-form-input novalidate type='text' required v-validate placeholder="Budi" v-model="form.name" name="name"></b-form-input>
    </b-form-group>

    <b-form-group>
      <b-form-input novalidate type='email' required v-validate placeholder="budi@basil.id" v-model="form.username" name="email"></b-form-input>
    </b-form-group>

    <b-form-group>
      <b-form-input novalidate type='password' required v-validate placeholder="password" v-model="form.password" name="password"></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary" block :disabled="isLoading">
      <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Daftar</span>
      <span v-else>Daftar</span>
    </b-button>

  </b-form>
</template>

<script>
import Register from '~/apollo/mutations/auth/register'

export default {
  data () {
    return {
      form: {
        name: '',
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
          input: {name: vm.form.name, username: vm.form.username, password: vm.form.password}
        }
        vm.$apollo.mutate({
          mutation: Register,
          variables: vm.transformedData
        }).then(function (res) {
          if (res.data.UACRegistering) {
            vm.$emit('SUCCESS', res)
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