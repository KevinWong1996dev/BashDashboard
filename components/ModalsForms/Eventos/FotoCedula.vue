<template>
  <form>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Foto de Cédula</p>
      </header>
      <section class="modal-card-body">
        <div class="field-body">
          <div class="field">
            <label class="label">Imagen Cédula Frontal</label>
            <b-field class="file">
              <b-upload v-model="anfitrion.imagen_frontal">
                <a class="button is-primary">
                  <b-icon icon="upload"></b-icon>
                  <span>Subir Foto</span>
                </a>
              </b-upload>
              <span class="file-name" v-if="anfitrion.imagen_frontal">
                {{ anfitrion.imagen_frontal.name }}
              </span>
            </b-field>
          </div>

          <div class="field">
            <label class="label">Imagen Cédula Posterior</label>
            <b-field class="file">
              <b-upload v-model="anfitrion.imagen_posterior">
                <a class="button is-primary">
                  <b-icon icon="upload"></b-icon>
                  <span>Subir Foto</span>
                </a>
              </b-upload>
              <span class="file-name" v-if="anfitrion.imagen_posterior">
                {{ anfitrion.imagen_posterior.name }}
              </span>
            </b-field>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button" type="button" @click="Subir()">
          Subir Foto
        </button>
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
      anfitrion: {
        imagen_frontal: {
          name: ''
        },
        imagen_posterior: {
          name: ''
        }
      },
      file: null
    }
  },
  methods: {
    ...mapActions({
      get_informacion: 'bash/get_informacion',
      subir_cedula: 'bash/subir_cedula'
    }),
    async Subir() {
      this.anfitrion.imagen_frontal
      this.anfitrion.imagen_posterior
      await this.subir_cedula(this.anfitrion)
        .then(result => {
          this.get_informacion()
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
  }
}
</script>
