<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/views/dashboard/mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        // 标题组件
        title: {
          show: true,
          text: 'CPU',
          x: 'center',
          textStyle: {
            fontSize: '15',
            color: '#ccc'
          }

        },
        series: [{
          type: 'pie',
          // 饼图的半径，数组的第一项是内半径，第二项是外半径
          radius: ['40%', '45%'],

          label: {
            show: true,
            position: 'center'
          },
          data: [
            { value: 10, name: '10%' },
            {
              value: 100,
              label: {
                normal: {
                  show: false
                }
              }
            }
          ]
        }]
      })
    }
  }
}
</script>
