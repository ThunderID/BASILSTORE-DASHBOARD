<template>
  <div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th class="border-top-0">Harga</th>
            <th class="border-top-0 text-center">Mulai</th>
            <th class="border-top-0 text-center">Hingga</th>
            <th class="border-top-0 text-center">Satuan</th>
            <th class="border-top-0 text-center">Bundle</th>
            <th class="border-top-0"></th>
          </tr>
        </thead>
        <tbody v-if="tableHarga.length !== 0">
          <tr v-for="(option, index) in tableHarga">
            <td>{{ option.harga.currency }} {{ option.harga.nominal }}</td>
            <td class="text-center">{{ option.mulai.date }} | {{ option.mulai.timezone }} </td>
            <td class="text-center">{{ option.hingga.date }} | {{ option.hingga.timezone }} </td>
            <td class="text-center">{{ option.pengaturan.penetapan.satuan }}</td>
            <td class="text-center">{{ option.pengaturan.penetapan.bundle }}</td>
            <td class="pt-3" style="width: 10%;"><b-link class="text-danger" @click="removeData(index)"><i class="fas fa-minus"></i></b-link></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr><td colspan="4" class="text-center">Belum ada harga untuk produk ini</td></tr>
        </tbody>
      </table>
    </div>
    <b-btn variant="link" v-b-modal="'modalHarga'" @click="addHarga"><i class="fas fa-plus"></i> Harga</b-btn>
    <b-modal id="modalHarga" title="Tambah Harga Baru" size="lg" @ok="saveHarga" ok-title="Simpan" cancel-variant="light" no-close-on-backdrop>
      <b-container>
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group label="Mata uang">
              <b-form-select v-model="currency">
                <option value="idr" selected>Rp</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group label="Nominal">
              <money v-model="nominal" class="text-right form-control"></money>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="6">
            <b-form-group label="Mulai Tanggal" class="form-inline">
              <input type="text" v-model="dateMulai" v-mask="'####-##-## ##:##:##'" class="form-control mr-1"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group label="Hingga Tanggal" class="form-inline">
              <input type="text" v-model="dateHingga" v-mask="'####-##-## ##:##:##'" class="form-control mr-1"/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12"><p class="mt-2 mb-0"><u><strong>Penetepan</strong></u></p></b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="5">
            <b-form-group label="Satuan">
              <b-form-input type="text" v-model="satuan"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="2">
            <b-form-group label="Bundle">
              <b-form-input type="number" v-model="bundle"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/id'
export default {
  data () {
    let dateNow = moment().format('YYYY-MM-DD HH:mm:ss')
    let timezone = 'Asia/Jakarta'
    let selectCurrency = 'idr'

    return {
      selectedCurrency: selectCurrency,
      nominal: 0,
      currency: selectCurrency,
      dateMulai: dateNow,
      timezoneMulai: timezone,
      dateHingga: moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
      timezoneHingga: timezone,
      satuan: '',
      bundle: 0,
      dataHarga: []
    }
  },
  computed: {
    tableHarga: function () {
      return this.dataHarga
    }
  },
  methods: {
    addHarga () {
    },
    saveHarga () {
      this.dataHarga.push({
        harga: {
          nominal: this.nominal,
          currency: this.currency
        },
        mulai: {
          date: this.dateMulai,
          timezone_type: 3,
          timezone: this.timezoneMulai
        },
        hingga: {
          date: this.dateHingga,
          timezone_type: 3,
          timezone: this.timezoneHingga
        },
        pengaturan: {
          penetapan: {
            satuan: this.satuan,
            bundle: this.bundle
          }
        }
      })
      this.$emit('SUCCESS', this.tableHarga)
    },
    removeData (idx) {
      this.tableHarga.splice((idx), 1)
    }
  }
}
</script>