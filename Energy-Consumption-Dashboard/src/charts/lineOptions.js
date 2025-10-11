// src/charts/lineOptions.js
export default function lineOptions({ x, y, color, soft = false, unit = 'MWh' }) {
  return {
    grid: { left: 36, right: 22, top: 12, bottom: 28 },
    tooltip: {
      trigger: 'axis',
      confine: true,
      formatter: (params) => {
        const p = params[0];
        return `${p.axisValue}<br/>${p.seriesName}: <b>${p.data} ${unit}</b>`;
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: x,
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#94a3b8' },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#eef2f7' } },
      axisLabel: { color: '#94a3b8' }
    },
    toolbox: {
      show: true,
      orient: 'horizontal',
      top: -17,
      right: 10,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { type: ['line', 'bar'] },
        saveAsImage: { show: true }
      }
    },
    series: [{
      name: 'Energy',
      type: 'line',
      data: y,
      smooth: 0.25,
      showSymbol: false,
      lineStyle: { color, width: 2 },
      areaStyle: soft ? { color: color + '22' } : undefined
    }]
  };
}
