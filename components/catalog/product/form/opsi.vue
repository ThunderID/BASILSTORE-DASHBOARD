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
<!--     <b-row v-for="(option, index) in defaultOpsi" align-v="center">
      <b-col cols="12">
        <span>Varian {{ index + 1 }}</span>
        <b-link class="text-danger float-right" @click="removeOpsi(index)"><i class="fa fa-times-circle"></i> Hapus</b-link>
        <hr class="mt-1 mb-2"/>
      </b-col>
      <b-col cols="12" md="12">
        <b-form-group label="SKU">
          <b-form-input data-vv-name="Judul" v-validate="'required|min:3'" :state="errors.has('Judul')"></b-form-input>
          <b-form-invalid-feedback :force-show="errors.has('Judul')">{{ errors.first('Judul') }}</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="12">
        <b-form-group label="Parameter">
          <b-form-input type="number"  data-vv-name="Bundle" v-validate="'required'" :state="errors.has('Bundle')"></b-form-input>
          <b-form-invalid-feedback :force-show="errors.has('Bundle')">{{ errors.first('Bundle') }}</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="12">
        <b-form-group label="Value">
          <b-form-input type="number"  data-vv-name="Bundle" v-validate="'required'" :state="errors.has('Bundle')"></b-form-input>
          <b-form-invalid-feedback :force-show="errors.has('Bundle')">{{ errors.first('Bundle') }}</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="5">
        <b-form-group label="Bundle">
          <b-form-input type="number"  data-vv-name="Bundle" v-validate="'required'" :state="errors.has('Bundle')"></b-form-input>
          <b-form-invalid-feedback :force-show="errors.has('Bundle')">{{ errors.first('Bundle') }}</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="12">
        <b-link class="text-dark" style="font-size: 12px;" v-b-modal.modalVarian><u>tambah varian</u></b-link>
      </b-col>
      <div class="clearfix">&nbsp;</div>
    </b-row> -->

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
  props: {
    defaultOpsi: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
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

