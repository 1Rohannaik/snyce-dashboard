import React, {useState} from 'react';
import Header from './components/Header/Header';
import SummaryCards from './components/SummaryCards/SummaryCards';
import SectionTitle from './components/SectionTitle/SectionTitle';
import DonutCard from './components/DonutCard/DonutCard';
import HorizontalBarCard from './components/HorizontalBarCard/HorizontalBarCard';
import StackedColumnCard from './components/StackedColumnCard/StackedColumnCard';
import LineCard from './components/LineCard/LineCard';
import Tabs from './components/Tabs/Tabs';
import ChartModal from './components/ChartModal/ChartModal';
import CurrentNews from './components/CurrentNews/CurrentNews';
import { ChartModalProvider, useChartModal } from './context/ChartModalContext';
import totalDonut from './data/donut-total.json';
import totalDist from './data/distribution-total.json';
import stacked from './data/stacked-blocks.json';
import lineTotal from './data/line-total.json';
import lineTotalSft from './data/line-total-sft.json';
import lineSolar from './data/line-solar.json';
import lineSolarSft from './data/line-solar-sft.json';
import summary from './data/summary.json';
import blocksData from './data/block.json';
import './App.css';
import { FaBolt, FaSolarPanel, FaChartBar, FaLayerGroup, FaLeaf, FaTachometerAlt } from 'react-icons/fa';

