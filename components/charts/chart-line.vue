<template>
  <div class="card is-shadowless" style="background-color:transparent">
    <div class="card-body">
      <h2
        class="card-title has-text-centered is-size-3"
        style="margin-bottom:15px"
      >
        Ventas Por Local
      </h2>

      <div class="btn-group btn-group-toggle">
        <label
          v-for="(item, index) in btn"
          :key="index"
          :class="{ active: item.value == radio }"
          class="btn btn-success"
        >
          <input
            v-model="radio"
            :name="dataLabel"
            :value="item.value"
            type="radio"
          />
          {{ item.label }}
        </label>
      </div>
    </div>

    <div class="card-img-bottom">
      <chartjs-line
        :backgroundcolor="bgColor"
        :beginzero="beginZero"
        :bind="true"
        :bordercolor="borderColor"
        :data="data[radio]"
        :datalabel="dataLabel"
        :labels="labels[radio]"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgColor: 'red',
      beginZero: true,
      borderColor: '#81894e',
      btn: [
        { label: 'Hoy', value: 'day' },
        { label: 'Esta Semana', value: 'week' }
      ],
      data: {
        day: [1, 3, 5, 3, 1],
        week: [12, 14, 16, 18, 11, 13, 15]
      },
      dataLabel: 'Ventas',
      labels: {
        day: [4, 3, 12, 14, 16, 20, 3],
        week: ['Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom']
      },
      radio: 'day'
    }
  }
}
</script>
