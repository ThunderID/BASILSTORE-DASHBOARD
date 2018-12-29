<template>
  <div class="container-fluid">
    <b-row align-h="between">
      <b-col cols="12" md="6">
        <b-button variant="primary mb-3 px-3" :to="'/katalog/produk'">Kembali</b-button>
      </b-col>
      <b-col cols="12" md="1">
        <b-button v-if="x === 0" variant="primary mb-3 px-3" @click="onEditClick()">Edit</b-button>
        <b-button v-if="x === 1" variant="danger mb-3 px-3" @click="onEditClick()">Batal</b-button>
      </b-col>
    </b-row>
    <!-- DETAIL PRODUK -->
    <b-card v-if="x === 0">
      <b-media>
        <b-img-lazy v-if="this.gambar"  slot="aside" :src="`${this.gambar}`" :alt="table.data.nama" thumbnail fluid style="width:300px;height:300px;" height="auto" blank-color="#bbb"/>
        <b-img v-else blank slot="aside" :alt="table.data.nama" thumbnail fluid  blank-color="#bbb" width="230"/>
        <div class="p-3">
          <!-- <h4>{{ this.gambar}}</h4> -->
          <div class="row">
            <div class="col-12 col-md-6">
              <b-form-group label="UPC">
                <h1>{{upc}}</h1>
              </b-form-group>
            </div>
            <div class="col-12 col-md-6">
              <b-form-group label="Nama Produk">
                <h1>{{nama}}</h1>
              </b-form-group>
            </div>
          </div>
          <div class="clearfix">&nbsp;</div>

          <!-- varian -->
          <p v-if="table.data.opsi && table.data.opsi.length != 0"><strong>Opsi</strong></p>
          <div v-if="table.data.opsi && table.data.opsi.length != 0" v-for="opsi in table.data.opsi">
            <b-card :header="opsi.judul" header-tag="header" class="w-100">
              <b-table hover small
                show-empty
                :empty-text="'Belum ada ' + opsi.judul"
                class="text-capitalize"
                :fields="[
                {key: 'parameter', label: 'Jenis', thClass: 'font-weight-bold border-top-0'}, 
                {key: 'value', label: 'Nilai', thClass: 'font-weight-bold border-top-0'}, 
                {key: 'sku', label: 'SKU', thClass: 'font-weight-bold border-top-0'}]"
                :items="opsi.varian">
              </b-table>
            </b-card>
            <div class="clearfix">&nbsp;</div>
          </div>
          <div class="clearfix">&nbsp;</div>

          <!-- list harga -->
          <p v-if="table.data.list_harga && table.data.list_harga != 0"><strong>List Harga</strong></p>
          <div v-if="table.data.list_harga && table.data.list_harga != 0" >
            <b-card  header-tag="header" class="w-100">
              <b-table hover small
                show-empty
                empty-text="Belum ada list harga"
                class="text-capitalize"
                :fields="[
                  {key: 'harga', label: 'Harga', thClass: 'font-weight-bold border-top-0'}, 
                  {key: 'mulai', label: 'Berlaku Tgl', thClass: 'font-weight-bold border-top-0'}, 
                  {key: 'pengaturan', label: 'Satuan', thClass: 'font-weight-bold border-top-0'}
                ]"
                :items="table.data.list_harga">
                <template slot="harga" slot-scope="data">
                  <span v-if="data.item.harga">{{ data.item.harga.currency }} {{ data.item.harga.nominal | toCurrency }}</span>
                </template>

                <template slot="mulai" slot-scope="data">
                  <span v-if="data.item.mulai">{{ data.item.mulai.date | toDateTime }}</span>
                </template>

                <template slot="pengaturan" slot-scope="data">
                  <span v-if="data.item.pengaturan" class="text-uppercase">{{ data.item.pengaturan.penetapan.bundle }}   {{ data.item.pengaturan.penetapan.satuan }}</span>
                </template>
              </b-table>
            </b-card>
          </div>
          <div class="clearfix">&nbsp;</div>          
          <div class="clearfix">&nbsp;</div>
           <!-- keyword -->
          <p v-if="table.data.list_keyword && table.data.list_keyword.length != 0"><strong>Keyword</strong></p>
          <div v-if="table.data.list_keyword && table.data.list_keyword.length != 0">
            <b-card header-tag="header" class="w-100">
              <b-table hover small
                show-empty
                :empty-text="'Belum ada Keyword'"
                class="text-capitalize"
                :fields="[ 
                {key: 'word', label: 'Keyword', thClass: 'font-weight-bold border-top-0'}, 
                {key: 'tag', label: 'Tag', thClass: 'font-weight-bold border-top-0'}]"
                :items="table.data.list_keyword">
              </b-table>
            </b-card>
            <div class="clearfix">&nbsp;</div>
          </div>
          <div class="clearfix">&nbsp;</div>

        </div>
        <div class="clearfix">&nbsp;</div>
      </b-media>
    </b-card>

    <!-- EDIT PRODUK -->
    <b-card v-if="x === 1">
      <b-media>
        <b-img-lazy v-if="this.gambar"  slot="aside" :src="`${this.editGambar}`" :alt="table.data.editNama" thumbnail fluid style="width:300px;height:300px;" height="auto" blank-color="#bbb"/>
        <b-img v-else blank slot="aside" :alt="table.data.nama" thumbnail fluid  blank-color="#bbb" width="230"/>
        <div class="p-3">
          <!-- <h4>{{ this.gambar}}</h4> -->  
          <div class="row">
            <div class="col-12 col-md-6">
              <b-form-group label="UPC">
                <b-form-input data-vv-name="upc" v-validate="'required'" v-model="editUpc" placeholder="UPC produk" readonly></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('upc')">{{ errors.first('upc') }}</b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-12 col-md-6">
              <b-form-group label="Nama Produk">
                <b-form-input data-vv-name="nama" v-validate="'required'" v-model="editNama" placeholder="Nama Produk"></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('nama')">{{ errors.first('nama') }}</b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-12 col-md-6">
              <b-form-group label="Link Gambar">
                <b-form-input data-vv-name="gambar" v-validate="'required'" v-model="editGambar" placeholder="gambar Produk"></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('gambar')">{{ errors.first('gambar') }}</b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
          <b-row>
          <b-col cols="12">
            <b-form-checkbox id="checkbox1"
              v-model="isStok"
              value="true"
              unchecked-value="false">
              Produk memiliki stok
            </b-form-checkbox>
          </b-col>
          </b-row>
          <div class="clearfix">&nbsp;</div>
          <!-- {{table.data}} -->
          <!-- varian -->
          <p><strong>Opsi</strong></p>
          <div>
            <b-card header-tag="header" class="w-100">
              <table class="table">
                <thead>
                  <tr>
                    <th class="border-top-0">Judul</th>
                    <th class="border-top-0">Varian</th>
                    <th class="border-top-0 text-center">Bundle</th>
                    <th class="border-top-0"></th>
                  </tr>
                </thead>
                <tbody v-if="editOpsi.length !== 0">
                  <tr v-for="(option, index) in editOpsi">
                    <td>{{ option.judul }}</td>
                    <td><span v-if="option.varian.length !== 0">Memiliki Varian</span><span v-else="option.varian.length === 0">Tidak Memiliki Varian</span></td>
                    <td class="text-center">{{ option.bundle.kuantitas }}   {{option.bundle.satuan}}</td>
                    <td style="width: 10%;"><b-link class="text-danger" @click="removeOpsi(index,option.id)"><i class="fas fa-minus"></i></b-link></td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr><td class="text-center" colspan="3">Belum ada opsi untuk produk ini</td></tr>
                </tbody>
              </table>
            </b-card>
            <div class="clearfix">&nbsp;</div>
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
          <div class="clearfix">&nbsp;</div>

          <!-- list harga -->
          <p><strong>List Harga</strong></p>
          <div>
            <b-card  header-tag="header" class="w-100">
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
                <tbody v-if="editHarga.length !== 0">
                  <tr v-for="(option, index) in editHarga">
                    <td>{{ option.harga.currency }} {{option.harga.nominal}}</td>
                    <td class="text-center">{{ option.mulai.date | toDateTime }}  </td>
                    <td class="text-center">{{ option.hingga.date | toDateTime }}  </td>
                    <td class="text-center">{{ option.pengaturan.penetapan.satuan }}</td>
                    <td class="text-center">{{ option.pengaturan.penetapan.bundle }}</td>
                    <td class="pt-3" style="width: 10%;"><b-link class="text-danger" @click="removeHarga(index, option.id)"><i class="fas fa-minus"></i></b-link></td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr><td colspan="4" class="text-center">Belum ada harga untuk produk ini</td></tr>
                </tbody>
              </table>
            </b-card>
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
                <b-col cols="12"><p class="mt-2 mb-0"><u><strong>Penetapan</strong></u></p></b-col>
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
          <div class="clearfix">&nbsp;</div>          
          <div class="clearfix">&nbsp;</div>
           <!-- keyword -->
          <p><strong>Keyword</strong></p>
          <div>
            <b-card header-tag="header" class="w-100">
              <table class="table">
                <thead>
                  <tr>
                    <th class="border-top-0 text-center">Word</th>
                    <th class="border-top-0 text-center">Tag</th>
                    <th class="border-top-0"></th>
                  </tr>
                </thead>
                <tbody v-if="editKeyword.length !== 0">
                  <tr v-for="(option, index) in editKeyword">
                    <td class="text-center"><b-badge>{{option.word}}</b-badge></td>
                    <td class="text-center"><b-badge>{{option.tag}}</b-badge></td>
                    <td style="width: 10%;"><b-link class="text-danger" @click="removeKeyword(index, option.id)"><i class="fas fa-minus"></i></b-link></td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr><td class="text-center" colspan="3">Belum ada opsi untuk produk ini</td></tr>
                </tbody>
              </table>
            </b-card>
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
                          <SelectKategori @SELECTED="SelectedKategori"></SelectKategori>
                        </b-form-group>
                      </b-col>
                      <b-col cols="12" md="8">
                        <b-form-group label="Tag">
                          <b-form-input type="text" v-model="tag" readonly></b-form-input>
                        </b-form-group>
                      </b-col>
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </b-modal>
          <div class="clearfix">&nbsp;</div>
        </div>
        <div class="clearfix">&nbsp;</div>
        <template>
          <b-button type="submit" variant="primary" block @click="onSubmit">Simpan</b-button>
        </template>
        <template>
          <b-button type="button" v-b-modal="'warning'" data-target="#warning" data-toggle="modal" variant="danger" block>Hapus Produk</b-button>
        </template>
      </b-media>
    </b-card>
    <!-- Modal -->
   <b-modal id="warning" title="Hapus Katalog" size="lg" @ok="onDelete" ok-title="Hapus" ok-variant="danger" cancel-variant="light" no-close-on-backdrop>
      <b-container>
        <div>
          Anda yakin untuk menghapus ?
        </div>
      </b-container>
    </b-modal>
  </div>

  
