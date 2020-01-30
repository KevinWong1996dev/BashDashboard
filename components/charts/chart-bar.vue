<template>
  <div class="card is-shadowless" style="background-color:transparent">
    <div class="card-body">
      <h2
        class="card-title has-text-centered is-size-3"
        style="margin-bottom:5px"
      >
        Ventas mensuales
      </h2>
    </div>

    <div class="card-img-bottom">
      <chartjs-bar
        v-for="(item, index) in types"
        :key="index"
        :backgroundcolor="item.bgColor"
        :beginzero="beginZero"
        :bind="true"
        :bordercolor="item.borderColor"
        :data="item.data"
        :datalabel="item.dataLabel"
        :labels="labels"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      beginZero: true,
      labels: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic'
      ],
      types: [
        // {
        //   bgColor: '#de98ab',
        //   borderColor: '0c0306',
        //   data: [1, 3, 5, 7, 2, 4, 6],
        //   dataLabel: 'Bar'
        // },
        {
          bgColor: '#98ddde',
          borderColor: '030c0c',
          data: [1, 5, 2, 6, 3, 7, 4, 5, 2, 6, 11, 12],
          dataLabel: 'Ventas'
        }
      ]
    }
  }
}
</script>
