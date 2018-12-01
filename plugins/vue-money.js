import Vue from 'vue'
import VueMoney from 'v-money'

Vue.use(VueMoney,
  {
    decimal: ',',
    thousands: '.',
    prefix: '',
    suffix: '',
    precision: 0,
    masked: false
  }
)
// Vue.directive('money', VueMoney)