</template>

<script>
import SelectKategori from '~/components/katalog/produk/select_kategori'
import CatalogQuery from '~/apollo/queries/query_produk'
import UpdateKatalog from '~/apollo/mutations/UpdateProduk'
import moment from 'moment'
import 'moment/locale/id'
export default {
  props: {
    dataFilter: {
      type: Object,
      default: function () {
        return {}
      }
    },
    defaultData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: { SelectKategori },
  apollo: {
    // -----------------------------------------------------------------------------------------------------------------------
    // TO MODIFY
    // -----------------------------------------------------------------------------------------------------------------------
    $client: 'customer'
    // -----------------------------------------------------------------------------------------------------------------------
    // END TO MODIFY
    // -----------------------------------------------------------------------------------------------------------------------
  },
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
      table: {
        data: [],
        filter: {}
      },
      tenantID: '',
      gambar: '',
      upc: '',
      nama: '',
      x: 0,
      tag: 'kategori',
      editUpc: '',
      editGambar: '',
      editNama: '',
      editOpsi: [],
      editHarga: [],
      editKeyword: [],
      tempOpsi: [],
      tempHarga: [],
      tempKeyword: [],
      tempVarian: [],
      hapusOpsi: [],
      hapusKeyword: [],
      hapusHarga: [],
      isStok: false
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    SelectedKategori (data) {
      if (data) {
        this.word = data.nama
      }
    },
    fetch () {
      let vm = this
      vm.table.data = []
      let queryVar = {}
      var tenantTemp = []
      tenantTemp = Object.values(this.$route.query)
      this.tenantID = tenantTemp.join('')
      console.log(this.tenantID)
      queryVar.upc = this.$route.params.upc
      queryVar.tenant_id = this.tenantID

      this.$apollo.query(
        {
          query: CatalogQuery,
          variables: queryVar,
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        vm.gambar = result.data.KATListProduk[0].galeri.thumbnail
        vm.upc = result.data.KATListProduk[0].upc
        vm.nama = result.data.KATListProduk[0].nama
        vm.table.data = result.data.KATListProduk[0]
      }).catch(e => {
        if (e.graphQLErrors && Array.isArray(e.graphQLErrors) && e.graphQLErrors.length) {
          e.graphQLErrors.forEach(function (error) {
            switch (error.code) {
              case 401:
                vm.$nuxt.$router.replace({ path: '/' })
                break

              default:
                vm.$emit('SUBMIT_FAIL', error.code)
                break
            }
          })
        } else if (e.networkError.message) {
          vm.$emit('SUBMIT_ERROR', 'Fail to connect to server')
        }
      })
    },
    onEditClick () {
      console.log('clicked')
      if (this.x === 0) {
        this.x = 1
        this.editUpc = this.upc
        this.editGambar = this.gambar
        this.editNama = this.nama
        for (var indexOpsi in this.table.data.opsi) {
          this.editOpsi.push({
            id: this.table.data.opsi[indexOpsi].id,
            judul: this.table.data.opsi[indexOpsi].judul,
            bundle: {
              kuantitas: this.table.data.opsi[indexOpsi].bundle.kuantitas,
              satuan: this.table.data.opsi[indexOpsi].bundle.satuan
            },
            varian: this.table.data.opsi[indexOpsi].varian
          })
        }
        for (var indexHarga in this.table.data.list_harga) {
          this.editHarga.push({
            id: this.table.data.list_harga[indexHarga].id,
            harga: this.table.data.list_harga[indexHarga].harga,
            hingga: this.table.data.list_harga[indexHarga].hingga,
            mulai: this.table.data.list_harga[indexHarga].mulai,
            pengaturan: this.table.data.list_harga[indexHarga].pengaturan
          })
        }
        for (var indexKey in this.table.data.list_keyword) {
          this.editKeyword.push({
            id: this.table.data.list_keyword[indexKey].id,
            word: this.table.data.list_keyword[indexKey].word,
            tag: this.table.data.list_keyword[indexKey].tag
          })
        }
      } else {
        this.x = 0
        this.editUpc = ''
        this.editGambar = ''
        this.editNama = ''
        this.editOpsi = []
        this.editHarga = []
        this.editKeyword = []
      }
    },
    removeOpsi (idx, id) {
      this.editOpsi.splice((idx), 1)
      this.hapusOpsi.push(id)
    },
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
    saveOpsi () {
      this.tempOpsi.push({
        judul: this.judul,
        bundle: {
          kuantitas: this.kuantitas,
          satuan: this.satuan
        },
        varian: this.tempVarian
      })
      this.editOpsi.push({
        judul: this.judul,
        bundle: {
          kuantitas: this.kuantitas,
          satuan: this.satuan
        },
        varian: this.tempVarian
      })
      this.tempVarian = []
      this.judul = ''
      this.kuantitas = 0
      this.satuan = ''
    },
    saveHarga () {
      this.tempHarga.push({
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
      this.editHarga.push({
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
    },
    removeHarga (idx, id) {
      this.editHarga.splice((idx), 1)
      this.hapusHarga.push(id)
    },
    removeKeyword (idx, id) {
      this.editKeyword.splice((idx), 1)
      this.hapusKeyword.push(id)
    },
    saveKeyword () {
      this.tempKeyword.push({
        word: this.word,
        tag: this.tag
      })
      this.editKeyword.push({
        word: this.word,
        tag: this.tag
      })
      this.word = ''
    },
    onSubmit (e) {
      // this.x = 0
      let vm = this

      e.preventDefault()
      vm.isLoading = true
      vm.$validator.validateAll()
      if (vm.errors.count() === 0) {
        vm.transformedData = {
          tenant_id: this.tenantID,
          upc: this.editUpc,
          updateBarang: {
            nama: this.editNama,
            galeri: {
              thumbnail: this.editGambar
            },
            pengaturan: {
              is_stok: this.isStok
            }
          },
          tambahOpsi: this.tempOpsi,
          hapusOpsi: this.hapusOpsi,
          tambahHarga: this.tempHarga,
          hapusHarga: this.hapusHarga,
          tambahKeyword: this.tempKeyword,
          hapusKeyword: this.hapusKeyword
        }
        console.log('yes submit')
        vm.$apollo.mutate({
          mutation: UpdateKatalog,
          variables: vm.transformedData
        }).then(function (res) {
          console.log('SUCCESS')
          vm.isLoading = false
          //  + vm.transformedData.upc, query: vm.transformedData.tenant_id
          window.location.reload()
        }).catch(function (e) {
          console.log(e)
          vm.$emit('FAIL', e)
          vm.isLoading = false
        })
      } else {
        console.log('gagal submit')
        console.log(vm.errors)
        vm.isLoading = false
      }
    },
    onDelete (e) {
      let vm = this
      console.log('delete')
      e.preventDefault()
      vm.isLoading = true
      vm.$validator.validateAll()
      if (vm.errors.count() === 0) {
        vm.transformedData = {
          tenant_id: this.tenantID,
          upc: this.editUpc,
          hapusBarang: true
        }
        console.log('yes submit')
        vm.$apollo.mutate({
          mutation: UpdateKatalog,
          variables: vm.transformedData
        }).then(function (res) {
          console.log('SUCCESS')
          vm.isLoading = false
          //  + vm.transformedData.upc, query: vm.transformedData.tenant_id
          window.location.reload()
        }).catch(function (e) {
          console.log(e)
          vm.$emit('FAIL', e)
          vm.isLoading = false
        })
      } else {
        console.log('gagal submit')
        console.log(vm.errors)
        vm.isLoading = false
      }
    }
  }
}
</script>