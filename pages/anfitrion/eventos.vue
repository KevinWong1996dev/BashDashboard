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
            <a href="#" aria-current="page" class="">Eventos</a>
          </li>
        </ul>
      </nav>

      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="title">
              <b-icon icon="view-dashboard" size="is-medium"> </b-icon>
              Eventos
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

      <b-button
        type=""
        style="margin-bottom:20px"
        @click="isComponentModalActive = true"
      >
        Crear Eventos
      </b-button>

      <b-modal
        :active.sync="isComponentModalActive"
        has-modal-content-width
        trap-focus
        aria-role="dialog"
        aria-modal
      >
        <RegistroEventos
          @cerrarmodal="isComponentModalActive = false"
        ></RegistroEventos>
      </b-modal>

      <b-modal
        :active.sync="flag_modal_editar"
        has-modal-content-width
        trap-focus
        aria-role="dialog"
        aria-modal
      >
        <EditEventos
          :edituser="edituser"
          @cerrarmodal="flag_modal_editar = false"
        ></EditEventos>
      </b-modal>

      <b-table
        :data="isEmpty ? [] : eventos"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :hoverable="isHoverable"
        :loading="isLoading"
        :focusable="isFocusable"
        :mobile-cards="hasMobileCards"
      >
        <template slot-scope="props">
          <!-- <b-table-column field="id" label="ID" width="40" numeric>
            {{ props.row.nombre }}
          </b-table-column> -->

          <b-table-column field="first_name" label="Evento">
            {{ props.row.nombre }}
          </b-table-column>

          <b-table-column field="last_name" label="Descripcion">
            {{ props.row.descripcion }}
          </b-table-column>
          <b-table-column field="last_name" label="Fecha">
            {{ props.row.fecha }}
          </b-table-column>

          <b-table-column field="last_name" label="Hora">
            {{ props.row.hora }}
          </b-table-column>

          <b-table-column field="last_name" label="Alcohol">
            {{ props.row.es_da }}
          </b-table-column>

          <b-table-column field="last_name" label="+18">
            {{ props.row.es_18 }}
          </b-table-column>

          <b-table-column field="last_name" label="Imagen">
            <img class="image is-128x128" :src="props.row.imagen" />
          </b-table-column>

          <!-- <b-table-column field="last_name" label="Hora">
            {{ props.row.hora }}
          </b-table-column> -->
          <b-table-column field="actions" label="actions">
            <button
              class="button is-small is-light"
              @click="editar(props.row)"
              style="background-color:transparent; margin-right:5%"
            >
              <b-icon
                icon="account-edit"
                type="is-danger"
                size="is-medium"
              ></b-icon>
            </button>
            <button
              class="button is-small is-light"
              @click="eliminar(props.row)"
              style="background-color:transparent"
            >
              <b-icon icon="delete" type="is-danger" size="is-medium"></b-icon>
            </button>
          </b-table-column>
        </template>
      </b-table>
    </main>
  </div>
</template>

<script>
import RegistroEventos from '~/components/ModalsForms/Eventos/RegistroEventos'
import EditEventos from '~/components/ModalsForms/Eventos/EditEventos'

import { mapActions, mapState } from 'vuex'
export default {
  layout: 'anfitrion',
  components: {
    RegistroEventos,
    EditEventos
  },
  computed: {
    ...mapState({
      eventos: state => state.bash.eventos,
      info_anfitrion: state => state.bash.info_anfitrion
    })
  },

  methods: {
    ...mapActions({
      get_eventos: 'bash/get_eventos',
      get_informacion: 'bash/get_informacion',
      eliminarevento: 'bash/eliminarevento'
    }),
    async eliminar(eventos) {
      this.$swal({
        type: 'info',
        title: '¿Desea Eliminar el Evento?',
        text: eventos.nombre,
        confirmButtonText: 'Ok'
      })
        .then(async () => {
          await this.eliminarevento(eventos)
            .then(result => {
              this.get_eventos()
              this.$swal({
                type: 'success',
                title: 'Correcto',
                text: result.data.message,
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancelar'
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
          await this.get_eventos()
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

    async editar(eventos) {
      this.edituser = JSON.parse(JSON.stringify(eventos))
      this.flag_modal_editar = true
    },

    /*
     * Handle page-change event
     */
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
  created() {
    this.get_eventos()
    this.get_informacion()
  },

  data() {
    return {
      isComponentModalActive: false,
      flag_modal_editar: false,
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true,
      edituser: []
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
</style>