function AppContent() {
  const [activeBlock, setActiveBlock] = useState(0);
  // Layout for the top charts: '1x1' | '1x2' | '3x1'
  const [layout, setLayout] = useState('3x1');
  // Layout for the bottom charts section: '1x1' | '1x2'
  const [bottomLayout, setBottomLayout] = useState('1x2');
  // Units for line charts
  const [totalUnit, setTotalUnit] = useState('MWh');
  const [solarUnit, setSolarUnit] = useState('MWh');
  // Units for block-level line charts
  const [blockTotalUnit, setBlockTotalUnit] = useState('MWh');
  const [blockSolarUnit, setBlockSolarUnit] = useState('MWh');
  const { isOpen, chartConfig, title, subtitle, closeModal } = useChartModal();
  const blockInfo = blocksData[activeBlock];

  // Import icons from react-icons or your preferred icon library

  // Determine how many charts and which grid to use for the top section
  const layoutMap = {
    '1x1': { count: 1, grid: 'grid-1' },
    '1x2': { count: 2, grid: 'grid-2' },
    '3x1': { count: 3, grid: 'grid-3' },
  };
  const { count: topChartsCount, grid: topGrid } = layoutMap[layout] || layoutMap['3x1'];

  // Helper to derive MWh/SFT from MWh using approximated per-block areas (SFT)
  const blockAreas = [240000, 265000, 210000]; // TODO: replace with real areas when available
  const toSftSeries = (data, area) => ({ x: data.x, y: data.y.map(v => Number((v / area).toFixed(4))) });

  return (
    <div className="app">
      <Header period="Consumption Summary (01/09/2025 - 30/09/2025)" />
      <SummaryCards
        data={summary}
        icons={[
          <FaBolt color="#4caf50" size={32} />,           // Total Consumption
          <FaSolarPanel color="#ffb300" size={32} />,     // Solar Generation
          <FaChartBar color="#f44336" size={32} />,       // Grid Import
          <FaLeaf color="#ffc107" size={32} />,           // Energy Efficiency
          <FaTachometerAlt color="#ff9800" size={32} />   // Peak Demand
        ]}
      />
      <CurrentNews />
      {/* Charts toolbar: layout selector for top row */}
      <div className="charts-toolbar">
        <label className="charts-layout-select">
          <span className="label">Layout</span>
          <select
            className="select"
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            <option value="1x1">1×1</option>
            <option value="1x2">1×2</option>
            <option value="3x1">1×3</option>
          </select>
        </label>
      </div>
      {(() => {
        const charts = [
          (
            <DonutCard
              key="donut-total"
              title={<><FaBolt color="#4caf50" size={24} style={{marginRight:8}} />Energy Consumption</>}
              subtitle="Total: 6407 MWh"
              data={totalDonut}
            />
          ),
          (
            <HorizontalBarCard
              key="dist-total"
              title={<><FaLayerGroup color="#2196f3" size={24} style={{marginRight:8}} />Energy Distribution</>}
              subtitle="Total: 71139 MWh"
              data={totalDist}
            />
          ),
          (
            <StackedColumnCard
              key="stacked-blocks"
              title={<><FaChartBar color="#8d7cf3" size={24} style={{marginRight:8}} />Energy Consumption by Blocks</>}
              data={stacked}
            />
          ),
        ];
        return (
          <div className={`grid ${topGrid}`}>
            {charts.slice(0, topChartsCount)}
          </div>
        );
      })()}

      <SectionTitle
        text="Total Energy Consumption"
        unit="MWh"
        activeUnit={totalUnit}
        onUnitChange={setTotalUnit}
        icon={<FaBolt color="#7bbf5e" size={20} />}
      />
      <LineCard
        data={totalUnit === 'MWh' ? lineTotal : lineTotalSft}
        color="#7bbf5e"
        unit={totalUnit}
        title="Total Energy Consumption"
      />

      <SectionTitle
        text="Solar Energy Consumption"
        unit="MWh"
        activeUnit={solarUnit}
        onUnitChange={setSolarUnit}
        icon={<FaSolarPanel color="#8d7cf3" size={20} />}
      />
      <LineCard
        data={solarUnit === 'MWh' ? lineSolar : lineSolarSft}
        color="#8d7cf3"
        soft
        unit={solarUnit}
        title="Solar Energy Consumption"
      />

      <Tabs
        tabs={blocksData.map(b => b.name)}
        active={activeBlock}
        onTabChange={setActiveBlock}
      />

      {/* Bottom charts toolbar: layout control for block-level charts */}
      <div className="charts-toolbar">
        <label className="charts-layout-select">
          <span className="label">Layout</span>
          <select
            className="select"
            value={bottomLayout}
            onChange={(e) => setBottomLayout(e.target.value)}
          >
            <option value="1x1">1×1</option>
            <option value="1x2">1×2</option>
          </select>
        </label>
      </div>

      {(() => {
        const bottomCharts = [
          (
            <DonutCard
              key={`donut-${activeBlock}`}
              title={<><FaBolt color="#4caf50" size={24} style={{marginRight:8}} />Energy Consumption</>}
              subtitle={`Total: ${blockInfo.dist.total} MWh`}
              data={blockInfo.donut}
            />
          ),
          (
            <HorizontalBarCard
              key={`dist-${activeBlock}`}
              title={<><FaLayerGroup color="#2196f3" size={24} style={{marginRight:8}} />Energy Distribution</>}
              subtitle={`Total: ${blockInfo.dist.total} MWh`}
              loss={blockInfo.dist.loss}
              data={blockInfo.dist}
            />
          )
        ];
        const grid = bottomLayout === '1x1' ? 'grid-1' : 'grid-2';
        const count = bottomLayout === '1x1' ? 1 : 2;
        return (
          <div className={`grid ${grid}`}>
            {bottomCharts.slice(0, count)}
          </div>
        );
      })()}

  <SectionTitle
    text="Total Energy Consumption"
    unit="MWh"
    activeUnit={blockTotalUnit}
    onUnitChange={setBlockTotalUnit}
    icon={<FaBolt color="#7bbf5e" size={20} />}
  />
  <LineCard
    data={blockTotalUnit === 'MWh' ? blockInfo.lineTotal : toSftSeries(blockInfo.lineTotal, blockAreas[activeBlock])}
    color="#7bbf5e"
    unit={blockTotalUnit}
    title="Total Energy Consumption"
  />

  <SectionTitle
    text="Solar Energy Consumption"
    unit="MWh"
    activeUnit={blockSolarUnit}
    onUnitChange={setBlockSolarUnit}
    icon={<FaSolarPanel color="#8d7cf3" size={20} />}
  />
  <LineCard
    data={blockSolarUnit === 'MWh' ? blockInfo.lineSolar : toSftSeries(blockInfo.lineSolar, blockAreas[activeBlock])}
    color="#8d7cf3"
    soft
    unit={blockSolarUnit}
    title="Solar Energy Consumption"
  />
      <ChartModal
        isOpen={isOpen}
        onClose={closeModal}
        chartConfig={chartConfig}
        title={title}
        subtitle={subtitle}
      />
    </div>
  );
}

export default function App() {
  return (
    <ChartModalProvider>
      <AppContent />
    </ChartModalProvider>
  );
}


