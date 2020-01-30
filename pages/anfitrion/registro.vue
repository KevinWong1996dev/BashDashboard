<template>
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title is-size-2 has-text-white">Registro</h3>
          <p class="subtitle is-size-4 has-text-white ">Registra tu cuenta</p>
          <div class="box">
            <figure class="image is-128x128 is-inline-block is-marginless	">
              <img class="" src="../../static/1.gif" />
            </figure>
            <form @submit.prevent="registro">
              <div class="field">
                <div class="control">
                  <input
                    v-model="anfitrion.username"
                    class="input is-large is-rounded"
                    type="text"
                    placeholder="Username"
                    autofocus=""
                    required=""
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="anfitrion.correo"
                    class="input is-large is-rounded"
                    type="email"
                    placeholder="Correo"
                    autofocus=""
                    required=""
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="anfitrion.clave"
                    class="input is-large is-rounded"
                    type="password"
                    placeholder="Contraseña"
                    autofocus=""
                    required=""
                  />
                </div>
              </div>

              <button
                class="button is-block has-text-white is-rounded is-large is-fullwidth"
              >
                Registrarme
              </button>

              <nuxt-link
                style="margin-top:10px"
                class="button is-rounded is-block has-text-white is-large is-fullwidth"
                to="/anfitrion"
                >Regresar</nuxt-link
              >
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  layout: 'registro',
  data: () => {
    return {
      anfitrion: {
        username: '',
        correo: '',
        clave: ''
      }
    }
  },

  methods: {
    ...mapActions({
      crear_anfitrion: 'bash/crear_anfitrion'
    }),
    async registro() {
      await this.crear_anfitrion(this.anfitrion)
        .then(result => {
          this.$swal({
            type: 'success',
            title: 'Usuario Registrado',
            text: result.data.message,
            confirmButtonText: 'Ok'
          }).then(() => {
            this.$router.push('/anfitrion')
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
    }
  }
}
</script>
<style scoped>
.is-marginless {
  margin: 0px 0px 25px 0px !important;
}
.column {
  padding: 0px;
}

.box {
  background-color: inherit;
  border: none;
  padding: 0%;
  box-shadow: none;
}

.hero {
  background-image: url(../../static/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.title {
  font-size: 3rem;
}
.is-220x220 {
  width: 220px;
}

.button {
  background-color: #ffd04d;
}
input[type='text'],
input[type='email'],
input[type='password'] {
  background-color: #e8e8e8;
  color: black;
  margin-top: 10px;
}
</style>
