export default function donutOptions({ series, colors, center = ['50%','52%'] }) {
  return {
    tooltip: { trigger: 'item' },
    color: colors,
    toolbox: {
      show: true,
      orient: 'horizontal',
      top: -17,
      right: 10,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['55%', '80%'],
        center,
        padAngle: 1,
        itemStyle: { borderRadius: 2, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, formatter: '{b}\n{c} MWh', fontSize: 11 },
        data: series
      }
    ]
  };
}
