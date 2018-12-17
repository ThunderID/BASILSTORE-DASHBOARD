<template>
  <div>
    <ApolloMutation
      :mutation="require('@/apollo/mutations/AddUpdateGroup.gql')"
      :variables="{
        tenant_id: (tenantID) ? tenantID : null
      }">
      <template slot-scope="{mutate, loading, gqlError: error }">
      </template>
    </ApolloMutation>
  </div>
</template>
<script>
export default {
  props: ['tenantID'],
  data () {
    return {
      parentID: 0
    }
  },
  methods: {
    onDone (result) {
      if (result) {
        this.parentID = 0
      }
    }
  }
}
</script>
