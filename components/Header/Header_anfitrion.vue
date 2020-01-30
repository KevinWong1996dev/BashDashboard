<template>
  <nav
    class="navbar header has-shadow "
    role="navigation"
    style="background-color:#db1624"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="~static/logo.png" alt="Buefy" height="28" />
      </a>

      <nuxt-link
        class="navbar-item is-tab is-hidden-mobile is-active"
        style="background-color:#fff"
        to="/anfitrion-eventos"
        ><b-icon icon="home"> </b-icon> <span>Home</span></nuxt-link
      >

      <!-- <a
        class="navbar-item is-tab is-hidden-mobile"
        href="https://github.com/mazipan/bulma-admin-dashboard-template"
        >Github</a
      >
      <a
        class="navbar-item is-tab is-hidden-mobile"
        href="https://mazipan.github.io/bulma-resume-template/"
        >Resume Template</a
      > -->
      <!-- <a class="navbar-item is-tab is-hidden-mobile" href="#about">About</a> -->

      <div class="navbar-burger">
        <span />
        <span />
        <span />
      </div>
    </div>
    <div class="navbar-menu navbar-end" id="navMenu">
      <!-- <a class="navbar-item is-tab is-hidden-tablet is-active">Home</a>
      <a
        class="navbar-item is-tab is-hidden-tablet"
        href="https://github.com/mazipan/bulma-admin-dashboard-template"
        >Github</a
      >
      <a
        class="navbar-item is-tab is-hidden-tablet"
        href="https://mazipan.github.io/bulma-resume-template/"
        >Resume Template</a
      >
      <a class="navbar-item is-tab is-hidden-tablet" href="#about">About</a> -->
      <div v-show="!sessionFlag" class="navbar-item">
        <div class="buttons">
          <!-- <nuxt-link class="button " to="/"
            ><strong>Iniciar Sesión</strong></nuxt-link
          > -->

          <!-- <nuxt-link class="button is-link is-rounded" to="/registro"
            ><strong>Registrar</strong></nuxt-link
          > -->
        </div>
      </div>

      <div v-show="sessionFlag" class="navbar-item ">
        <!-- <a class="navbar-item nav-tag">
          <b-icon icon="email" class="has-text-white"> </b-icon>
          <span class="tag tag-notif">6</span>
        </a> -->

        <div
          class="navbar-item has-dropdown is-hoverable"
          style="background-color:#db1624"
        >
          <a class="navbar-link has-text-black">
            <!-- <figure class="image is-32x32" style="margin-right:.5em;">
              <img
                src="https://avatars1.githubusercontent.com/u/7221389?v=4&s=32"
              />
            </figure> -->
            {{ info_anfitrion.username }}
          </a>

          <div class="navbar-dropdown is-right">
            <p class="navbar-item">
              <span class="icon is-small">
                <b-icon icon="account" size="is-medium"> </b-icon>
              </span>
              &nbsp; {{ info_anfitrion.username }}<br />
              &nbsp;{{ info_anfitrion.correo }}
            </p>
            <hr class="navbar-divider" />
            <a class="navbar-item" @click="on_cerrar_sesion">
              <span class="icon is-small">
                <b-icon icon="power-settings"> </b-icon>
              </span>
              &nbsp; Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      sessionFlag: state => state.bash.sessionFlag,
      info_anfitrion: state => state.bash.info_anfitrion
    })
  },
  methods: {
    ...mapMutations({
      cambiar_seccion: 'bash/cambiar_seccion',
      cerrar_sesion: 'bash/cerrar_sesion'
    }),

    ...mapActions({}),
    on_cerrar_sesion() {
      this.cerrar_sesion()
      this.$router.push('/anfitrion')
    },
    on_seccion(seccion) {
      this.cambiar_seccion(seccion)
    }
  }
}
</script>
<style scoped>
.navbar-item img {
  max-height: 2.75rem;
}

.navbar,
.navbar-link {
  background-color: #fff !important;
}

.is-active.nuxt-link-active {
  background-color: #fff !important;
  color: white;
  border-bottom-color: #fff;
}

.tag {
  background-color: #fff !important;
  color: white;
}
.button {
  background-color: #fff !important;
  color: white;
}

.navbar-link:not(.is-arrowless)::after {
  border-color: #000;
}

.navbar-item.is-tab.is-active {
  background-color: transparent;
  border-bottom-color: black !important;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  color: black !important;
  padding-bottom: calc(0.5rem - 3px);
}

.icon {
  padding-right: 5px;
}
</style>
