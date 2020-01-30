<template>
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <figure class="image is-128x128 is-inline-block is-marginless	">
              <img class="" src="../static/logo.png" />
            </figure>
            <h3 class="title has-text-black">Cuenta Validada con Éxito</h3>
            <hr class="login-hr" />
            <p class="subtitle has-text-black">
              Inicie Sesión desde todas nuestras plataformas
            </p>

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
  layout: 'vacio'
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
</style>
