<template>
  <div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th class="border-top-0">Judul</th>
            <th class="border-top-0">Varian</th>
            <th class="border-top-0 text-center">Bundle</th>
            <th class="border-top-0"></th>
          </tr>
        </thead>
        <tbody v-if="tableOpsi.length !== 0">
          <tr v-for="(option, index) in tableOpsi">
            <td>{{ option.judul }}</td>
            <td><span v-if="option.varian.length !== 0">Memiliki Varian</span></td>
            <td class="text-center">{{ option.bundle.kuantitas }}   {{option.bundle.satuan}}</td>
            <td style="width: 10%;"><b-link class="text-danger" @click="removeData(index)"><i class="fas fa-minus"></i></b-link></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr><td class="text-center" colspan="3">Belum ada opsi untuk produk ini</td></tr>
        </tbody>
      </table>
    </div>
    <b-btn variant="link" v-b-modal="'modalOpsi'" @click=""><i class="fas fa-plus"></i> Opsi</b-btn>
    <b-modal id="modalOpsi" title="Tambah Opsi Baru" size="lg" @ok="saveOpsi" ok-title="Simpan" cancel-variant="light" no-close-on-backdrop>
      <b-container>
        <b-row>
          <b-col cols="12" md="8">
            <b-form-group label="Judul">
              <b-form-input v-model="judul"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4">
            <b-form-group label="Kuantitas">
              <b-form-input type="number" v-model="kuantitas"></b-form-input>
            </b-form-group>
            <b-form-group label="Satuan">
              <b-form-input type="text" v-model="satuan"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="clear">&nbsp;</div>
        <h5>Varian</h5>
        <b-row>
          <b-col cols="12">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Bundle</th>
                    <th>Satuan</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(varian, index) in tempVarian">
                    <td><b-form-input type="text" placeholder="SKU" v-model="varian.sku"></b-form-input></td>
                    <td><b-form-input type="text" placeholder="Parameters" v-model="varian.parameter"></b-form-input></td>
                    <td><b-form-input type="text" placeholder="Value" v-model="varian.value"></b-form-input></td>
                    <td><b-form-input type="text" placeholder="Kuantitas" v-model="varian.bundle.kuantitas"></b-form-input></td>
                    <td><b-form-input type="text" placeholder="Satuan" v-model="varian.bundle.satuan"></b-form-input></td>
                    <td class="pt-3" style="width: 10%;"><b-link class="text-danger" @click="removeVarian(index)"><i class="fas fa-minus"></i></b-link></td>
                  </tr>
                  <tr v-if="tempVarian.length === 0">
                    <td class="text-center" colspan="5">Belum ada varian</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <b-link @click="addVarian" ><i class="fas fa-plus"></i> Varian Baru</b-link>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      stateVarian: true,
      tempOpsi: [],
      tempVarian: [],
      dataOpsi: [],
      dataVarian: [],
      judul: '',
      bundle: {
        kuantitas: 0,
        satuan: ''
      }
    }
  },
  computed: {
    tableOpsi: function () {
      return this.dataOpsi
    }
  },
  methods: {
    addVarian () {
      this.stateVarian = false
      this.tempVarian.push({
        sku: '',
        parameter: '',
        value: '',
        bundle: {
          kuantitas: 0,
          satuan: ''
        }
      })
    },
    removeVarian (idx) {
      this.tempVarian.splice((idx), 1)
    },
    removeData (idx) {
      this.tableOpsi.splice((idx), 1)
    },
    saveOpsi () {
      this.dataOpsi.push({
        judul: this.judul,
        bundle: {
          kuantitas: this.kuantitas,
          satuan: this.satuan
        },
        varian: this.tempVarian
      })
      this.tempOpsi = []
      this.tempVarian = []
      this.judul = ''
      this.bundle = 0
      this.$emit('SUCCESS', this.tableOpsi)
    },
    addOpsi () {
      this.tempOpsi.push({
        judul: '',
        bundle: 0,
        varian: []
      })
    }
  }
}
</script>