<template>
  <aside class="column is-2 section is-hidden-mobile">
    <p class="menu-label is-hidden-touch">
      General
    </p>
    <ul class="menu-list">
      <li v-for="(item, key) of items" :key="key">
        <nuxt-link :to="item.to" exact-active-class="is-active">
          <b-icon :icon="item.icon" /> {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Anfitriones por Validar',
          icon: 'clipboard-account',
          to: { name: 'home' }
        },
        {
          title: 'Anfitriones Validados',
          icon: 'clipboard-account',
          to: { name: 'anfitriones' }
        }

        // {
        //   title: 'Administradores',
        //   icon: 'cart',
        //   to: { name: 'administradores' }
        // },

        // {
        //   title: 'Categorias',
        //   icon: 'popcorn',
        //   to: { name: 'categorias' }
        // }
      ]
    }
  }
}
</script>
<style scoped>
.is-active.nuxt-link-active {
  background-color: #ffd04d !important;
  color: white;
}
</style>
