<template>
  <form>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Crear Evento</p>
      </header>
      <section class="modal-card-body">
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

        <b-field label="Fecha y Hora del Evento">
          <VueCtkDateTimePicker v-model="evento.fecha" />
        </b-field>

        <b-field class="file">
          <b-upload v-model="evento.imagen">
            <a class="button is-primary">
              <b-icon icon="upload"></b-icon>
              <span>Subir imagen del Evento</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="evento.imagen">
            {{ evento.imagen.name }}
          </span>
        </b-field>

        <b-field class="field-body">
          <div class="field">
            <label class="label">Distribucion de Alcohol</label>
            <b-checkbox
              v-model="evento.es_da"
              true-value="true"
              false-value="false"
            >
              {{ evento.es_da == 'true' ? 'Si' : 'No' }}
            </b-checkbox>
          </div>
          <div class="field">
            <label class="label">Limite de Edad</label>
            <b-checkbox
              v-model="evento.es_18"
              true-value="true"
              false-value="false"
            >
              {{ evento.es_18 == 'true' ? 'Si' : 'No' }}
            </b-checkbox>
          </div>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button" type="button" @click="registro()">Crear</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['isComponentModalActive'],
  data() {
    return {
      evento: {
        nombre: '',
        descripcion: '',
        fecha: '',
        imagen: {
          name: ''
        },
        es_da: 'false',
        es_18: 'false'
      },
      file: null
    }
  },
  methods: {
    ...mapActions({
      get_eventos: 'bash/get_eventos',
      crear_evento: 'bash/crear_evento'
    }),
    async registro() {
      this.evento.imagen
      await this.crear_evento(this.evento)
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
            text: errors.imagen,
            confirmButtonText: 'Ok'
          })
        })
    }
  },
  watch: {
    evento: val => {
      console.log('entro')
      if (val.es_18 == 'true') {
        console.log('cambiio')
        this.evento.es_18 = 'true'
      }
    }
  }
}
</script>
