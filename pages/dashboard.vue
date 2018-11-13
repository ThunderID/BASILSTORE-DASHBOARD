<template>
  <div class="text-center">
  	WELCOME {{ $store.state.authentication.me.name }}
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'dashboard'
}
</script>