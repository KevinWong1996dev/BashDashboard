<template>
  <div class="container-fluid">
    <main class="column main">
      <nav class="breadcrumb is-small" aria-label="breadcrumbs">
        <ul>
          <li>
            <nuxt-link to="/home" style="color: #FF4DB8">
              Home
            </nuxt-link>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page" class="">Mi perfil</a>
          </li>
        </ul>
      </nav>

      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="title">
              <b-icon icon="view-dashboard" size="is-medium"> </b-icon>
              Editar mi perfil
            </div>
          </div>
        </div>
        <!-- <div class="level-right">
          <div class="level-item">
            <button type="button" class="button is-small">
              March 8, 2017 - April 6, 2017
            </button>
          </div>
        </div> -->
      </div>

      <b-button type="" style="margin-bottom:20px" @click="foto_cedula = true">
        Subir Cédula
      </b-button>
      <b-modal
        :active.sync="foto_cedula"
        has-modal-content-width
        trap-focus
        aria-role="dialog"
        aria-modal
      >
        <FotoCedula @cerrarmodal="foto_cedula = false"></FotoCedula>
      </b-modal>
      <div class="field-body">
        <div class="field has-text-centered">
          <label class="label">Cédula Frontal</label>
          <div class="control is-flex is-horizontal-center">
            <img class="image is-128x128" :src="info_cedula.frontal" />
          </div>
        </div>

        <div class="field has-text-centered">
          <label class="label">Cédula Posterior</label>
          <div class="control is-flex is-horizontal-center">
            <img class="image is-128x128" :src="info_cedula.posterior" />
          </div>
        </div>
      </div>
      <form @submit.prevent="editar">
        <div class="field-body">
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input
                v-model="anfitrion.username"
                class="input is-medium "
                type="text"
                placeholder="Ingresa nuevo Username"
                autofocus=""
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Edad</label>
            <div class="control">
              <input
                v-model="anfitrion.edad"
                class="input is-medium "
                type="number"
                placeholder="Ingresa tu edad"
              />
            </div>
          </div>
        </div>

        <div class="field-body">
          <div class="field">
            <label class="label">Banco</label>
            <div class="control">
              <input
                v-model="anfitrion.banco"
                class="input is-medium "
                type="text"
                placeholder="Ingresa nombre de Banco"
                autofocus=""
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Nº De Cuenta</label>
            <div class="control">
              <input
                v-model="anfitrion.cuenta_bancaria"
                class="input is-medium "
                type="number"
                placeholder="Ingresa tu numero de cuenta"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Tipo De Cuenta</label>
            <div class="control">
              <input
                v-model="anfitrion.tipo_cuenta"
                class="input is-medium "
                type="text"
                placeholder="Ahorros o Corriente"
              />
            </div>
          </div>
        </div>

        <div class="field-body">
          <div class="field">
            <label class="label">Teléfono</label>
            <div class="control">
              <input
                v-model="anfitrion.telefono"
                class="input is-medium "
                type="number"
                placeholder="Ingresa tu número"
                autofocus=""
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Ciudad</label>
            <div class="control">
              <input
                v-model="anfitrion.ciudad"
                class="input is-medium "
                type="text"
                placeholder="Ingresa tu Ciudad"
                autofocus=""
              />
            </div>
          </div>
        </div>

        <div class="field-body">
          <div class="field">
            <label class="label">Dirección</label>
            <div class="control">
              <input
                v-model="anfitrion.direccion"
                class="input is-medium "
                type="text"
                placeholder="Ingresa tu Dirección"
              />
            </div>
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <div class="field">
            <label class="checkbox">
              <input type="checkbox" />
              Acepto los
              <a href="../terminos.vue" target="_blank"
                >Terminos y Condiciones</a
              >
            </label>
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <button class="button is-medium  has-text-white">
            Editar
          </button>
        </div>

        <!-- <nuxt-link
                style="margin-top:10px"
                class="button is-block is-large is-fullwidth has-text-white is-rounded"
                to="/"
                >Regresar</nuxt-link
              > -->
      </form>
    </main>
  </div>
</template>

<script>
import FotoCedula from '~/components/ModalsForms/Eventos/FotoCedula'

import { mapActions, mapState } from 'vuex'
export default {
  components: {
    FotoCedula
  },
  data() {
    return {
      anfitrion: {
        correo: '',
        clave: '',
        username: '',
        edad: '',
        cuenta_bancaria: '',
        tipo_cuenta: '',
        banco: '',
        ciudad: '',
        direccion: '',
        telefono: ''
      },
      foto_cedula: false,
      flag_modal_editar: false,
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true
    }
  },
  layout: 'anfitrion',
  computed: {
    ...mapState({
      info_cedula: state => state.bash.info_cedula
    })
  },

  methods: {
    ...mapActions({
      get_anfitriones: 'bash/get_anfitriones',
      editar_anfitrion: 'bash/editar_anfitrion'
    }),
    async editar() {
      await this.editar_anfitrion(this.anfitrion)
        .then(result => {
          this.get_anfitriones()
          this.$swal({
            type: 'success',
            title: 'Correcto',
            text: result.data.message,
            confirmButtonText: 'Ok'
          }).then(() => {
            this.$emit('cerrarmodal')
          })
        })
        .catch(error => {
          this.$swal({
            type: 'error',
            title: 'Intente de nuevo',
            text: error.message,
            confirmButtonText: 'Ok'
          })
        })
    },
    changed() {
      this.$emit('changed', this.anfitrion)
    },
    created() {
      this.get_informacion()
    },

    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },
    /*
     * Handle sort event
     */
    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order
      this.loadAsyncData()
    }
  },

  name: 'HomePage'
}
</script>

<style scoped>
button {
  background-color: #ffd04d;
  color: white;
}

.modal-card {
  width: 100px !important;
}

input[type='email'],
input[type='password'],
input[type='text'],
input[type='number'] {
  /* background-color: #e8e8e8;
  color: black; */
  margin-bottom: 25px !important;
}

.is-horizontal-center {
  justify-content: center;
}

.is-128x128 {
  height: 200px !important;
  width: 260px !important;
}
</style>
