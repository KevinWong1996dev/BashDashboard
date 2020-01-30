<template>
  <!-- <div class="column">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          {{ title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          <b-icon
            :icon="icon"
            size="is-large"
            type="is-primary"
          />
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <span>
            <slot />
          </span>
        </div>
      </footer>
    </div>
  </div> -->
  <div class="column">
    <div :class="'box notification ' + fondo">
      <div class="heading">{{ titulo }}</div>
      <div class="title">{{ valor }}</div>
      <div class="level">
        <div class="level-item">
          <div class="">
            <div class="heading">{{ subtitulo }}</div>
            <div class="title is-5">{{ valor }}</div>
          </div>
        </div>
        <div class="level-item">
          <div class="">
            <div class="heading">Returns $</div>
            <div class="title is-5">106K</div>
          </div>
        </div>
        <div class="level-item">
          <div class="">
            <div class="heading">Success %</div>
            <div class="title is-5">+ 28,5%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['titulo', 'subtitulo', 'valor', 'fondo']
}
</script>
