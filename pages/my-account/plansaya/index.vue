<template>
  <div class="container-fluid">
    
    <b-card title="Plan Saya">
      <div class='card-text pt-4'>
        <MyPlan>
        </MyPlan>
      </div>
    </b-card>
  </div>
</template>

<script>
import MyPlan from '~/components/my-account/plan'

export default {
  components: { MyPlan },
  data () {
    return {
      selectedStore: {label: 'BALIN DINOYO', value: 'BALINDINOYO'}
    }
  },
  computed: {
    storeChoice: function () {
      return this.selectedStore.value
    }
  },
  methods: {
    check (val) {
      this.selectedStore = val

      setTimeout(() => {
        this.$refs.MyPlan.fetch()
      }, 10)
    // },
    // catalogClicked (catalogUPC) {
    //   this.$nuxt.$router.replace({path: '/catalog/product/' + catalogUPC, query: this.dataFilter})
    }
  }
}
</script>