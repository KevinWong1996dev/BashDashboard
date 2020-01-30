<template>
  <form>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar Administrador</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Nombres Completos">
          <b-input
            v-model="administrador.nombres"
            class="is-large"
            type="text"
            placeholder="Nombres"
            required
            autofocus
          >
          </b-input>
        </b-field>

        <b-field label="Email">
          <b-input
            v-model="administrador.correo"
            class=" is-large"
            type="email"
            placeholder="Correo"
            required
            autofocus
          >
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            v-model="administrador.clave"
            class=" is-large"
            type="password"
            password-reveal
            placeholder="Contraseña"
            required
            autofocus
          >
          </b-input>
        </b-field>

        <b-field label="Local">
          <b-select
            v-model="administrador.id_local"
            placeholder="Elija un local"
          >
            <option
              v-for="option in locales"
              :value="option.id_local"
              :key="option.id_local"
            >
              {{ option.nombres }}
            </option>
          </b-select>
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
import { mapActions, mapState } from 'vuex'

export default {
  props: ['editadmin'],
  data() {
    return {
      administrador: {
        nombres: '',
        correo: '',
        clave: '',
        id_local: ''
      }
    }
  },
  computed: {
    ...mapState({
      locales: state => state.nelsongo.locales
    })
  },
  methods: {
    ...mapActions({
      get_locales: 'nelsongo/get_locales',
      get_administradores: 'nelsongo/get_administradores',
      editar_administrador: 'nelsongo/editar_administrador'
    }),
    async editar() {
      await this.editar_administrador(this.administrador)
        .then(result => {
          this.get_administradores()
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
    convertir_base64(file) {
      let reader = new FileReader()
      // read the file into a base64 format
      reader.readAsDataURL(file)

      return new Promise((resolve, reject) => {
        reader.onerror = () => {
          reader.abort()
          reject('Insert error message here')
        }

        // return the base 64 string
        reader.onload = function() {
          let n = reader.result.search('base64,')
          resolve(reader.result.substring(n + 7))
        }
      })
    }
  },
  created() {
    this.administrador = this.editadmin
  }
}
</script>
