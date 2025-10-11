export default function horizontalBarOptions({ categories, values, colors, loss }) {
  return {
    grid: { left: 80, right: 20, top: 20, bottom: 20 },
    xAxis: { type: 'value', splitLine: { lineStyle: { type: 'dashed' } } },
    yAxis: { type: 'category', data: categories, axisTick: { show: false } },
    tooltip: { trigger: 'axis' },
    color: colors,
    toolbox: {
      show: true,
      orient: 'horizontal',
      top: -16,
      right: 10,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { type: ['line', 'bar'] },
        saveAsImage: { show: true }
      }
    },
    series: [
      { type: 'bar', data: values, barWidth: 14, itemStyle: { borderRadius: 4 } },
      loss
        ? {
            type: 'line',
            data: values.map(() => Number(loss.replace('%', ''))),
            showSymbol: false
          }
        : null
    ].filter(Boolean)
  };
}
