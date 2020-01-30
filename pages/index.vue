<template>
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <figure class="image is-128x128 is-inline-block is-marginless	">
          <img class="" src="../static/1.gif" />
        </figure>

        <div class="column is-4 is-offset-4">
          <h2 class="title is-size-2 has-text-white">Login Master</h2>

          <p class="subtitle is-size-4 has-text-white">Ingresa a tu cuenta</p>
          <div class="box">
            <form @submit.prevent="login">
              <div class="field">
                <div class="control">
                  <input
                    v-model="master.correo"
                    class="input is-large is-rounded"
                    type="email"
                    placeholder="Your Email"
                    autofocus=""
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    v-model="master.clave"
                    class="input is-large is-rounded"
                    type="password"
                    placeholder="Your Password"
                  />
                </div>
              </div>

              <button
                @click="login"
                class="button is-block is-large is-fullwidth has-text-white is-rounded"
              >
                Login
              </button>

              <!-- <nuxt-link
                style="margin-top:10px"
                class="button is-block is-large is-fullwidth has-text-white is-rounded"
                to="/"
                >Regresar</nuxt-link
              > -->
            </form>
          </div>
          <!-- <p class="has-text-white">
            &nbsp;·&nbsp;
            <nuxt-link
              style="margin-top:10px"
              class="has-text-white"
              to="registro"
              >Registrarme</nuxt-link
            >
            &nbsp;·&nbsp; -->

            <!-- <nuxt-link
              style="margin-top:10px"
              class="has-text-white"
              to="recuperar_contraseña"
              >Olvidé mi contraseña</nuxt-link
            > -->
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'login',
  data: () => {
    return {
      master: {
        correo: 'kevin@gmail.com',
        clave: 'qwer1234'
      }
    }
  },

  methods: {
    ...mapActions({
      login_master: 'bash_master/login_master'
    }),
    async login() {
      await this.login_master(this.master)
        .then(result => {
          this.$router.push('/home')
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
  margin: 10px !important;
}

.box {
  background-color: inherit;
  border: none;
  padding: 0%;
  box-shadow: none;
}

.column {
  padding: 0px;
  margin-top: 20px;
}
.hero {
  background-image: url(../static/bg.png);
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

input[type='email'],
input[type='password'] {
  background-color: #e8e8e8;
  color: black;
  margin-bottom: 10px;
}
</style>
