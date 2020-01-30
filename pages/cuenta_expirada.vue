<template>
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <figure class="image is-128x128 is-inline-block is-marginless	">
              <img class="" src="../static/logo.png" />
            </figure>
            <h3 class="title has-text-black">Cuenta Expirada</h3>
            <hr class="login-hr" />
            <p class="subtitle has-text-black">
              Ingrese nuevamente su correo para enviarle un nuevo Link
            </p>
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
            <div class="buttons is-centered">
              <!-- <n-link to="login" :prefetch="false" class="button">Iniciar Sesión</n-link> -->

              <nuxt-link
                class="button is-rounded is-block has-text-white is-large is-fullwidth"
                to="/anfitrion"
                >Iniciar Sesión</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'vacio',

  data: () => {
    return {
      anfitrion: {
        correo: ''
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
            title: 'Ingrese a su cuenta',
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

<style>
.is-marginless {
  margin: 10px !important;
}

.hero {
  background-image: url(../static/bg.png);
}

.title {
  font-size: 1.5rem;
}

.button {
  background-color: #ffd04d;
  color: white;
}

input[type='text'],
input[type='email'],
input[type='password'] {
  background-color: #e8e8e8;
  color: black;
  margin-top: 10px;
}
</style>
