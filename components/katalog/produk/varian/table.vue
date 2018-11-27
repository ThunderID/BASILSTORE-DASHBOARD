<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>Judul</th>
          <th>Varian</th>
          <th>Bundle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="dataOpsi.judul != ''"
          v-for="(option, index) in dataOpsi">
          <td>
            <b-form-input v-model="option.judul"></b-form-input>
          </td>
          <td>&nbsp;</td>
          <td>
            <b-form-input v-model="option.bundle"></b-form-input>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataOpsi: {
        judul: '',
        varian: 'tes',
        bundle: 0
      },
      dataVarian: {
        sku: '',
        parameter: '',
        value: '',
        bundle: 0
      }
    }
  }
}
</script>