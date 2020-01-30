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
            <a href="#" aria-current="page" class="">Dashboard</a>
          </li>
        </ul>
      </nav>

      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="title">
              <b-icon icon="view-dashboard" size="is-medium"> </b-icon>
              Dashboard
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
        Crear Master
      </b-button>

      <b-modal
        :active.sync="isComponentModalActive"
        has-modal-content-width
        trap-focus
        aria-role="dialog"
        aria-modal
      >
        <RegistroMaster
          @cerrarmodal="isComponentModalActive = false"
        ></RegistroMaster>
      </b-modal>

      <b-modal
        :active.sync="flag_modal_editar"
        has-modal-content-width
        trap-focus
        aria-role="dialog"
        aria-modal
      >
        <EditMaster
          :edituser="edituser"
          @cerrarmodal="flag_modal_editar = false"
        ></EditMaster>
      </b-modal>

      <b-table
        :data="isEmpty ? [] : anfitriones"
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
            {{ props.row.correo }}
          </b-table-column> -->

          <b-table-column field="first_name" label="Correo">
            {{ props.row.correo }}
          </b-table-column>

          <b-table-column field="last_name" label="Username">
            {{ props.row.username }}
          </b-table-column>
          <b-table-column field="last_name" label="Edad">
            {{ props.row.edad }}
          </b-table-column>
          <b-table-column field="last_name" label="Ciudad">
            {{ props.row.ciudad }}
          </b-table-column>
          <b-table-column field="last_name" label="Dirección">
            {{ props.row.direccion }}
          </b-table-column>
          <b-table-column field="last_name" label="Teléfono">
            {{ props.row.telefono }}
          </b-table-column>
          <b-table-column field="actions" label="actions">
            <button
              class="button is-small is-light"
              @click="aprobar(props.row)"
              style="background-color:transparent; margin-right:5%"
            >
              <b-icon
                icon="check-circle"
                type="is-success"
                size="is-medium"
              ></b-icon>
            </button>
            <!-- <button
              class="button is-small is-light"
              @click="eliminar(props.row)"
              style="background-color:transparent"
            >
              <b-icon
                icon="delete-circle"
                type="is-danger"
                size="is-medium"
              ></b-icon>
            </button> -->
          </b-table-column>
        </template>
      </b-table>
    </main>
  </div>
</template>

<script>
// import RegistroMaster from '~/components/ModalsForms/Master/RegistroMaster'
// import EditMaster from '~/components/ModalsForms/Master/EditMaster'
// import BorrarMaster from '~/components/ModalsForms/Master/BorrarMaster'

import { mapActions, mapState } from 'vuex'
export default {
  layout: 'master',

  components: {
    // RegistroMaster,
    // EditMaster
  },
  computed: {
    ...mapState({
      anfitriones: state => state.bash_master.anfitriones
    })
  },

  methods: {
    ...mapActions({
      get_anfitriones: 'bash_master/get_anfitriones',
      // get_masters: 'bash_master/get_masters',
      aprobarmaster: 'bash_master/aprobarmaster'
    }),
    async aprobar(anfitriones) {
      this.$swal({
        type: 'info',
        title: '¿Desea Aprobar el Anfitrión?',
        text: anfitriones.username,
        confirmButtonText: 'Ok'
      })
        .then(async () => {
          await this.aprobarmaster(anfitriones)
          await this.get_anfitriones()
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
    this.get_anfitriones()
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
