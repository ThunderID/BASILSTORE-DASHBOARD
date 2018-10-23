import Vue from 'vue'
import VueMoney from 'v-money'

Vue.use(VueMoney,
  {
    decimal: ',',
    thousands: '.',
    prefix: 'Rp ',
    suffix: '',
    precision: 0,
    masked: false
  }
)
// Vue.directive('money', VueMoney)
