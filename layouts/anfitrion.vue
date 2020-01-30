<template>
  <div class="container-fluid">
    <Header></Header>
    <section class="main-content columns">
      <Aside></Aside>
      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import Header from '~/components/Header/Header_anfitrion'
import Aside from '~/components/Aside/Aside_anfitrion'
export default {
  components: {
    Header,
    Aside
  }
}
</script>
<style scoped>
.container.column.is-10 {
  background-color: #fbfcfc;
}
</style>
