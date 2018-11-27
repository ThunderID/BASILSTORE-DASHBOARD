<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Parameters</th>
          <th>Value</th>
          <th>Bundle</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(option, index) in defaultOpsi">
          <td contenteditable="true" placeholder="SKU"></td>
          <td contenteditable="true" placeholder="Parameters"></td>
          <td contenteditable="true" placeholder="Value"></td>
          <td contenteditable="true" placeholder="Bundle"></td>
          <td>
            <b-link class="text-danger float-right" @click="removeOpsi(index)"><i class="fa fa-times-circle"></i> Hapus</b-link>
          </td>
        </tr>
      </tbody>
    </table>
    <b-row>
      <b-col cols="12">
        <b-link class="text-info" @click="addOpsi"><i class="fa fa-plus-circle mr-1"></i> Opsi Baru</b-link>
        <!-- <b-button variant="info px-3" size="sm" @click="addOpsi"><i class="fa fa-plus-circle mr-1"></i> Opsi Baru</b-button> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        judul: '',
        bundle: ''
      }
    }
  },
  methods: {
    addOpsi () {
      this.defaultOpsi.push({
        judul: '',
        bundle: ''
      })
      console.log(this.defaultOpsi)
    },
    removeOpsi (index) {
      this.defaultOpsi.splice((index - 1), 1)
    }
  }
}
</script>

