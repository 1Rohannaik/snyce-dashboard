export default function stackedColumnOptions({ categories, stacks }) {
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { bottom: 0 },
    grid: { left: 30, right: 16, top: 50, bottom: 40 }, // extra top space for toolbox
    dataset: {
      source: [
        ['Category', ...stacks.map(s => s.name)],
        ...categories.map((cat, idx) => [
          cat,
          ...stacks.map(s => s.values[idx])
        ])
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },
    series: stacks.map(s => ({
      name: s.name,
      type: 'bar',
      stack: 'total',
      barWidth: 16,
      emphasis: { focus: 'series' }
    })),
    toolbox: {
      show: true,
      orient: 'horizontal',
      top: 10,        
      right: -10,     
      feature: {
        dataView: { show: true, readOnly: false }, 
        magicType: { type: ['line', 'bar'] },
        saveAsImage: { show: true }
      }
    }
  };
}
