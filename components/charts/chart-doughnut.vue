<template>
  <div class="card is-shadowless" style="background-color:transparent">
    <div class="card-body">
      <h2
        class="card-title has-text-centered is-size-3"
        style="margin-bottom:5px"
      >
        Ventas por Categoría
      </h2>
    </div>

    <div class="card-img-bottom">
      <chartjs-doughnut
        :bind="true"
        :datasets="datasets"
        :labels="labels"
        :option="option"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datasets: [
        {
          data: [10, 20, 40],
          backgroundColor: ['#f36e60', '#ffdb3b', '#185190'],
          hoverBackgroundColor: ['#fbd2cd', '#fef5c9', '#d1e3f7']
        }
      ],
      labels: ['Verduras', 'Frutas', 'Lácteos'],
      option: {}
    }
  }
}
</script>

<style scoped>
div.card {
  background-color: transparent !important;
}
</style>
