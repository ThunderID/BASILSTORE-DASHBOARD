<template>
  <div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th class="border-top-0 text-center">Word</th>
            <th class="border-top-0 text-center">Tag</th>
            <th class="border-top-0"></th>
          </tr>
        </thead>
        <tbody v-if="tableKeyword.length !== 0">
          <tr v-for="(option, index) in tableKeyword">
            <td class="text-center"><b-badge>{{option.word}}</b-badge></td>
            <td class="text-center"><b-badge>{{option.tag}}</b-badge></td>
            <td style="width: 10%;"><b-link class="text-danger" @click="removeData(index)"><i class="fas fa-minus"></i></b-link></td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr><td class="text-center" colspan="3">Belum ada opsi untuk produk ini</td></tr>
        </tbody>
      </table>
    </div>
    <b-btn variant="link" v-b-modal="'modalKeyword'" @click=""><i class="fas fa-plus"></i> Tambah Keyword</b-btn>
    <b-modal id="modalKeyword" title="Tambah Keyword baru" size="lg" @ok="saveKeyword" ok-title="Simpan" cancel-variant="light" no-close-on-backdrop>
      <b-container>
        <div class="clear">&nbsp;</div>
        <h5>Keyword</h5>
        <b-row>
          <b-col cols="12">
            <div class="table-responsive">
                <b-col cols="12" md="8">
                  <b-form-group label="Word">
                    <b-form-input v-model="word"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" md="8">
                  <b-form-group label="Tag">
                    <b-form-input type="text" v-model="tag"></b-form-input>
                  </b-form-group>
                </b-col>
            </div>
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
      dataKeyword: [],
      word: '',
      tag: ''
    }
  },
  computed: {
    tableKeyword: function () {
      return this.dataKeyword
    }
  },
  methods: {
    removeData (idx) {
      this.tableKeyword.splice((idx), 1)
    },
    saveKeyword () {
      this.dataKeyword.push({
        word: this.word,
        tag: this.tag
      })
      this.word = ''
      this.tag = ''
      this.$emit('SUCCESS', this.tableKeyword)
    }
  }
}
</script>