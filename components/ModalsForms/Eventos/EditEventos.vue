<template>
  <form>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar Eventos</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Fecha y Hora del Evento">
          <VueCtkDateTimePicker v-model="evento.fecha" />
        </b-field>

        <b-field label="Nombre del Evento">
          <b-input
            v-model="evento.nombre"
            class="is-large"
            type="text"
            placeholder="Nombre del Evento"
            required
            autofocus
          >
          </b-input>
        </b-field>

        <b-field label="Descripción del Evento">
          <b-input
            v-model="evento.descripcion"
            class="is-large"
            type="text"
            placeholder="Descripción"
            required
            autofocus
          >
          </b-input>
        </b-field>

        <b-field label="Distribución de Alcohol">
          <b-checkbox
            v-model="evento.es_da"
            true-value="true"
            false-value="false"
          >
            {{ evento.es_da == 'true' ? 'Si' : 'No' }}
          </b-checkbox>
        </b-field>

        <b-field label="Limite de Edad">
          <b-checkbox
            v-model="evento.es_18"
            true-value="true"
            false-value="false"
          >
            {{ evento.es_18 == 'true' ? 'Si' : 'No' }}
          </b-checkbox>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button" type="button" @click="editar()">Editar</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['edituser'],
  data() {
    return {
      evento: {
        nombre: '',
        descripcion: '',
        fecha: '',
        es_da: 'false',
        es_18: 'false'
      },
      file: null
    }
  },
  methods: {
    ...mapActions({
      get_eventos: 'bash/get_eventos',
      editar_evento: 'bash/editar_evento'
    }),
    async editar() {
      await this.editar_evento(this.evento)
        .then(result => {
          this.get_eventos()
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
      this.$emit('changed', this.evento)
    }
  },
  created() {
    this.evento = this.edituser
  }
}
</script>

<style scoped></style>
