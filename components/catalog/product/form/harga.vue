<template>
  <div>
    <!-- b-row v-for="(price, index) in defaultHarga" align-v="center">
      <b-col cols="12" md="12">
        <span>Harga {{ index + 1 }}</span>
        <b-link class="text-danger float-right" @click="removePrice(index)"><i class="fa fa-times-circle"></i> Hapus</b-link>
        <hr class="mt-1 mb-2"/>
      </b-col>
      <b-col cols="12" md="11">
        <b-row>
          <b-col cols="12" md="6">
            <b-form-group label="Harga">
              <money v-model="price.harga" class="text-right form-control" data-vv-name="Harga" v-validate="'required'" :state="errors.has('Harga')"></money>
              <b-form-invalid-feedback :force-show="errors.has('Harga')">{{ errors.first('Harga') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group label="Mulai">
              <b-form-input data-vv-name="Mulai" v-validate="'required'" v-model="price.mulai" :state="errors.has('Mulai')" type="tel" v-mask="'####/##/## ##:##:##'" masked="true"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Mulai')">{{ errors.first('Mulai') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group label="Satuan">
              <b-form-input data-vv-name="Satuan" v-validate="'required'" v-model="price.penetapan.satuan" :state="errors.has('Satuan')"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Satuan')">{{ errors.first('Satuan') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Bundle">
              <b-form-input type="number" data-vv-name="Bundle" v-validate="'required'" v-model="price.penetapan.bundle" :state="errors.has('Bundle')" :min="0"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Bundle')">{{ errors.first('Bundle') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group label="Berlaku">
              <v-select v-model="price.berlaku" :options="['BALINDINOYO','KORAKA']" multiple></v-select>
              <b-form-invalid-feedback :force-show="errors.has('Berlaku')">{{ errors.first('Berlaku') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
      <div class="clearfix">&nbsp;</div>
      <div class="clearfix">&nbsp;</div>
    </b-row> -->

    <table class="table">
      <thead>
        <tr>
          <th>Nominal</th>
          <th>Mulai - Hingga</th>
          <th>Penetepan (jumlah/satuan)</th>
          <th>Berlaku</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(price, index) in defaultHarga">
          <td contenteditable="true" placeholder="Nominal"></td>
          <td>
            <span contenteditable="true"></span> - <span contenteditable="true"></span>
          </td>
          <td>
            <span contenteditable="true"></span> &#47; <span contenteditable="true"></span>
          </td>
          <td contenteditable="true">
            <v-select v-model="price.berlaku" :options="['BALINDINOYO','KORAKA']" multiple></v-select>
            <b-form-invalid-feedback :force-show="errors.has('Berlaku')">{{ errors.first('Berlaku') }}</b-form-invalid-feedback>
          </td>
          <td>
            <b-link class="text-danger float-right" @click="removeOpsi(index)"><i class="fa fa-times-circle"></i> Hapus</b-link>
          </td>
        </tr>
      </tbody>
    </table>

    <b-row>
      <b-col cols="12">
        <b-link class="text-info" @click="addPrice"><i class="fa fa-plus-circle mr-1"></i> Harga Baru</b-link>
          <!-- <b-button variant="info px-3" size="sm" @click="addPrice"><i class="fa fa-plus-circle mr-1"></i> Harga Baru</b-button> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  props: {
    defaultHarga: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    addPrice () {
      this.defaultHarga.push({
        harga: 0,
        mulai: '',
        penetapan: {
          satuan: '',
          bundle: 0
        }
      })
      this.$emit('HARGA', this.defaultHarga)
    },
    removePrice (index) {
      // console.log({1: 'yes', 2: index})
      this.defaultHarga.splice((index - 1), 1)
    }
  }
}
</script>
